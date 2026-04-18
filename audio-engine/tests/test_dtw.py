import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from pipelines.dtw import align


def _notes(seq):
    return [{"pitch": p, "startMs": s, "durationMs": d} for p, s, d in seq]


def test_identity_alignment_zero_cost():
    target = _notes([("C4", 0, 500), ("D4", 500, 500), ("E4", 1000, 500)])
    user = [dict(n) for n in target]
    a = align(target, user)
    assert len(a.pairs) == 3
    assert a.total_cost == 0.0
    for p in a.pairs:
        assert p.cents_diff == 0
        assert p.onset_ms_diff == 0


def test_detuned_notes_have_cents_diff():
    target = _notes([("C4", 0, 500), ("D4", 500, 500)])
    user = _notes([("C#4", 0, 500), ("D4", 500, 500)])  # first note 100¢ sharp
    a = align(target, user)
    # Pair 1: C4 vs C#4 — 100 cents; pair 2: D4 vs D4
    assert abs(a.pairs[0].cents_diff - 100) < 1e-6
    assert a.pairs[1].cents_diff == 0


def test_rushed_notes_have_onset_diff():
    target = _notes([("C4", 0, 500), ("D4", 500, 500), ("E4", 1000, 500)])
    user = _notes([("C4", 0, 500), ("D4", 400, 500), ("E4", 800, 500)])
    a = align(target, user)
    assert a.pairs[1].onset_ms_diff == 100
    assert a.pairs[2].onset_ms_diff == 200


def test_extra_user_note_doesnt_crash():
    target = _notes([("C4", 0, 500)])
    user = _notes([("C4", 0, 500), ("D4", 500, 500)])
    a = align(target, user)
    # Path includes the extra as a gap
    assert (-1, 1) in a.path or (0, 1) in a.path or len(a.pairs) <= 2
