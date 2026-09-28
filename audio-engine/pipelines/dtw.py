"""Order-preserving alignment of a student's take against a target pattern.

Both sides are event lists (notes with pitch, or bare onsets). Alignment is an
edit-distance DP with constant gap costs:

- a target event with no partner is a *missed* note,
- a student event with no partner is an *extra* note, except before the first
  and after the last aligned event, where extras are free (count-in noise,
  a test note, trailing noodling).

Timing is judged on the learner's own clock: we fit `user_ms = a * target_ms + b`
(Theil-Sen, robust to a few badly-timed notes) and score the residuals. `b` is
the start offset (reaction time, input latency — not penalized); `a` is the
tempo ratio (reported, mildly penalized by scoring). Absolute beat-sync grading
needs sample-accurate capture + latency calibration and belongs to the
on-device grader.

Pass 1 tries a few start-offset hypotheses with a forgiving timing weight and
keeps the cheapest alignment. The fit from its pitch-consistent pairs drives
pass 2, which uses normal timing weights and disambiguates repeated patterns.
"""
from __future__ import annotations

from dataclasses import dataclass, field

import numpy as np

from .pitch import parse_note

GAP_TARGET = 1.0          # cost of a missed target note
GAP_USER = 0.8            # cost of an extra student note (interior only)
PITCH_COST_CAP = 1.5      # in semitones — keeps a wrong note cheaper than miss+extra
TIMING_WEIGHT = 0.5
TIMING_COST_CAP = 2.0
MIN_TEMPO_RATIO, MAX_TEMPO_RATIO = 0.5, 2.0


@dataclass
class AlignedPair:
    target_idx: int
    user_idx: int
    cents_diff: float         # signed, user - target (minus tuning offset in relative mode)
    onset_ms_diff: float      # signed residual vs the fitted timeline (user - expected)
    duration_ms_diff: float   # signed, user duration - tempo-scaled target duration
    cost: float


@dataclass
class Alignment:
    path: list[tuple[int, int]]           # (target_idx | -1, user_idx | -1), in order
    pairs: list[AlignedPair]
    total_cost: float
    start_offset_ms: float = 0.0
    tempo_ratio: float = 1.0
    tuning_offset_cents: float = 0.0
    missed_targets: list[int] = field(default_factory=list)
    extra_user_interior: list[int] = field(default_factory=list)


def _event_midi(ev: dict) -> float | None:
    """Continuous MIDI for an event: prefer measured Hz, else name + cents."""
    hz = ev.get("hz")
    if hz:
        return 69.0 + 12.0 * float(np.log2(float(hz) / 440.0))
    pitch = ev.get("pitch")
    if not pitch:
        return None
    return parse_note(pitch) + float(ev.get("centsOff", 0) or 0) / 100.0


def _dp(cost: list[list[float]]) -> tuple[list[tuple[int, int]], float]:
    """Semi-global edit-distance DP. Leading/trailing student events are free."""
    T = len(cost)
    U = len(cost[0]) if T else 0
    INF = float("inf")
    D = [[0.0] * (U + 1) for _ in range(T + 1)]
    P = [[2] * (U + 1) for _ in range(T + 1)]   # 0 diag, 1 up (target missed), 2 left (extra)
    for i in range(1, T + 1):
        D[i][0] = D[i - 1][0] + GAP_TARGET
        P[i][0] = 1
    for i in range(1, T + 1):
        Di, Dp, ci, Pi = D[i], D[i - 1], cost[i - 1], P[i]
        for j in range(1, U + 1):
            best, move = Dp[j - 1] + ci[j - 1], 0
            up = Dp[j] + GAP_TARGET
            if up < best:
                best, move = up, 1
            left = Di[j - 1] + GAP_USER
            if left < best:
                best, move = left, 2
            Di[j] = best
            Pi[j] = move

    # Trailing student events after the best end column are free.
    j_end, best_end = 0, INF
    for j in range(U + 1):
        if D[T][j] <= best_end:
            j_end, best_end = j, D[T][j]

    path: list[tuple[int, int]] = [(-1, k) for k in range(U - 1, j_end - 1, -1)]
    i, j = T, j_end
    while i > 0:
        move = P[i][j] if j > 0 else 1
        if move == 0:
            path.append((i - 1, j - 1))
            i, j = i - 1, j - 1
        elif move == 1:
            path.append((i - 1, -1))
            i -= 1
        else:
            path.append((-1, j - 1))
            j -= 1
    path.extend((-1, k) for k in range(j - 1, -1, -1))   # leading extras
    path.reverse()
    return path, float(best_end)


def _theil_sen(t: np.ndarray, u: np.ndarray) -> tuple[float, float]:
    if len(t) == 0:
        return 1.0, 0.0
    if len(t) == 1:
        return 1.0, float(u[0] - t[0])
    dt = np.subtract.outer(t, t)
    du = np.subtract.outer(u, u)
    iu = np.triu_indices(len(t), k=1)
    dt, du = dt[iu], du[iu]
    ok = np.abs(dt) > 1.0
    a = float(np.median(du[ok] / dt[ok])) if ok.any() else 1.0
    a = float(np.clip(a, MIN_TEMPO_RATIO, MAX_TEMPO_RATIO))
    b = float(np.median(u - a * t))
    return a, b


def align(
    target: list[dict],
    user: list[dict],
    *,
    pitch_tolerance_cents: float = 40.0,
    rhythm_tolerance_ms: float = 120.0,
    mode: str = "notes",
    tuning_mode: str = "absolute",
) -> Alignment:
    """Align student events to target events.

    Each event: {'startMs': int, 'durationMs'?: int, 'pitch'?: 'C4', 'hz'?: float,
    'centsOff'?: int}. In `mode="onsets"` pitch is ignored entirely.
    """
    T, U = len(target), len(user)
    if T == 0 or U == 0:
        return Alignment(
            path=[(i, -1) for i in range(T)] + [(-1, j) for j in range(U)],
            pairs=[], total_cost=float("inf"),
            missed_targets=list(range(T)),
        )

    t_on = np.array([float(e["startMs"]) for e in target])
    u_on = np.array([float(e["startMs"]) for e in user])

    use_pitch = mode == "notes"
    if use_pitch:
        tm = np.array([_event_midi(e) for e in target], dtype=float)
        um = np.array([np.nan if m is None else m for m in map(_event_midi, user)], dtype=float)
        cents = (um[None, :] - tm[:, None]) * 100.0
        cents = np.where(np.isfinite(cents), cents, 1e4)
        pitch_cost = np.minimum(np.abs(cents) / 100.0, PITCH_COST_CAP)
    else:
        cents = np.zeros((T, U))
        pitch_cost = np.zeros((T, U))

    def cost_matrix(a: float, b: float, tol_ms: float) -> np.ndarray:
        residual = u_on[None, :] - (a * t_on[:, None] + b)
        timing = np.minimum(np.abs(residual) / (2.0 * tol_ms), TIMING_COST_CAP)
        return pitch_cost + TIMING_WEIGHT * timing

    # Pass 1: a handful of start-offset hypotheses, forgiving on timing.
    hypotheses = {0.0}
    for k in range(min(3, U)):
        for m in range(min(2, T)):
            hypotheses.add(float(u_on[k] - t_on[m]))
    best_path, best_cost = None, float("inf")
    for b0 in sorted(hypotheses):
        path, total = _dp(cost_matrix(1.0, b0, rhythm_tolerance_ms * 4.0).tolist())
        if total < best_cost:
            best_path, best_cost = path, total

    # Fit tempo + offset on pitch-consistent pairs (all pairs in onset mode).
    fit_pairs = [(ti, ui) for ti, ui in best_path
                 if ti >= 0 and ui >= 0 and abs(cents[ti, ui]) <= 100.0]
    a, b = _theil_sen(np.array([t_on[ti] for ti, _ in fit_pairs]),
                      np.array([u_on[ui] for _, ui in fit_pairs]))

    # Pass 2: normal timing weight against the fitted timeline.
    cm = cost_matrix(a, b, rhythm_tolerance_ms)
    path, total = _dp(cm.tolist())

    matched = [(ti, ui) for ti, ui in path if ti >= 0 and ui >= 0]
    tuning = 0.0
    if use_pitch and matched:
        near = [cents[ti, ui] for ti, ui in matched if abs(cents[ti, ui]) <= 60.0]
        if near:
            tuning = float(np.clip(np.median(near), -50.0, 50.0))
    cents_shift = tuning if tuning_mode == "relative" else 0.0

    pairs = [
        AlignedPair(
            target_idx=ti, user_idx=ui,
            cents_diff=float(cents[ti, ui] - cents_shift) if use_pitch else 0.0,
            onset_ms_diff=float(u_on[ui] - (a * t_on[ti] + b)),
            duration_ms_diff=float(user[ui].get("durationMs", 0) - a * target[ti].get("durationMs", 0)),
            cost=float(cm[ti, ui]),
        )
        for ti, ui in matched
    ]

    first = next((k for k, (ti, ui) in enumerate(path) if ti >= 0 and ui >= 0), None)
    last = max((k for k, (ti, ui) in enumerate(path) if ti >= 0 and ui >= 0), default=None)
    interior_extras = [] if first is None else [
        ui for k, (ti, ui) in enumerate(path) if ti < 0 and first < k < last
    ]

    return Alignment(
        path=path, pairs=pairs, total_cost=total,
        start_offset_ms=b, tempo_ratio=a, tuning_offset_cents=tuning,
        missed_targets=[ti for ti, ui in path if ti >= 0 and ui < 0],
        extra_user_interior=interior_extras,
    )
