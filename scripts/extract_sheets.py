"""
extract_sheets.py
=================
Extracts questions and content from .docx section-sheet files using python-docx.

Heuristics used
---------------
- A paragraph whose text matches "Q[0-9]" or starts with "Question" (case-insensitive)
  or is a short bold/all-caps line is treated as the start of a new problem.
- Text after the question until the next question marker is treated as the answer body.
- Tables are flattened row-by-row and appended to whichever problem is active.

Outputs
-------
src/data/sheets/sheet01.json … sheet11.json
"""

import re
import json
import logging
from pathlib import Path
from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
BASE_DIR     = Path(__file__).resolve().parent.parent
SECTIONS_DIR = BASE_DIR / "Sections"
OUT_DIR      = BASE_DIR / "src" / "data" / "sheets"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Filename parsing
# ---------------------------------------------------------------------------
FNAME_RE = re.compile(
    r"Sheet\s+(\d+)\s*-\s*W\s*(\d+)\s*-\s*(.+?)(?:\s*\(Alt\))?\.docx$",
    re.IGNORECASE,
)

def parse_sheet_filename(fname: str):
    m = FNAME_RE.match(fname)
    if not m:
        log.warning("Cannot parse filename: %s", fname)
        return None, None, fname.replace(".docx", "")
    return int(m.group(1)), int(m.group(2)), m.group(3).strip()


# ---------------------------------------------------------------------------
# Question-start detection heuristics
# ---------------------------------------------------------------------------
QUESTION_RE = re.compile(
    r"^(Q\.?\s*\d+|Question\s+\d+|\d+[\.\)]\s)",
    re.IGNORECASE,
)

def is_question_start(para: Paragraph) -> bool:
    text = para.text.strip()
    if not text:
        return False
    if QUESTION_RE.match(text):
        return True
    # Bold, short, and looks like a heading
    if len(text) < 120 and para.runs:
        if all(run.bold for run in para.runs if run.text.strip()):
            if re.match(r"^(Q|Problem|Exercise)\b", text, re.IGNORECASE):
                return True
    return False


def clean_question_text(text: str) -> str:
    """Strip leading question numbering from question text."""
    return re.sub(
        r"^(Q\.?\s*\d+[\.\):\s]+|Question\s+\d+[\.\):\s]+|\d+[\.\)]\s+)",
        "", text, flags=re.IGNORECASE
    ).strip()


# ---------------------------------------------------------------------------
# Extract questions from a docx document
# ---------------------------------------------------------------------------
def extract_problems(doc: Document) -> list[dict]:
    """
    Walk paragraphs and tables in document order, splitting on question markers.
    Returns a list of problem dicts with 'number', 'question', 'answer'.
    """
    problems: list[dict] = []
    current: dict | None = None

    def flush():
        """Clean up the current problem and append it."""
        if current is None:
            return
        current["question"] = current["question"].strip()
        current["answer"]   = current["answer"].strip()
        problems.append(current)

    # python-docx iterates paragraphs and tables separately; we need document order.
    # Use the XML body children directly.
    from docx.oxml.ns import qn
    body = doc.element.body

    para_idx = 0   # position counter for logging
    for child in body:
        tag = child.tag.split("}")[-1]  # strip namespace

        if tag == "p":  # paragraph
            para = Paragraph(child, doc)
            text = para.text.strip()
            para_idx += 1
            if not text:
                continue

            if is_question_start(para):
                flush()
                q_num = len(problems) + 1
                current = {
                    "number":   q_num,
                    "question": clean_question_text(text),
                    "answer":   "",
                    "explanation": [],
                    "hasVisualization": False,
                }
            elif current is not None:
                current["answer"] += ("\n" if current["answer"] else "") + text
            # else: preamble text before first question — skip

        elif tag == "tbl":  # table
            tbl = Table(child, doc)
            table_lines = []
            for row in tbl.rows:
                cells = [c.text.strip() for c in row.cells if c.text.strip()]
                if cells:
                    table_lines.append(" | ".join(cells))
            table_text = "\n".join(table_lines)
            if table_text and current is not None:
                current["answer"] += ("\n" if current["answer"] else "") + table_text

    flush()  # add the last problem
    return problems


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def process_sheet(docx_path: Path):
    fname = docx_path.name
    sheet_num, week_num, title = parse_sheet_filename(fname)
    if sheet_num is None:
        log.error("Skipping unrecognised file: %s", fname)
        return

    sheet_id  = f"sheet{sheet_num:02d}"
    lec_id    = f"lec{sheet_num:02d}"
    log.info("Processing %s  →  %s", fname, sheet_id)

    doc      = Document(str(docx_path))
    problems = extract_problems(doc)

    sheet_json = {
        "id":        sheet_id,
        "lectureId": lec_id,
        "week":      week_num,
        "title":     title,
        "problems":  problems,
    }

    out_path = OUT_DIR / f"{sheet_id}.json"
    out_path.write_text(
        json.dumps(sheet_json, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    log.info("  Written → %s  (%d problems found)", out_path.name, len(problems))
    return len(problems)


def main():
    docx_files = sorted(SECTIONS_DIR.glob("*.docx"))
    if not docx_files:
        log.error("No .docx files found in %s", SECTIONS_DIR)
        return

    log.info("Found %d section sheet file(s)", len(docx_files))
    for docx_path in docx_files:
        process_sheet(docx_path)

    log.info("Done — all sheets written to %s", OUT_DIR)


if __name__ == "__main__":
    main()
