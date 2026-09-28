/** Pure exercise helpers shared by grading, the timeline and tests. */
import type { Exercise } from "@catalogs/types";

export type GradingMode = "notes" | "onsets";

/** Clap / drum / tabla exercises are graded on onset timing only. */
export function gradingModeFor(exercise: Exercise): GradingMode {
  const { notes = [], onsets = [] } = exercise.targetPattern;
  if (exercise.type === "rhythm_clap" || (notes.length === 0 && onsets.length > 0)) return "onsets";
  return "notes";
}

/** Stretch the target timeline for a slower/faster take (0.5 = half speed). */
export function scaleExercise(exercise: Exercise, tempoFactor: number): Exercise {
  if (!tempoFactor || tempoFactor === 1) return exercise;
  const k = 1 / tempoFactor;
  const { notes, onsets } = exercise.targetPattern;
  return {
    ...exercise,
    tempo: { ...exercise.tempo, bpm: Math.round(exercise.tempo.bpm * tempoFactor) },
    targetPattern: {
      ...exercise.targetPattern,
      notes: notes?.map((n) => ({ ...n, startMs: Math.round(n.startMs * k), durationMs: Math.round(n.durationMs * k) })),
      onsets: onsets?.map((ms) => Math.round(ms * k)),
    },
  };
}
