"""Monophonic pitch detection + note segmentation.

Default backend is librosa pYIN (always available; pure-python + C deps).
CREPE is a drop-in replacement when installed and PITCH_BACKEND=crepe.
"""
from __future__ import annotations

import os
import re
from dataclasses import dataclass

import numpy as np

# ---- Note <-> MIDI <-> Hz helpers ----

_NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
_LETTER_SEMITONE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
_NOTE_RE = re.compile(r"^\s*([A-Ga-g])([#b♯♭]{0,2})(-?\d+)\s*$")


def parse_note(note: str) -> int:
    """Scientific pitch name -> MIDI number. Accepts sharps and flats.

    'C4' -> 60, 'C#4' / 'Db4' -> 61, 'Eb4' / 'D♯4' -> 63, 'Bb4' -> 70.
    Raises ValueError for anything that isn't a note name.
    """
    m = _NOTE_RE.match(note or "")
    if not m:
        raise ValueError(f"unknown note: {note!r}")
    letter, accidentals, octave = m.groups()
    semitone = _LETTER_SEMITONE[letter.upper()]
    semitone += accidentals.count("#") + accidentals.count("♯")
    semitone -= accidentals.count("b") + accidentals.count("♭")
    midi = 12 * (int(octave) + 1) + semitone
    if not 0 <= midi <= 127:
        raise ValueError(f"note out of MIDI range: {note!r}")
    return midi


def midi_to_name(midi: int) -> str:
    """60 -> 'C4'. Canonical spelling uses sharps."""
    return f"{_NOTE_NAMES[midi % 12]}{(midi // 12) - 1}"


def hz_to_midi(hz: float) -> float:
    return 69.0 + 12.0 * float(np.log2(hz / 440.0))


def note_to_hz(note: str) -> float:
    """'A4' -> 440.0, 'C4' -> 261.626..., 'Eb4' -> 311.127..."""
    return 440.0 * (2 ** ((parse_note(note) - 69) / 12.0))


def hz_to_note(hz: float) -> tuple[str, int]:
    """Return (closest_note, cents_off). hz<=0 returns ('', 0)."""
    if hz is None or hz <= 0 or not np.isfinite(hz):
        return ("", 0)
    midi_exact = hz_to_midi(hz)
    midi = int(round(midi_exact))
    if midi < 0 or midi > 127:
        return ("", 0)
    return (midi_to_name(midi), int(round((midi_exact - midi) * 100)))


@dataclass
class PitchTrack:
    frame_hz: np.ndarray          # fundamental Hz per frame (NaN where unvoiced)
    voiced: np.ndarray            # bool per frame
    times_s: np.ndarray           # frame timestamps in seconds
    hop_s: float                  # hop duration in seconds


# ---- pYIN backend (librosa) ----

DEFAULT_FMIN_HZ = 65.41    # C2
DEFAULT_FMAX_HZ = 2093.0   # C7


def _extract_pyin(y: np.ndarray, sr: int, hop_ms: float, fmin: float, fmax: float) -> PitchTrack:
    import librosa  # lazy
    hop_length = max(1, int(sr * hop_ms / 1000.0))
    f0, voiced_flag, _vp = librosa.pyin(
        y, fmin=fmin, fmax=fmax, sr=sr, hop_length=hop_length,
        fill_na=np.nan, frame_length=2048,
    )
    times = librosa.times_like(f0, sr=sr, hop_length=hop_length)
    return PitchTrack(frame_hz=f0, voiced=np.nan_to_num(voiced_flag).astype(bool),
                      times_s=times, hop_s=hop_length / sr)


# ---- CREPE backend (optional) ----

def _extract_crepe(y: np.ndarray, sr: int, hop_ms: float = 10.0) -> PitchTrack:
    import crepe  # lazy — only if installed
    time_s, frequency, confidence, _ = crepe.predict(
        y, sr, model_capacity="medium", viterbi=True, step_size=int(hop_ms),
        verbose=0,
    )
    voiced = confidence > 0.5
    f0 = frequency.astype(float).copy()
    f0[~voiced] = np.nan
    return PitchTrack(frame_hz=f0, voiced=voiced, times_s=time_s, hop_s=hop_ms / 1000.0)


def extract_pitch(
    y: np.ndarray,
    sr: int,
    hop_ms: float = 10.0,
    *,
    fmin: float | None = None,
    fmax: float | None = None,
) -> PitchTrack:
    """Frame-level f0. Pass fmin/fmax (e.g. from `search_range_for`) to
    restrict pYIN to the exercise's register — faster and fewer octave errors."""
    backend = os.getenv("PITCH_BACKEND", "pyin").lower()
    if backend == "crepe":
        try:
            return _extract_crepe(y, sr, hop_ms)
        except ImportError:
            # Fall back silently; caller can inspect os.environ.
            pass
    return _extract_pyin(y, sr, hop_ms, fmin or DEFAULT_FMIN_HZ, fmax or DEFAULT_FMAX_HZ)


def search_range_for(target_pitches: list[str]) -> tuple[float, float]:
    """pYIN search band covering the target notes plus an octave (and a
    semitone) either side, so octave slips and near-miss wrong notes are
    still detected."""
    if not target_pitches:
        return DEFAULT_FMIN_HZ, DEFAULT_FMAX_HZ
    midis = [parse_note(p) for p in target_pitches]
    lo = 440.0 * 2 ** ((min(midis) - 13 - 69) / 12.0)
    hi = 440.0 * 2 ** ((max(midis) + 13 - 69) / 12.0)
    return max(32.7, lo), min(4186.0, hi)


# ---- Note segmentation ----

def segment_notes(
    track: PitchTrack,
    min_note_s: float = 0.08,
    onset_times_s: list[float] | None = None,
    rms: np.ndarray | None = None,
    rms_times_s: np.ndarray | None = None,
    hysteresis_s: float = 0.05,
) -> list[dict]:
    """Group voiced frames into note segments.

    - A pitch change only starts a new note once the new semitone has held
      for `hysteresis_s` (so vibrato around a note boundary doesn't shred
      the note into fragments).
    - Detected onsets split a voiced run even when the pitch doesn't change,
      which is how a re-struck repeated note (C C G G…) becomes two notes.
      When an RMS envelope is supplied, an onset only splits if the energy
      actually rises across it, to avoid splitting sustained sung notes.

    Returns list of {pitch, startMs, durationMs, centsOff, hz}, where pitch /
    centsOff / hz come from the segment's median f0.
    """
    n = len(track.frame_hz)
    if n == 0:
        return []

    hz = np.asarray(track.frame_hz, dtype=float)
    voiced = np.asarray(track.voiced, dtype=bool) & np.isfinite(hz) & (hz > 0)
    midi_round = np.full(n, -1, dtype=int)
    midi_round[voiced] = np.rint(69 + 12 * np.log2(hz[voiced] / 440.0)).astype(int)
    hyst_frames = max(1, int(round(hysteresis_s / track.hop_s)))

    # 1) Voiced runs, split on held pitch changes.
    bounds: list[tuple[int, int]] = []   # [start, end) frame indices
    i = 0
    while i < n:
        if not voiced[i]:
            i += 1
            continue
        start = i
        cur = midi_round[i]
        j = i + 1
        while j < n and voiced[j]:
            if midi_round[j] != cur:
                k = j
                while k < n and voiced[k] and midi_round[k] == midi_round[j]:
                    k += 1
                if k - j >= hyst_frames:
                    bounds.append((start, j))
                    start, cur = j, midi_round[j]
                j = k
                continue
            j += 1
        bounds.append((start, j))
        i = j

    # 2) Split runs at genuine onsets (repeated notes).
    if onset_times_s:
        min_frames = max(1, int(round(min_note_s / track.hop_s)))
        split_bounds: list[tuple[int, int]] = []
        for start, end in bounds:
            cuts = []
            for t in onset_times_s:
                f = int(np.searchsorted(track.times_s, t))
                if start + min_frames <= f <= end - min_frames and _energy_rises(t, rms, rms_times_s):
                    if not cuts or f - cuts[-1] >= min_frames:
                        cuts.append(f)
            edges = [start, *cuts, end]
            split_bounds.extend(zip(edges[:-1], edges[1:]))
        bounds = split_bounds

    # 3) Emit segments that are long enough.
    out: list[dict] = []
    for start, end in bounds:
        start_s = float(track.times_s[start])
        end_s = float(track.times_s[end - 1]) + track.hop_s
        if end_s - start_s < min_note_s:
            continue
        seg_hz = hz[start:end][voiced[start:end]]
        if len(seg_hz) == 0:
            continue
        med_hz = float(np.median(seg_hz))
        name, cents = hz_to_note(med_hz)
        if not name:
            continue
        out.append({
            "pitch": name,
            "startMs": int(round(start_s * 1000)),
            "durationMs": int(round((end_s - start_s) * 1000)),
            "centsOff": cents,
            "hz": round(med_hz, 3),
        })
    return out


def _energy_rises(t_s: float, rms: np.ndarray | None, rms_times_s: np.ndarray | None,
                  dip_s: float = 0.05, rise_s: float = 0.06, min_ratio: float = 1.15) -> bool:
    """True when the energy dips around `t_s` and then clearly re-attacks —
    a re-struck note. Vibrato and other pitch wobble trigger spurious onsets
    but have no dip-then-rise, so they don't split a sustained note."""
    if rms is None or rms_times_s is None or len(rms) == 0:
        return True
    dip = rms[(rms_times_s >= t_s - dip_s) & (rms_times_s <= t_s + 0.01)]
    after = rms[(rms_times_s >= t_s) & (rms_times_s < t_s + rise_s)]
    if len(dip) == 0 or len(after) == 0:
        return True
    return float(np.max(after)) >= min_ratio * float(np.min(dip)) + 1e-6
