"""
extract_sheets_ocr.py
=====================
Extracts questions and answers from .docx section sheets, especially those that
contain screenshots of sheets rather than editable text.

Steps:
1. Scan Sections/ directory for .docx files.
2. For each docx file, if it contains images:
   - Extract images from zipfile (word/media/)
   - Sort images (image1, image2, etc. representing document pages)
   - Call Gemini Vision (gemini-2.5-flash) to extract problems in structured JSON.
   - Fallback to the basic text-based parse if Gemini fails or is skipped.
3. Save resulting JSON under src/data/sheets/sheetXX.json.
"""

import os
import re
import json
import time
import zipfile
import logging
from pathlib import Path
from google import genai
from google.genai import types

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
BASE_DIR     = Path(__file__).resolve().parent.parent
SECTIONS_DIR = BASE_DIR / "Sections"
OUT_DIR      = BASE_DIR / "src" / "data" / "sheets"

GEMINI_API_KEY   = os.environ.get("GEMINI_API_KEY", "").strip()
GEMINI_MODEL     = "gemini-2.5-flash-lite"
RATE_LIMIT_SLEEP = 7  # seconds

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

# Initialize client
_client = genai.Client(api_key=GEMINI_API_KEY.strip())

FNAME_RE = re.compile(
    r"Sheet\s+(\d+)\s*-\s*W\s*(\d+)\s*-\s*(.+?)(?:\s*\(Alt\))?\.docx$",
    re.IGNORECASE,
)

def parse_sheet_filename(fname: str):
    m = FNAME_RE.match(fname)
    if not m:
        return None, None, fname.replace(".docx", "")
    return int(m.group(1)), int(m.group(2)), m.group(3).strip()

def extract_images_from_docx(docx_path: Path) -> list[tuple[str, bytes]]:
    """Extract media files from docx zip and return sorted list of (filename, bytes)."""
    images = []
    try:
        with zipfile.ZipFile(docx_path) as z:
            for name in z.namelist():
                if name.startswith("word/media/"):
                    img_bytes = z.read(name)
                    fname = os.path.basename(name)
                    images.append((fname, img_bytes))
    except Exception as e:
        log.error("Failed to extract images from %s: %s", docx_path.name, e)
    
    # Sort by filename number (e.g. image1.png, image2.png)
    def get_num(fn):
        m = re.search(r'\d+', fn)
        return int(m.group()) if m else 999
    
    images.sort(key=lambda x: get_num(x[0]))
    return images

def run_local_ocr_on_bytes(img_bytes: bytes, filename: str) -> str:
    """Save image bytes to a temp file and run local OcrTool.exe."""
    import tempfile
    import subprocess
    
    ext = os.path.splitext(filename)[1].lower() or ".png"
    with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
        tmp.write(img_bytes)
        tmp_name = tmp.name
        
    try:
        tool_path = BASE_DIR / "scripts" / "OcrTool.exe"
        if not tool_path.exists():
            log.error("OcrTool.exe not found at %s", tool_path)
            return ""
            
        res = subprocess.run(
            [str(tool_path), tmp_name],
            capture_output=True,
            text=True,
            encoding="utf-8",
            check=True
        )
        return res.stdout.strip()
    except Exception as e:
        log.error("Local OCR failed for %s: %s", filename, e)
        return ""
    finally:
        try:
            if os.path.exists(tmp_name):
                os.remove(tmp_name)
        except Exception:
            pass


def ocr_sheet_image(img_bytes: bytes, filename: str) -> list[dict]:
    """Perform local OCR on the image bytes, then use Gemini Text API to parse and structure it."""
    raw_text = run_local_ocr_on_bytes(img_bytes, filename)
    if not raw_text.strip():
        log.warning("No text extracted from image %s by local OCR.", filename)
        return []

    log.info("    Successfully OCR'd %s locally. Structuring with Gemini text API...", filename)
    
    prompt = (
        "You are a computer science tutor OCR assistant. "
        "We have extracted raw OCR text from a page of a section practice sheet. "
        "Please parse this text and structure it into a list of problems (questions and their answers/solutions). "
        "Identify each problem, and separate the question text from its corresponding answer or solution text. "
        "If a question does not have a provided answer/solution in the text, set the 'answer' field to ''. "
        "Return the output as a JSON array of objects with the following keys:\n"
        "  'question': string (the full question text, including any sub-parts or details)\n"
        "  'answer': string (the full answer or solution text if provided, otherwise '')\n\n"
        "Raw OCR text:\n"
        f"{raw_text}\n\n"
        "Return ONLY the raw JSON array — no markdown block, no '```json' wrapper, just the JSON text."
    )

    try:
        response = _client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt
        )
        text = response.text.strip() if response.text else "[]"
        if text.startswith("```"):
            text = re.sub(r"^```(?:json)?\n", "", text)
            text = re.sub(r"\n```$", "", text)
        return json.loads(text.strip())
    except Exception as e:
        log.error("Failed to structure OCR text for image %s: %s", filename, e)
        return []


def main():
    if not SECTIONS_DIR.exists():
        log.error("Sections directory does not exist: %s", SECTIONS_DIR)
        return

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    files = [f for f in os.listdir(SECTIONS_DIR) if f.endswith(".docx")]
    log.info("Found %d docx sheet files", len(files))

    for fname in sorted(files):
        sheet_num, week_num, title = parse_sheet_filename(fname)
        if sheet_num is None:
            continue
        
        sheet_id = f"sheet{sheet_num:02d}"
        lecture_id = f"lec{sheet_num:02d}"
        
        # Determine if we should do OCR
        # We run OCR on sheets with images.
        docx_path = SECTIONS_DIR / fname
        images = extract_images_from_docx(docx_path)
        
        log.info("Processing %s (%d images) ...", fname, len(images))

        problems = []
        if images:
            log.info("  Running OCR on %d images ...", len(images))
            for img_name, img_bytes in images:
                log.info("    OCR image %s (%d bytes) ...", img_name, len(img_bytes))
                img_problems = ocr_sheet_image(img_bytes, img_name)
                log.info("      Extracted %d problem(s)", len(img_problems))
                problems.extend(img_problems)
                time.sleep(RATE_LIMIT_SLEEP)
            
            # Renumber problems sequentially
            for i, p in enumerate(problems):
                p["number"] = i + 1
                p.setdefault("explanation", [])
                p.setdefault("hasVisualization", False)
        
        # If no problems were extracted (or no images), fallback to existing or basic parse
        out_json_path = OUT_DIR / f"sheet{sheet_num:02d}.json"
        
        if not problems:
            # Fallback to basic parse or keep existing
            if out_json_path.exists():
                try:
                    with open(out_json_path, "r", encoding="utf-8") as f_in:
                        old_data = json.load(f_in)
                        problems = old_data.get("problems", [])
                        log.info("  No OCR problems extracted. Kept existing %d problems", len(problems))
                except Exception:
                    pass
        
        sheet_data = {
            "id": sheet_id,
            "lectureId": lecture_id,
            "week": week_num,
            "title": title,
            "problems": problems
        }

        with open(out_json_path, "w", encoding="utf-8") as f_out:
            json.dump(sheet_data, f_out, indent=2, ensure_ascii=False)
        log.info("  Saved %s with %d problems", out_json_path.name, len(problems))

if __name__ == "__main__":
    main()
