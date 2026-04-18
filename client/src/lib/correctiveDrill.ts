/**
 * Corrective drill generator — auto-spawn a short targeted exercise from a
 * failed attempt. Per product-vision.md §3: "feedback converts directly into
 * the next action."
 *
 * Given the parent exercise + last grade, we identify the weakest dimension
 * and produce a shorter, slower, more-lenient derivative exercise that
 * isolates the problem.
 */
import type { Exercise } from "@catalogs/types";
import type { GradeResult, DetectedNote } from "@/atoms/practice";

export type WeakDim = "pitch" | "rhythm" | "tone" | "dynamics" | "consistency";

export interface CorrectiveDrill {
  id: string;
  parentExerciseId: string;
  weakestDim: WeakDim;
  title: string;
  blurb: string;
  exercise: Exercise;
  tempoScale: number;   // 0.5 = half speed, 1.0 = full
}

const DIM_BLURBS: Record<WeakDim, { title: string; blurb: string }> = {
  pitch: {
    title: "Pitch drill",
    blurb: "We isolated the 3–4 notes you drifted on. Slower tempo, nothing else to think about — just match the note.",
  },
  rhythm: {
    title: "Rhythm drill",
    blurb: "Same notes, slower metronome. Breathe, tap your foot, let each beat land in its spot.",
  },
  tone: {
    title: "Tone drill",
    blurb: "One long note at a time. Focus on a clean, even tone from start to release.",
  },
  dynamics: {
    title: "Dynamics drill",
    blurb: "Same notes with explicit loud / soft markings. Exaggerate the contrast; you can always dial it back.",
  },
  consistency: {
    title: "Consistency drill",
    blurb: "Play the passage three times in a row. Match the feel of your best take across all three.",
  },
};

/** Find the worst-performing consecutive window of notes using the detected array + target. */
function worstWindow(
  targetNotes: Exercise["targetPattern"]["notes"],
  detected: DetectedNote[] | undefined,
  windowSize: number
): NonNullable<Exercise["targetPattern"]["notes"]> {
  const notes = targetNotes ?? [];
  if (notes.length <= windowSize) return notes;
  if (!detected || detected.length === 0) return notes.slice(0, windowSize);

  let worstStart = 0;
  let worstScore = -Infinity;
  for (let i = 0; i <= notes.length - windowSize; i++) {
    let score = 0;
    for (let j = 0; j < windowSize; j++) {
      const d = detected[i + j];
      if (!d) continue;
      score += Math.abs(d.centsOff ?? 0);
    }
    if (score > worstScore) {
      worstScore = score;
      worstStart = i;
    }
  }
  return notes.slice(worstStart, worstStart + windowSize);
}

export function generateDrill(exercise: Exercise, grade: GradeResult): CorrectiveDrill | null {
  const dims = grade.dimensions;
  const entries = Object.entries(dims) as Array<[WeakDim, number]>;
  const sorted = entries.sort(([, a], [, b]) => a - b);
  const [weakestDim, weakestScore] = sorted[0];
  if (weakestScore >= 0.85) return null; // no drill needed — close to perfect

  const tempoScale = weakestDim === "rhythm" || weakestDim === "pitch" ? 0.5 : 0.75;
  const scaledBpm = Math.round(exercise.tempo.bpm * tempoScale);

  const isPitch = weakestDim === "pitch";
  const isRhythm = weakestDim === "rhythm";
  const isTone = weakestDim === "tone";

  let drillNotes: NonNullable<Exercise["targetPattern"]["notes"]> = [];
  const parentNotes = exercise.targetPattern.notes ?? [];

  if (isTone) {
    // Single sustained note — the first one from the worst window
    const worst = worstWindow(parentNotes, grade.userNotesDetected, 1);
    if (worst[0]) {
      drillNotes = [{ pitch: worst[0].pitch, startMs: 0, durationMs: 3000 }];
    }
  } else {
    // Take 3-4 worst notes, stretched to the slower tempo
    const size = Math.min(4, parentNotes.length);
    const worst = worstWindow(parentNotes, grade.userNotesDetected, size);
    const scaledBeatMs = 60_000 / scaledBpm / 2; // 8th-note feel
    drillNotes = worst.map((n, i) => ({
      pitch: n.pitch,
      startMs: Math.round(i * scaledBeatMs * 2),
      durationMs: Math.round(scaledBeatMs * 2),
      finger: n.finger,
    }));
  }

  if (drillNotes.length === 0) return null;

  const drillExercise: Exercise = {
    id: `${exercise.id}__drill_${weakestDim}`,
    type: isRhythm ? "rhythm_clap" : isPitch ? "play_note" : exercise.type,
    instrumentId: exercise.instrumentId,
    title: `${DIM_BLURBS[weakestDim].title} — ${exercise.title}`,
    targetPattern: { notes: drillNotes },
    tempo: { bpm: scaledBpm, meter: exercise.tempo.meter },
    gradingRubricId: exercise.gradingRubricId,
  };

  return {
    id: drillExercise.id,
    parentExerciseId: exercise.id,
    weakestDim,
    title: DIM_BLURBS[weakestDim].title,
    blurb: DIM_BLURBS[weakestDim].blurb,
    exercise: drillExercise,
    tempoScale,
  };
}
