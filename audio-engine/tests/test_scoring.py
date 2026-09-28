import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from pipelines import dtw, onsets, scoring
from pipelines.pitch import extract_pitch, search_range_for, segment_notes


DEFAULT_RUBRIC = scoring.Rubric(
    id="rubric_early_level",
    weights={"pitch": 0.40, "rhythm": 0.30, "tone": 0.15, "dynamics": 0.10, "consistency": 0.05},
    pass_threshold=0.75,
    pitch_tolerance_cents=40.0,
    rhythm_tolerance_ms=120.0,
)


def _grade(target, user_audio, sr):
    fmin, fmax = search_range_for([t["pitch"] for t in target])
    track = extract_pitch(user_audio, sr, fmin=fmin, fmax=fmax)
    ot = onsets.detect_onsets(user_audio, sr, backtrack=False)
    user = segment_notes(track, onset_times_s=[m / 1000 for m in ot.onset_ms],
                         rms=ot.rms, rms_times_s=ot.rms_times_s)
    align = dtw.align(target, user,
                      pitch_tolerance_cents=DEFAULT_RUBRIC.pitch_tolerance_cents,
                      rhythm_tolerance_ms=DEFAULT_RUBRIC.rhythm_tolerance_ms)
    return scoring.score(target=target, user=user, alignment=align, rubric=DEFAULT_RUBRIC), user


def test_clean_audio_passes_with_margin(c_scale_target, audio_clean):
    # product-vision.md §10: clean synthetic audio must score >= 0.85.
    y, sr = audio_clean
    result, user = _grade(c_scale_target, y, sr)
    assert result["passed"] is True
    assert result["composite"] >= 0.85
    assert result["dimensions"]["pitch"] >= 0.95
    assert len(user) == len(c_scale_target)


def test_only_measured_dimensions_are_graded(c_scale_target, audio_clean):
    y, sr = audio_clean
    result, _ = _grade(c_scale_target, y, sr)
    assert result["gradedDimensions"] == ["pitch", "rhythm", "consistency"]
    assert set(result["notGraded"]) == {"tone", "dynamics"}
    assert set(result["dimensions"]) == {"pitch", "rhythm", "consistency"}


def test_detuned_audio_loses_pitch_credit(c_scale_target, audio_clean, audio_detuned):
    clean_res, _ = _grade(c_scale_target, *audio_clean)
    det_res, _ = _grade(c_scale_target, *audio_detuned)       # +60 cents
    assert det_res["dimensions"]["pitch"] < clean_res["dimensions"]["pitch"] - 0.3
    assert any(i.get("centsOff", 0) >= 45 for i in det_res["issues"])


def test_jittered_timing_is_flagged(c_scale_target, audio_clean, audio_rushed):
    clean_res, _ = _grade(c_scale_target, *audio_clean)
    rushed_res, _ = _grade(c_scale_target, *audio_rushed)     # ±150 ms gaussian jitter
    assert rushed_res["dimensions"]["rhythm"] < clean_res["dimensions"]["rhythm"]
    assert any(i.get("kind") in ("early", "late") for i in rushed_res["issues"])


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
    assert fb["worstDim"] in result["gradedDimensions"]
