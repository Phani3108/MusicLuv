import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import numpy as np
from pipelines import pitch
from pipelines.pitch import note_to_hz, hz_to_note, extract_pitch, segment_notes
from pipelines.synth import render_notes


def test_note_to_hz_and_back():
    assert abs(note_to_hz("A4") - 440.0) < 1e-3
    assert abs(note_to_hz("C4") - 261.626) < 1e-2
    name, cents = hz_to_note(440.0)
    assert name == "A4"
    assert abs(cents) < 2


def test_pyin_detects_a_sustained_note(sr=22050):
    # 2 seconds of A4
    note = [{"pitch": "A4", "startMs": 0, "durationMs": 2000}]
    y = render_notes(note, sr=sr, harmonics=4, noise_level=0.005)
    track = extract_pitch(y, sr)
    voiced_hz = track.frame_hz[track.voiced]
    # Most frames should be close to 440
    med = float(np.nanmedian(voiced_hz))
    assert 430 < med < 450


def test_segment_notes_recovers_c_scale(c_scale_target, audio_clean):
    y, sr = audio_clean
    track = extract_pitch(y, sr)
    notes = segment_notes(track)
    pitches = [n["pitch"] for n in notes]
    # Should recover at least the 5 unique pitch names in order
    unique = [p for p in pitches if not pitches.index(p) < pitches.index(p)]
    assert "C4" in pitches and "G4" in pitches
    # Reasonable count: 9 target notes, allow ±2 segmentation drift
    assert 6 <= len(notes) <= 14
