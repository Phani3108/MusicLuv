import io
import json
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import numpy as np
import soundfile as sf
from fastapi.testclient import TestClient

from main import app
from pipelines.synth import render_notes

client = TestClient(app)


def _wav_bytes(y: np.ndarray, sr: int) -> bytes:
    buf = io.BytesIO()
    sf.write(buf, y, sr, format="WAV", subtype="PCM_16")
    buf.seek(0)
    return buf.read()


def test_health_endpoint():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["ok"] is True


def test_grade_endpoint_round_trip(c_scale_target):
    y = render_notes(c_scale_target, sr=22050, noise_level=0.005)
    wav = _wav_bytes(y, 22050)
    meta = {
        "exerciseId": "piano_l1_01_scale5",
        "userId": "u_test",
        "attemptId": "a_1",
        "target": c_scale_target,
        "rubric": {
            "id": "rubric_early_level",
            "weights": {"pitch": 0.40, "rhythm": 0.30, "tone": 0.15,
                         "dynamics": 0.10, "consistency": 0.05},
            "passThreshold": 0.75,
            "pitchToleranceCents": 40.0,
            "rhythmToleranceMs": 120.0,
        },
    }
    r = client.post(
        "/grade",
        files={"audio": ("clip.wav", wav, "audio/wav")},
        data={"meta": json.dumps(meta)},
    )
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["composite"] >= 0.85 and body["passed"] is True
    # Only measured dimensions are graded; tone/dynamics are reported as not graded.
    assert set(body["dimensions"].keys()) == {"pitch", "rhythm", "consistency"}
    assert body["gradedDimensions"] == ["pitch", "rhythm", "consistency"]
    assert set(body["notGraded"]) == {"tone", "dynamics"}
    assert body["issues"] == []
    assert body["attemptId"] == "a_1"
    align = body["alignment"]
    assert align["matched"] == len(c_scale_target) and align["missed"] == 0
    assert [p for p in align["path"] if p[0] >= 0 and p[1] >= 0] == [[i, i] for i in range(len(c_scale_target))]
    assert len(body["userNotesDetected"]) == len(c_scale_target)


def test_grade_rejects_short_audio(c_scale_target):
    y = np.zeros(100, dtype=np.float32)
    wav = _wav_bytes(y, 22050)
    meta = {"exerciseId": "x", "target": c_scale_target, "rubric": {}}
    r = client.post(
        "/grade",
        files={"audio": ("tiny.wav", wav, "audio/wav")},
        data={"meta": json.dumps(meta)},
    )
    assert r.status_code == 400
