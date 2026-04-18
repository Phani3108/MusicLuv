import { atom } from "jotai";
import type { DimScores } from "@catalogs/types";

export type PracticeStatus = "idle" | "mic_check" | "armed" | "recording" | "scoring" | "graded";

export const practiceStatusAtom = atom<PracticeStatus>("idle");
export const currentExerciseIdAtom = atom<string | null>(null);
export const playheadMsAtom = atom<number>(0);
export const livePitchHzAtom = atom<number | null>(null);
export const livePitchNoteAtom = atom<string | null>(null);
export const livePitchCentsAtom = atom<number>(0);

export interface GradeResult {
  composite: number;
  passed: boolean;
  dimensions: DimScores;
  issues: Array<{ at: number; expected?: string; detected?: string; centsOff?: number; msOff?: number; kind?: string; severity: "minor" | "major" }>;
  feedback: { canned: string; mentor?: string };
  xpAwarded: number;
}
export const lastGradeAtom = atom<GradeResult | null>(null);
