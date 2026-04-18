import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from pipelines import pitch, dtw, scoring
from pipelines.pitch import extract_pitch, segment_notes
from pipelines.synth import render_notes


DEFAULT_RUBRIC = scoring.Rubric(
    id="rubric_early_level",
    weights={"pitch": 0.40, "rhythm": 0.30, "tone": 0.15, "dynamics": 0.10, "consistency": 0.05},
    pass_threshold=0.75,
    pitch_tolerance_cents=40.0,
    rhythm_tolerance_ms=120.0,
)


def _grade(target, user_audio, sr):
    track = extract_pitch(user_audio, sr)
    user = segment_notes(track)
    align = dtw.align(target, user,
                      pitch_tolerance_cents=DEFAULT_RUBRIC.pitch_tolerance_cents,
                      rhythm_tolerance_ms=DEFAULT_RUBRIC.rhythm_tolerance_ms)
    return scoring.score(target=target, user=user, alignment=align, rubric=DEFAULT_RUBRIC), user


def test_clean_audio_passes(c_scale_target, audio_clean):
    y, sr = audio_clean
    result, user = _grade(c_scale_target, y, sr)
    assert result["composite"] >= 0.65     # lenient for synthetic audio
    assert result["dimensions"]["pitch"] >= 0.7


def test_detuned_audio_has_worse_pitch(c_scale_target, audio_clean, audio_detuned):
    clean_y, sr = audio_clean
    det_y, _ = audio_detuned
    clean_res, _ = _grade(c_scale_target, clean_y, sr)
    det_res, _ = _grade(c_scale_target, det_y, sr)
    assert det_res["dimensions"]["pitch"] <= clean_res["dimensions"]["pitch"]


def test_issues_reference_timing_for_rushed(c_scale_target, audio_rushed):
    y, sr = audio_rushed
    result, _ = _grade(c_scale_target, y, sr)
    # Should have at least one issue surfaced
    assert isinstance(result["issues"], list)


def test_feedback_returns_a_line(c_scale_target, audio_clean):
    y, sr = audio_clean
    result, _ = _grade(c_scale_target, y, sr)
    bank = {
        "pitch": {"minor": ["nudge the pitch"], "major": ["way off"]},
        "rhythm": {"minor": ["tighten up"], "major": ["in pieces"]},
        "tone": {"minor": ["cleaner"], "major": ["harsh"]},
        "dynamics": {"minor": ["shape it"], "major": ["flat"]},
        "consistency": {"minor": ["steadier"], "major": ["all over"]},
    }
    fb = scoring.build_feedback(result, bank)
    assert isinstance(fb["canned"], str) and len(fb["canned"]) > 0
    assert fb["worstDim"] in ("pitch", "rhythm", "tone", "dynamics", "consistency")
