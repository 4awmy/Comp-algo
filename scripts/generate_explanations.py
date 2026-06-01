"""
generate_explanations.py
========================
Reads each sheet JSON from src/data/sheets/, calls the Gemini API to generate
pedagogical step-by-step explanations for every problem, and writes the
enriched JSON back in-place.

Uses the new google-genai SDK.
Rate limiting: 4-second sleep between API calls (15 RPM free tier).
"""

import re
import json
import time
import logging
from pathlib import Path

from google import genai
from google.genai import types

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
BASE_DIR     = Path(__file__).resolve().parent.parent
SHEETS_DIR   = BASE_DIR / "src" / "data" / "sheets"

# NOTE: Loaded from environment variables for push protection
GEMINI_API_KEY   = os.environ.get("GEMINI_API_KEY", "").strip()
GEMINI_MODEL     = "gemini-2.5-flash-lite"
RATE_LIMIT_SLEEP = 4

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Gemini client (new google-genai SDK)
# ---------------------------------------------------------------------------
_client = genai.Client(api_key=GEMINI_API_KEY.strip())

SYSTEM_PROMPT = (
    "You are an expert computer-science tutor specialising in algorithm design and analysis. "
    "Given a problem question and its reference answer, generate a clear, pedagogical "
    "step-by-step explanation suitable for undergraduate students.\n\n"
    "Rules:\n"
    "- Return ONLY a JSON array of step objects, each with two keys:\n"
    '    "step"  : integer (1-based)\n'
    '    "text"  : string — one self-contained explanation step\n'
    "- Steps should build on each other and use plain language.\n"
    "- Highlight key algorithmic insights and complexity reasoning where relevant.\n"
    "- Do NOT include any text outside the JSON array.\n\n"
    "Example output:\n"
    '[\n'
    '  {"step": 1, "text": "Understand the problem: we need to find …"},\n'
    '  {"step": 2, "text": "Choose a strategy: brute force works because …"},\n'
    '  {"step": 3, "text": "Analyse complexity: the nested loops give O(n²) time …"}\n'
    ']'
)


def generate_explanation(question: str, answer: str) -> list:
    user_prompt = (
        f"Question:\n{question}\n\n"
        f"Reference Answer:\n{answer if answer.strip() else '(no reference answer provided)'}\n\n"
        "Generate the step-by-step explanation JSON array now."
    )
    try:
        response = _client.models.generate_content(
            model=GEMINI_MODEL,
            contents=user_prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                temperature=0.3,
            ),
        )
        raw = response.text.strip()
        # Strip markdown code fences if Gemini wraps the JSON
        raw = re.sub(r"^```[a-z]*\n?", "", raw)
        raw = re.sub(r"\n?```$", "", raw.strip())
        steps = json.loads(raw)
        if not isinstance(steps, list):
            raise ValueError("Response is not a JSON array")
        return steps
    except Exception as exc:
        log.error("  Explanation generation failed: %s", exc)
        return [{"step": 1, "text": f"[Explanation generation error: {exc}]"}]


def process_sheet(sheet_path: Path):
    log.info("Processing %s …", sheet_path.name)
    data     = json.loads(sheet_path.read_text(encoding="utf-8"))
    problems = data.get("problems", [])

    if not problems:
        log.info("  No problems found — skipping.")
        return

    for prob in problems:
        q_num    = prob.get("number", "?")
        question = prob.get("question", "")
        answer   = prob.get("answer", "")

        existing = prob.get("explanation", [])
        if existing and not str(existing[0].get("text", "")).startswith("["):
            log.info("  Q%s: explanation already present — skipping.", q_num)
            continue

        log.info("  Generating explanation for Q%s …", q_num)
        prob["explanation"] = generate_explanation(question, answer)
        time.sleep(RATE_LIMIT_SLEEP)

    sheet_path.write_text(
        json.dumps(data, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    log.info("  → %s updated (%d problems)", sheet_path.name, len(problems))


def main():
    sheet_files = sorted(SHEETS_DIR.glob("sheet*.json"))
    if not sheet_files:
        log.error(
            "No sheet JSON files found in %s — run extract_sheets.py first.",
            SHEETS_DIR,
        )
        return

    log.info("Found %d sheet JSON file(s)", len(sheet_files))
    for sheet_path in sheet_files:
        process_sheet(sheet_path)

    log.info("Done — all explanations generated.")


if __name__ == "__main__":
    main()
