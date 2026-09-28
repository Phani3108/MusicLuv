"""Release gate on teacher-labelled real recordings.

Skips until takes are recorded (docs/recording-guide.md). Once they exist,
grading must agree with the teacher on >= 90% of takes and fail no more than
5% of takes the teacher passed.
"""
import os
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import pytest

from scripts.eval_corpus import evaluate

MANIFEST = Path(__file__).parent / "fixtures" / "real" / "manifest.json"
MIN_AGREEMENT = float(os.getenv("REAL_CORPUS_MIN_AGREEMENT", "0.9"))
MAX_FALSE_FAIL = float(os.getenv("REAL_CORPUS_MAX_FALSE_FAIL", "0.05"))


def test_engine_agrees_with_teacher_labels():
    report = evaluate(MANIFEST)
    s = report["summary"]
    if not s["labelled"]:
        pytest.skip("no labelled real takes yet — see docs/recording-guide.md")
    assert s["errors"] == 0, [r for r in report["rows"] if r["status"] != 200]
    assert s["agreement"] >= MIN_AGREEMENT, s
    if s["falseFailRate"] is not None:
        assert s["falseFailRate"] <= MAX_FALSE_FAIL, s
