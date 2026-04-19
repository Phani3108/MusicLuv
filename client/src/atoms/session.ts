import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { DimScores } from "@catalogs/types";

export interface UserProfile {
  username: string;
  displayName: string;
  joinedAt: string;
  totalXp: number;                               // cross-instrument overall
  currentStreak: number;
  heartsToday: number;
  heartsMax: number;
  practiceMinutesToday: number;
}

export interface InstrumentProgress {
  xp: number;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  lessonsCompleted: string[];
  lastGrade?: { lessonId: string; composite: number; dimensions: DimScores; at: string };
}

export const userAtom = atomWithStorage<UserProfile | null>("musicluv:user", null);

export const progressAtom = atomWithStorage<Record<string, InstrumentProgress>>("musicluv:progress", {});

export const currentInstrumentAtom = atom<string | null>(null);
export const currentLessonIdAtom = atom<string | null>(null);

export type Screen = "welcome" | "picker" | "studio";
export const screenAtom = atom<Screen>("welcome");

// Mobile-friendly nav drawer (grouped panel access)
export const navDrawerOpenAtom = atom<boolean>(false);
