import { atom } from "jotai";

export type LessonPhase =
  | "concept"
  | "teach"
  | "demo"
  | "dissect"
  | "virtual_try"
  | "guided"
  | "attempt"
  | "feedback"
  | "mastery";

export const LESSON_PHASES: readonly LessonPhase[] = [
  "concept", "teach", "demo", "dissect", "virtual_try",
  "guided", "attempt", "feedback", "mastery",
] as const;

export const PHASE_META: Record<LessonPhase, { label: string; glyph: string; minSec: number; blurb: string }> = {
  concept:     { label: "Concept",      glyph: "💡", minSec: 4,  blurb: "What you're learning and why it matters" },
  teach:       { label: "Teach",        glyph: "📖", minSec: 15, blurb: "Read the lesson + key ideas" },
  demo:        { label: "Demo",         glyph: "▶️", minSec: 5,  blurb: "Listen to the target performance" },
  dissect:     { label: "Dissect",      glyph: "🔍", minSec: 8,  blurb: "Explore every control on the instrument" },
  virtual_try: { label: "Virtual try",  glyph: "🎹", minSec: 10, blurb: "Play on the on-screen instrument — no real one needed" },
  guided:      { label: "Guided play",  glyph: "👋", minSec: 15, blurb: "Slow-motion play-along with ghost-hand" },
  attempt:     { label: "Attempt",      glyph: "🎙️", minSec: 0,  blurb: "Full-speed take with your real instrument" },
  feedback:    { label: "Feedback",     glyph: "🪞", minSec: 10, blurb: "See your take overlaid on the target" },
  mastery:     { label: "Mastery",      glyph: "🏅", minSec: 0,  blurb: "Pass the quick quiz to advance" },
};

export const currentPhaseAtom = atom<LessonPhase>("concept");
export const completedPhasesAtom = atom<Set<LessonPhase>>(new Set<LessonPhase>());

/** Tracks whether the user has *engaged* with a phase enough to advance. */
export const phaseEngagementAtom = atom<Record<LessonPhase, boolean>>({
  concept: false, teach: false, demo: false, dissect: false,
  virtual_try: false, guided: false, attempt: false, feedback: false, mastery: false,
});

export const phaseIndex = (p: LessonPhase) => LESSON_PHASES.indexOf(p);
export const nextPhase = (p: LessonPhase): LessonPhase | null => {
  const i = phaseIndex(p);
  return i < LESSON_PHASES.length - 1 ? LESSON_PHASES[i + 1] : null;
};
export const prevPhase = (p: LessonPhase): LessonPhase | null => {
  const i = phaseIndex(p);
  return i > 0 ? LESSON_PHASES[i - 1] : null;
};
