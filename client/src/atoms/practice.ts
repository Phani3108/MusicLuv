import { atom } from "jotai";
import type { DimScores } from "@catalogs/types";

export type PracticeStatus =
  | "idle" | "mic_check" | "armed" | "counting_in" | "recording" | "scoring" | "graded"
  | "queued"   // take saved offline, waiting for the engine
  | "error";   // grading failed — take kept, nothing written to progress

export const practiceStatusAtom = atom<PracticeStatus>("idle");
export const currentExerciseIdAtom = atom<string | null>(null);
export const playheadMsAtom = atom<number>(0);
export const livePitchHzAtom = atom<number | null>(null);
export const livePitchNoteAtom = atom<string | null>(null);
export const livePitchCentsAtom = atom<number>(0);
/** User-facing reason the last grading attempt failed (status "error"). */
export const gradeErrorAtom = atom<string | null>(null);

export interface DetectedNote {
  pitch: string;
  startMs: number;
  durationMs: number;
  centsOff?: number;
  hz?: number;
}

export type Dimension = keyof DimScores;

export interface GradeIssue {
  at: number;
  expected?: string;
  detected?: string;
  centsOff?: number;
  msOff?: number;
  kind?: "early" | "late" | "missed" | "extra" | "tempo";
  tempoRatio?: number;
  severity: "minor" | "major";
}

export interface GradeAlignment {
  /** [targetIdx, userIdx] in order; -1 marks a missed target / extra note. */
  path: Array<[number, number]>;
  startOffsetMs: number;
  tempoRatio: number;
  tuningOffsetCents: number;
  matched: number;
  missed: number;
  extra: number;
}

export interface GradeResult {
  composite: number;
  passed: boolean;
  /** Only the dimensions that were actually measured. */
  dimensions: Partial<DimScores>;
  gradedDimensions?: Dimension[];
  notGraded?: Dimension[];
  issues: GradeIssue[];
  feedback: { canned: string; mentor?: string };
  xpAwarded: number;
  userNotesDetected?: DetectedNote[];
  alignment?: GradeAlignment;
  warning?: string;
  /** Tempo of the take (0.5 = half speed); target times were scaled by 1/tempoFactor. */
  tempoFactor?: number;
  /** "engine" = graded by the audio engine. "simulated" = demo mode; never touches progress. */
  source: "engine" | "simulated";
}
export const lastGradeAtom = atom<GradeResult | null>(null);

/** Blob URL of the student's most recent attempt audio (for overlay playback). */
export const lastAttemptAudioUrlAtom = atom<string | null>(null);
