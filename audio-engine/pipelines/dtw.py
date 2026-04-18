"""Weighted DTW for aligning a student's note sequence to a target.

Sequences are ordered lists of (pitch_midi, onset_ms, duration_ms). We never
align to silence — both sequences are lists of notes, not frame vectors.
Returns the alignment path and total cost, plus the per-pair cost breakdown
so scoring can compute per-dimension scores from the same alignment.
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Callable
import numpy as np

from .pitch import note_to_hz


@dataclass
class AlignedPair:
    target_idx: int
    user_idx: int
    cents_diff: float
    onset_ms_diff: float
    duration_ms_diff: float
    cost: float


@dataclass
class Alignment:
    path: list[tuple[int, int]]
    pairs: list[AlignedPair]
    total_cost: float


def _midi_of(pitch: str) -> int:
    # 'C4' -> 60
    from .pitch import _NOTE_TO_MIDI  # type: ignore
    return _NOTE_TO_MIDI[pitch]


def _cents_diff(user_pitch: str, target_pitch: str) -> float:
    if not user_pitch or not target_pitch:
        return 1200.0
    uhz = note_to_hz(user_pitch)
    thz = note_to_hz(target_pitch)
    return abs(1200.0 * np.log2(uhz / thz))


def align(
    target: list[dict],
    user: list[dict],
    *,
    pitch_tolerance_cents: float = 40.0,
    rhythm_tolerance_ms: float = 120.0,
    w_pitch: float = 1.0,
    w_timing: float = 0.6,
    w_duration: float = 0.2,
) -> Alignment:
    """DTW on pre-segmented note lists.

    Each note dict: { 'pitch': 'C4', 'startMs': int, 'durationMs': int }
    """
    T = len(target)
    U = len(user)

    if T == 0 or U == 0:
        return Alignment(path=[], pairs=[], total_cost=float("inf"))

    def cost(i: int, j: int) -> float:
        t, u = target[i], user[j]
        cd = _cents_diff(u["pitch"], t["pitch"])
        od = abs(u["startMs"] - t["startMs"])
        dd = abs(u.get("durationMs", 0) - t.get("durationMs", 0))
        c = (w_pitch * (cd / pitch_tolerance_cents)
             + w_timing * (od / rhythm_tolerance_ms)
             + w_duration * (dd / max(t.get("durationMs", 1), 1)))
        return c

    INF = float("inf")
    D = np.full((T + 1, U + 1), INF)
    D[0, 0] = 0.0
    P = np.full((T + 1, U + 1), -1, dtype=np.int8)  # 0: diag, 1: up (skip user), 2: left (skip target)

    for i in range(1, T + 1):
        for j in range(1, U + 1):
            c = cost(i - 1, j - 1)
            diag = D[i - 1, j - 1] + c
            up = D[i - 1, j] + 1.5 * c       # gap in user (missed a note)
            left = D[i, j - 1] + 1.5 * c     # extra user note
            best = min(diag, up, left)
            D[i, j] = best
            P[i, j] = 0 if best == diag else (1 if best == up else 2)

    # Backtrack
    i, j = T, U
    path: list[tuple[int, int]] = []
    while i > 0 or j > 0:
        if i > 0 and j > 0 and P[i, j] == 0:
            path.append((i - 1, j - 1))
            i -= 1
            j -= 1
        elif i > 0 and (j == 0 or P[i, j] == 1):
            path.append((i - 1, -1))
            i -= 1
        else:
            path.append((-1, j - 1))
            j -= 1
    path.reverse()

    pairs: list[AlignedPair] = []
    for ti, ui in path:
        if ti < 0 or ui < 0:
            continue  # gap in one side; pitch-only scoring handles these via issues
        t, u = target[ti], user[ui]
        pairs.append(AlignedPair(
            target_idx=ti, user_idx=ui,
            cents_diff=_cents_diff(u["pitch"], t["pitch"]),
            onset_ms_diff=abs(u["startMs"] - t["startMs"]),
            duration_ms_diff=abs(u.get("durationMs", 0) - t.get("durationMs", 0)),
            cost=cost(ti, ui),
        ))

    return Alignment(path=path, pairs=pairs, total_cost=float(D[T, U]))
