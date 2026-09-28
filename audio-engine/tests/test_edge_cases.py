"""End-to-end /grade behaviour on the cases real learners hit.

Every case here was wrong before the Phase 0 grading fixes (see
docs/product-vision.md §10: "Grading distinguishes deliberate failures
(detuned / rushed / silent) correctly").
"""
import io
import json
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import numpy as np
import pytest
import soundfile as sf
from fastapi.testclient import TestClient

from main import app
from pipelines.synth import render_notes

client = TestClient(app)
SR = 22050
RUBRIC = {
    "id": "rubric_early_level",
    "weights": {"pitch": 0.40, "rhythm": 0.30, "tone": 0.15, "dynamics": 0.10, "consistency": 0.05},
    "passThreshold": 0.75, "pitchToleranceCents": 40.0, "rhythmToleranceMs": 120.0,
}
RHYTHM_RUBRIC = {
    "id": "rubric_rhythm_only",
    "weights": {"pitch": 0.0, "rhythm": 0.8, "tone": 0.1, "dynamics": 0.05, "consistency": 0.05},
    "passThreshold": 0.75, "pitchToleranceCents": 1000, "rhythmToleranceMs": 80,
}


def _notes(seq, step=500):
    return [{"pitch": p, "startMs": i * step, "durationMs": step} for i, p in enumerate(seq)]


SCALE = _notes(["C4", "D4", "E4", "F4", "G4", "F4", "E4", "D4", "C4"])
TWINKLE = _notes(["C4", "C4", "G4", "G4", "A4", "A4", "G4", "F4", "F4", "E4", "E4", "D4", "D4", "C4"])


def _wav(y: np.ndarray) -> bytes:
    buf = io.BytesIO()
    sf.write(buf, y, SR, format="WAV", subtype="PCM_16")
    return buf.getvalue()


def _post(target, y, rubric=RUBRIC, raw: bytes | None = None, **meta_extra):
    meta = {"exerciseId": "x", "target": target, "rubric": rubric, **meta_extra}
    return client.post(
        "/grade",
        files={"audio": ("take.wav", raw if raw is not None else _wav(y), "audio/wav")},
        data={"meta": json.dumps(meta)},
    )


def _grade(target, y, rubric=RUBRIC, **meta_extra):
    r = _post(target, y, rubric, **meta_extra)
    assert r.status_code == 200, r.text
    return r.json()


def _pad(y, seconds):
    return np.concatenate([np.zeros(int(SR * seconds), dtype=np.float32), y])


def _claps(times_ms, lead_s=0.0, seed=0):
    rng = np.random.default_rng(seed)
    y = np.zeros(int(SR * (max(times_ms) / 1000 + 1.0 + lead_s)), dtype=np.float32)
    for t in times_ms:
        i, n = int(SR * (t / 1000 + lead_s)), int(SR * 0.03)
        y[i:i + n] += (rng.normal(0, 0.5, n) * np.exp(-np.arange(n) / (SR * 0.008))).astype(np.float32)
    return y


# ---- Repeated notes (Twinkle "C C G G …") ----

@pytest.mark.parametrize("legato", [False, True])
def test_repeated_notes_are_all_graded(legato):
    body = _grade(TWINKLE, render_notes(TWINKLE, sr=SR, noise_level=0.005, legato=legato))
    assert len(body["userNotesDetected"]) == len(TWINKLE)
    assert body["dimensions"]["pitch"] == pytest.approx(1.0)
    assert body["alignment"]["missed"] == 0
    assert body["composite"] >= 0.9


# ---- Flat spellings in lesson targets (Eb4, Bb4) ----

def test_flat_note_names_grade_instead_of_500():
    target = [{"pitch": "Eb4", "startMs": 0, "durationMs": 500}, {"pitch": "Bb4", "startMs": 500, "durationMs": 500}]
    played = [{"pitch": "D#4", "startMs": 0, "durationMs": 500}, {"pitch": "A#4", "startMs": 500, "durationMs": 500}]
    body = _grade(target, render_notes(played, sr=SR, noise_level=0.005))
    assert body["dimensions"]["pitch"] == pytest.approx(1.0)


def test_unknown_pitch_is_422_not_500():
    r = _post([{"pitch": "H4", "startMs": 0, "durationMs": 500}], render_notes(SCALE, sr=SR))
    assert r.status_code == 422
    assert "unknown_pitch" in r.text


# ---- Timing on the learner's own clock ----

def test_late_start_is_not_a_rhythm_error():
    body = _grade(SCALE, _pad(render_notes(SCALE, sr=SR, noise_level=0.005), 1.5))
    assert body["dimensions"]["rhythm"] >= 0.9
    assert body["alignment"]["startOffsetMs"] == pytest.approx(1500, abs=80)
    assert body["passed"] is True


def test_steady_slightly_slow_tempo_is_reported_not_punished():
    slow = [dict(n, startMs=int(n["startMs"] / 0.9), durationMs=int(n["durationMs"] / 0.9)) for n in SCALE]
    body = _grade(SCALE, render_notes(slow, sr=SR, noise_level=0.005))
    assert body["alignment"]["tempoRatio"] == pytest.approx(1 / 0.9, abs=0.04)
    assert body["dimensions"]["rhythm"] >= 0.85


def test_much_too_fast_tempo_is_flagged():
    fast = [dict(n, startMs=int(n["startMs"] * 0.6), durationMs=int(n["durationMs"] * 0.6)) for n in SCALE]
    body = _grade(SCALE, render_notes(fast, sr=SR, noise_level=0.005))
    tempo = [i for i in body["issues"] if i.get("kind") == "tempo"]
    assert tempo and tempo[0]["severity"] == "major"
    assert body["dimensions"]["rhythm"] < 0.9


def test_single_early_note_is_flagged():
    # Monophonic: coming in 250 ms early on G4 cuts the previous F4 short.
    played = [dict(n) for n in SCALE]
    played[3] = dict(played[3], durationMs=250)
    played[4] = dict(played[4], startMs=played[4]["startMs"] - 250, durationMs=750)
    body = _grade(SCALE, render_notes(played, sr=SR, noise_level=0.005))
    early = [i for i in body["issues"] if i.get("kind") == "early"]
    assert any(i["at"] == SCALE[4]["startMs"] for i in early)


def test_leading_noise_burst_does_not_shift_alignment():
    y = render_notes(SCALE, sr=SR, noise_level=0.005)
    y = np.concatenate([_claps([100], seed=3)[: int(SR * 0.6)], np.zeros(int(SR * 0.4), dtype=np.float32), y])
    body = _grade(SCALE, y)
    assert body["dimensions"]["pitch"] == pytest.approx(1.0)
    assert body["alignment"]["missed"] == 0


# ---- Intonation (continuous cents, not semitone buckets) ----

def test_intonation_is_graded_in_cents():
    tight = dict(RUBRIC, pitchToleranceCents=25.0)
    ten = _grade(SCALE, render_notes(SCALE, sr=SR, noise_level=0.005, detune_cents=-10), tight)
    thirty = _grade(SCALE, render_notes(SCALE, sr=SR, noise_level=0.005, detune_cents=-30), tight)
    assert ten["dimensions"]["pitch"] == pytest.approx(1.0)
    assert thirty["dimensions"]["pitch"] < 0.9
    assert any(i.get("centsOff", 0) <= -26 for i in thirty["issues"])


def test_relative_tuning_mode_forgives_a_global_offset():
    tight_rel = dict(RUBRIC, pitchToleranceCents=25.0, tuningMode="relative")
    body = _grade(SCALE, render_notes(SCALE, sr=SR, noise_level=0.005, detune_cents=-30), tight_rel)
    assert body["alignment"]["tuningOffsetCents"] == pytest.approx(-30, abs=6)
    assert body["dimensions"]["pitch"] == pytest.approx(1.0)


def test_wrong_note_is_named_in_issues():
    played = [dict(n) for n in SCALE]
    played[2] = dict(played[2], pitch="F#4")          # E4 -> F#4
    body = _grade(SCALE, render_notes(played, sr=SR, noise_level=0.005))
    assert body["dimensions"]["pitch"] < 0.95
    wrong = [i for i in body["issues"] if i.get("expected") == "E4" and i.get("at") == SCALE[2]["startMs"]]
    assert wrong and wrong[0].get("detected") == "F#4"


def test_sung_vibrato_is_not_penalized():
    sung = [{"pitch": p, "startMs": i * 1500, "durationMs": 1500} for i, p in enumerate(["A3", "C4", "E4", "A4"])]
    body = _grade(sung, render_notes(sung, sr=SR, noise_level=0.01, vibrato_cents=50))
    assert len(body["userNotesDetected"]) == 4
    assert body["dimensions"]["pitch"] == pytest.approx(1.0)


# ---- Rhythm-only exercises (claps, drums, tabla) ----

CLAPS = [0, 750, 1500, 3000, 3750, 4500]


def test_perfect_claps_pass_in_onsets_mode():
    body = _grade([], _claps(CLAPS), RHYTHM_RUBRIC, mode="onsets", targetOnsets=CLAPS)
    assert body["gradedDimensions"] == ["rhythm", "consistency"]
    assert body["dimensions"]["rhythm"] >= 0.9
    assert body["passed"] is True


def test_uneven_claps_are_flagged():
    uneven = list(CLAPS)
    uneven[3] += 200
    body = _grade([], _claps(uneven, lead_s=0.5), RHYTHM_RUBRIC, mode="onsets", targetOnsets=CLAPS)
    assert any(i.get("kind") == "late" and i["at"] == 3000 for i in body["issues"])


def test_onsets_mode_can_use_note_start_times():
    target = [{"pitch": "C4", "startMs": t, "durationMs": 300} for t in CLAPS]
    body = _grade(target, _claps(CLAPS, lead_s=0.3), RHYTHM_RUBRIC, mode="onsets")
    assert body["passed"] is True


# ---- Silence, bad input ----

def test_silence_fails_with_a_reason():
    noise = np.random.default_rng(1).normal(0, 0.002, SR * 3).astype(np.float32)
    body = _grade(SCALE, noise)
    assert body["passed"] is False
    assert body["composite"] == 0.0
    assert body["warning"] == "no_notes_detected"


def test_empty_target_is_422():
    r = _post([], render_notes(SCALE, sr=SR))
    assert r.status_code == 422


def test_undecodable_audio_is_415():
    r = _post(SCALE, None, raw=b"\x1aE\xdf\xa3 definitely not a wav file" * 50)
    assert r.status_code == 415
