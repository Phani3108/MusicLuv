"""Turn a raw transcription into a level-appropriate step timeline.

Implements the simplify policy from the plan:
  L1-2  : melody top-note only, quantize to 8th, one-octave range
  L3-4  : melody + occasional chord roots
  L5-6  : two-voice (melody + harmony)
  L7+   : pass through
"""
from __future__ import annotations

import numpy as np


def quantize_onset_ms(ms: int, beat_ms: int) -> int:
    # Round to the nearest multiple of beat_ms/2 (i.e., 8th note grid)
    grid = max(1, beat_ms // 2)
    return int(round(ms / grid) * grid)


def simplify(
    notes: list[dict],
    *,
    level: int,
    bpm: int = 80,
) -> list[dict]:
    """Reduce a note list to level-appropriate complexity.

    Each note dict: {'pitch','startMs','durationMs',...}
    """
    if not notes:
        return []

    beat_ms = int(60_000 / bpm)

    if level >= 7:
        return sorted(notes, key=lambda n: n["startMs"])

    # Group notes by quantized onset — take only the top pitch at each onset for L1-4
    grid = {}
    for n in notes:
        q = quantize_onset_ms(n["startMs"], beat_ms)
        grid.setdefault(q, []).append(n)

    simplified: list[dict] = []
    for onset_ms in sorted(grid.keys()):
        chord = grid[onset_ms]
        chord = sorted(chord, key=lambda n: _midi_of(n["pitch"]), reverse=True)
        top = chord[0]
        out = {
            "startMs": int(onset_ms),
            "durationMs": int(max(top["durationMs"], beat_ms // 2)),
            "pitch": top["pitch"],
        }
        if level >= 5 and len(chord) > 1:
            out["harmony"] = [chord[1]["pitch"]]
        simplified.append(out)

    return simplified


def render_steps(notes: list[dict]) -> list[dict]:
    """Turn simplified notes into user-facing step instructions."""
    steps = []
    for i, n in enumerate(notes):
        steps.append({
            "stepIndex": i + 1,
            "atMs": int(n["startMs"]),
            "durationMs": int(n["durationMs"]),
            "instruction": f"Play {n['pitch']}",
            "pitch": n["pitch"],
            "harmony": n.get("harmony", []),
        })
    return steps


def _midi_of(pitch: str) -> int:
    from .pitch import _NOTE_TO_MIDI  # type: ignore
    return _NOTE_TO_MIDI[pitch]
