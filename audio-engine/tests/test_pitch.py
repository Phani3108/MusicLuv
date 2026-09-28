import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import numpy as np
import pytest

from pipelines import onsets
from pipelines.pitch import (
    extract_pitch, hz_to_note, midi_to_name, note_to_hz, parse_note, search_range_for, segment_notes,
)
from pipelines.synth import render_notes


def test_note_to_hz_and_back():
    assert abs(note_to_hz("A4") - 440.0) < 1e-3
    assert abs(note_to_hz("C4") - 261.626) < 1e-2
    name, cents = hz_to_note(440.0)
    assert name == "A4"
    assert abs(cents) < 2


@pytest.mark.parametrize("name,midi", [
    ("C4", 60), ("C#4", 61), ("Db4", 61), ("Eb4", 63), ("D♯4", 63), ("B♭3", 58),
    ("Bb4", 70), ("Cb4", 59), ("B#3", 60), ("c4", 60), ("A0", 21), ("C8", 108),
])
def test_parse_note_accepts_sharps_and_flats(name, midi):
    assert parse_note(name) == midi


@pytest.mark.parametrize("bad", ["", "H4", "C", "4", "C#", "Cx4", "Sa", None])
def test_parse_note_rejects_non_notes(bad):
    with pytest.raises(ValueError):
        parse_note(bad)


def test_midi_to_name_uses_sharps():
    assert midi_to_name(61) == "C#4"
    assert midi_to_name(parse_note("Eb4")) == "D#4"


def test_pyin_detects_a_sustained_note(sr=22050):
    # 2 seconds of A4
    note = [{"pitch": "A4", "startMs": 0, "durationMs": 2000}]
    y = render_notes(note, sr=sr, harmonics=4, noise_level=0.005)
    track = extract_pitch(y, sr)
    voiced_hz = track.frame_hz[track.voiced]
    # Most frames should be close to 440
    med = float(np.nanmedian(voiced_hz))
    assert 430 < med < 450


def _segment(y, sr, target):
    fmin, fmax = search_range_for([t["pitch"] for t in target])
    track = extract_pitch(y, sr, fmin=fmin, fmax=fmax)
    ot = onsets.detect_onsets(y, sr, backtrack=False)
    return segment_notes(track, onset_times_s=[m / 1000 for m in ot.onset_ms],
                         rms=ot.rms, rms_times_s=ot.rms_times_s)


def test_segment_notes_recovers_c_scale(c_scale_target, audio_clean):
    y, sr = audio_clean
    notes = _segment(y, sr, c_scale_target)
    assert [n["pitch"] for n in notes] == [t["pitch"] for t in c_scale_target]
    for n in notes:
        assert abs(n["centsOff"]) <= 10
        assert n["hz"] > 0


def test_repeated_notes_are_split(sr=22050):
    seq = ["C4", "C4", "G4", "G4", "A4", "A4", "G4"]
    target = [{"pitch": p, "startMs": i * 500, "durationMs": 500} for i, p in enumerate(seq)]
    for legato in (False, True):
        y = render_notes(target, sr=sr, noise_level=0.005, legato=legato)
        notes = _segment(y, sr, target)
        assert [n["pitch"] for n in notes] == seq, f"legato={legato}"


def test_vibrato_does_not_fragment_sustained_notes(sr=22050):
    target = [{"pitch": p, "startMs": i * 1500, "durationMs": 1500}
              for i, p in enumerate(["A3", "C4", "E4", "A4"])]
    y = render_notes(target, sr=sr, noise_level=0.03, vibrato_cents=60)
    notes = _segment(y, sr, target)
    assert [n["pitch"] for n in notes] == ["A3", "C4", "E4", "A4"]
