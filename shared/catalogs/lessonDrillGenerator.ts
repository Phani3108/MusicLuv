/**
 * Drill generator. Given a lesson + its matching exercise, produces a
 * multi-drill set for every practice phase so learners can spend deep
 * time at each step instead of advancing after a single pass.
 *
 * Drill counts per phase (scales slightly with level — harder lessons
 * get more depth):
 *   teach      · 3 teaching points (concept / technique / pitfall)
 *   demo       · 3–4 clips (slow 50% · medium 75% · full 100% · plus
 *                mid-section focus on L4+)
 *   dissect    · 3–5 points (combines instrument controls + musical
 *                key moments in the passage)
 *   virtualTry · 3 progressive prompts (first 3 notes · middle · full
 *                climax)
 *   guided     · 3–5 pattern variations (original, first half, second
 *                half, backwards at higher levels)
 *   attempt    · 3 takes (slow warm-up · full tempo · challenge
 *                variation at L4+)
 *
 * Backward compatible — if a lesson already ships `drills`, the
 * generator leaves it alone; otherwise it spreads the generated set in.
 */

import type {
  Lesson, Exercise, Instrument, LessonDrills,
  TargetNote, Level,
} from "./types";

const INDIAN_SVARA_LABELS = ["Sa", "Re", "Ga", "Ma", "Pa", "Dha", "Ni", "Sa'"];

function trimNotes(notes: TargetNote[], from: number, to: number): TargetNote[] {
  const slice = notes.slice(from, to);
  if (slice.length === 0) return [];
  const anchor = slice[0].startMs;
  return slice.map((n) => ({ ...n, startMs: n.startMs - anchor }));
}

function shiftNotes(notes: TargetNote[], factor: number): TargetNote[] {
  return notes.map((n) => ({ ...n, startMs: Math.round(n.startMs * factor), durationMs: Math.round(n.durationMs * factor) }));
}

function reverseNotes(notes: TargetNote[]): TargetNote[] {
  const maxEnd = Math.max(...notes.map((n) => n.startMs + n.durationMs));
  return notes
    .map((n) => ({ ...n, startMs: maxEnd - n.startMs - n.durationMs }))
    .sort((a, b) => a.startMs - b.startMs);
}

/** Produce a rich LessonDrills payload for the given lesson + exercise. */
export function generateDrills(lesson: Lesson, exercise: Exercise, instrument: Instrument): LessonDrills {
  const level = lesson.level;
  const notes = exercise.targetPattern.notes ?? [];
  const onsets = exercise.targetPattern.onsets ?? [];
  const hasNotes = notes.length > 0;
  const hasOnsets = onsets.length > 0;
  const isIndian = instrument.origin === "indian_classical";

  // ── Teach (3 points) ─────────────────────────────────────────────
  const teach = [
    {
      id: "t_concept",
      heading: `Why ${lesson.title.replace(/.*·\s*/, "")} matters`,
      body: `${lesson.objectives[0] ?? "Build the foundation skill for this lesson."}\n\nFocus: listen to the reference once before you pick up the instrument. Understanding comes before execution.`,
    },
    {
      id: "t_technique",
      heading: "Technique focus",
      body:
        level <= 3
          ? "Relax your hands + breath. Slow tempo, consistent attack. Don't worry about speed — clean repetitions build faster than rushed ones."
          : level <= 6
          ? "Work the transition points — where one note meets the next. That's where Pro-tier control is built. Stay relaxed at tempo; tension eats the tone."
          : "Expressivity first, accuracy second — at Genius tier the grading weights tone + dynamics more than pitch. Make each note mean something.",
    },
    {
      id: "t_pitfall",
      heading: "Common mistakes",
      body:
        level <= 3
          ? "Most learners rush the tempo + squeeze the instrument. If your forearm burns, you're gripping too hard. Reset."
          : level <= 6
          ? "Ornaments are often added too early — master the clean line first, then layer ornamentation. Don't hide a rough line with decoration."
          : "The usual Genius trap: over-performing. Trust the grading — clarity + intention beat flashy speed in reviewer feedback.",
    },
  ];

  // ── Demo (3–4 clips) ─────────────────────────────────────────────
  const demo: NonNullable<LessonDrills["demo"]> = [];
  if (hasNotes) {
    demo.push({
      id: "d_slow",
      label: "Slow · 50%",
      description: "Half-speed — every note held long enough to hear its contour.",
      notes: shiftNotes(notes, 2),
      tempoBpm: Math.round(exercise.tempo.bpm * 0.5),
    });
    demo.push({
      id: "d_medium",
      label: "Medium · 75%",
      description: "Three-quarter speed — articulation audible, tempo still forgiving.",
      notes: shiftNotes(notes, 4 / 3),
      tempoBpm: Math.round(exercise.tempo.bpm * 0.75),
    });
    demo.push({
      id: "d_full",
      label: "Full tempo · 100%",
      description: "Target speed. Listen for phrasing + dynamics.",
      notes,
      tempoBpm: exercise.tempo.bpm,
    });
    if (level >= 4 && notes.length >= 6) {
      // Add a mid-section spotlight for deeper phrases
      const mid = Math.floor(notes.length / 3);
      demo.push({
        id: "d_section",
        label: "Middle section · slow",
        description: `Focus on notes ${mid + 1}–${mid * 2} — often the hardest transition.`,
        notes: shiftNotes(trimNotes(notes, mid, mid * 2), 1.5),
      });
    }
  }
  if (hasOnsets && !hasNotes) {
    demo.push({
      id: "d_slow_rhythm",
      label: "Slow · 50%",
      description: "Half-speed — feel each hit.",
      onsets: onsets.map((ms) => ms * 2),
      tempoBpm: Math.round(exercise.tempo.bpm * 0.5),
    });
    demo.push({
      id: "d_medium_rhythm",
      label: "Medium · 75%",
      description: "Three-quarter speed.",
      onsets: onsets.map((ms) => ms * (4 / 3)),
      tempoBpm: Math.round(exercise.tempo.bpm * 0.75),
    });
    demo.push({
      id: "d_full_rhythm",
      label: "Full tempo · 100%",
      description: "Target pulse.",
      onsets,
      tempoBpm: exercise.tempo.bpm,
    });
  }

  // ── Dissect (3–5 points) ─────────────────────────────────────────
  const dissect: NonNullable<LessonDrills["dissect"]> = [];

  // Instrument-control points: use the catalog's declared controls.
  instrument.controls.slice(0, 3).forEach((c) => {
    dissect.push({
      id: `ds_ctrl_${c.id}`,
      label: c.name,
      description: c.description,
      controlRefId: c.id,
    });
  });

  // Musical key moments — opening phrase + climax.
  if (hasNotes && notes.length >= 3) {
    dissect.push({
      id: "ds_opening",
      label: "Opening phrase",
      description: "The first 3-4 notes set the mood. Match the reference's attack + timing — that's half the lesson.",
      notes: trimNotes(notes, 0, Math.min(4, notes.length)),
    });
  }
  if (hasNotes && notes.length >= 6) {
    const peakIdx = notes
      .map((n, i) => ({ i, v: n.velocity ?? 0 }))
      .sort((a, b) => b.v - a.v)[0].i;
    const from = Math.max(0, peakIdx - 1);
    const to = Math.min(notes.length, peakIdx + 2);
    dissect.push({
      id: "ds_climax",
      label: "Peak moment",
      description: "The phrase's most expressive point. Listen for the dynamic shift + any ornament.",
      notes: trimNotes(notes, from, to),
    });
  }

  // ── Virtual try (3 prompts) ──────────────────────────────────────
  const targetNoteNames = hasNotes
    ? Array.from(new Set(notes.map((n) => n.pitch)))
    : ["C4", "D4", "E4"];

  const virtualTry: NonNullable<LessonDrills["virtualTry"]> = [
    {
      id: "vt_first",
      prompt: isIndian
        ? `Find the first three svaras on your instrument.`
        : `Find the first three notes of the passage on your instrument.`,
      targetNotes: targetNoteNames.slice(0, 3),
      minHits: 3,
    },
    {
      id: "vt_range",
      prompt: `Play the highest + lowest notes used in this lesson.`,
      targetNotes: [
        targetNoteNames[0],
        targetNoteNames[targetNoteNames.length - 1],
      ].filter(Boolean),
      minHits: 2,
    },
    {
      id: "vt_full",
      prompt: `Walk through every distinct note of the passage in any order.`,
      targetNotes: targetNoteNames.slice(0, 8),
      minHits: Math.min(5, targetNoteNames.length),
    },
  ];

  // ── Guided pattern variations (3–5) ──────────────────────────────
  const guided: NonNullable<LessonDrills["guided"]> = [];
  if (hasNotes) {
    guided.push({
      id: "g_full",
      label: "Full phrase",
      description: "The complete target pattern end-to-end.",
      notes,
    });
    if (notes.length >= 4) {
      guided.push({
        id: "g_first_half",
        label: "First half only",
        description: "Practice the opening before stitching it together.",
        notes: trimNotes(notes, 0, Math.ceil(notes.length / 2)),
      });
      guided.push({
        id: "g_second_half",
        label: "Second half only",
        description: "Sometimes the resolution is harder than the setup — drill it solo.",
        notes: trimNotes(notes, Math.floor(notes.length / 2), notes.length),
      });
    }
    if (level >= 5 && notes.length >= 4) {
      guided.push({
        id: "g_reversed",
        label: "Reversed",
        description: "Play the same notes in reverse order — forces you to actually read the line, not muscle-memory it.",
        notes: reverseNotes(notes),
      });
    }
  }
  if (hasOnsets && !hasNotes) {
    guided.push({
      id: "g_full_rhythm",
      label: "Full rhythm",
      description: "Every hit, at tempo.",
      onsets,
    });
    guided.push({
      id: "g_half_rhythm",
      label: "First half",
      description: "Feel the opening beats before stitching the cycle together.",
      onsets: onsets.slice(0, Math.ceil(onsets.length / 2)),
    });
  }

  // ── Attempt variations (3 takes) ─────────────────────────────────
  const attempt: NonNullable<LessonDrills["attempt"]> = [
    {
      id: "a_warmup",
      label: "Warm-up take · 50%",
      description: "Don't worry about the grade — just get your hands + ears in the zone.",
      tempoFactor: 0.5,
    },
    {
      id: "a_target",
      label: "Target tempo · 100%",
      description: "The real attempt. This one's graded — go for it.",
      tempoFactor: 1,
    },
  ];
  if (level >= 4) {
    attempt.push({
      id: "a_challenge",
      label: "Challenge · 110%",
      description: "One step faster than the target. Stretch toward the next level.",
      tempoFactor: 1.1,
    });
  } else {
    attempt.push({
      id: "a_perfect",
      label: "Perfect-run retry",
      description: "Your second graded take. Better than the first?",
      tempoFactor: 1,
    });
  }

  return { teach, demo, dissect, virtualTry, guided, attempt };
}

/**
 * Apply drill generation to a whole lesson catalog. Mutates the input:
 * each lesson gets a `drills` field if it doesn't already have one.
 */
export function hydrateLessonsWithDrills(
  lessons: Record<string, Lesson>,
  exercises: Record<string, Exercise>,
  instruments: Record<string, Instrument>,
): void {
  for (const lesson of Object.values(lessons)) {
    if (lesson.drills) continue;
    const exercise = exercises[lesson.exercisePlanId];
    const instrument = instruments[lesson.instrumentId];
    if (!exercise || !instrument) continue;
    lesson.drills = generateDrills(lesson, exercise, instrument);
  }
}

/** Convenience: only rebuild drills for a single lesson (e.g. editor preview). */
export function drillsForLesson(
  lesson: Lesson,
  exercise: Exercise,
  instrument: Instrument,
): LessonDrills {
  return generateDrills(lesson, exercise, instrument);
}

export { Level };
