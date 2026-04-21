/**
 * Expansion content aggregator.
 *
 * Pulls together hand-authored L2-L4 overrides for all 14 expansion
 * instruments, grouped by family:
 *   - fretted (bass, ukulele, mandolin)
 *   - indian (bansuri, harmonium, mridangam, veena)
 *   - bowedReed (cello, saxophone, trumpet, clarinet)
 *   - keyboardElectronic (accordion, synth, dj_controller)
 *
 * The merged object is imported by lessonCatalog.ts and applied as
 * patches over the generator-produced skeleton lessons. Each patch is
 * Partial<Lesson> & Pick<Lesson, "id">, so fields we don't override
 * (level, tier, exercisePlanId, xpReward, etc.) come from the
 * generator.
 */

import type { Lesson } from "../types";
import { FRETTED_EXPANSION_OVERRIDES } from "./fretted";
import { INDIAN_EXPANSION_OVERRIDES } from "./indian";
import { BOWED_REED_EXPANSION_OVERRIDES } from "./bowedReed";
import { KEYBOARD_ELECTRONIC_EXPANSION_OVERRIDES } from "./keyboardElectronic";

export type LessonPatch = Partial<Lesson> & Pick<Lesson, "id">;

export const EXPANSION_OVERRIDES: Record<string, LessonPatch> = {
  ...FRETTED_EXPANSION_OVERRIDES,
  ...INDIAN_EXPANSION_OVERRIDES,
  ...BOWED_REED_EXPANSION_OVERRIDES,
  ...KEYBOARD_ELECTRONIC_EXPANSION_OVERRIDES,
};

/**
 * Merge patches into an existing LESSONS record. For each patched id:
 *  - If the lesson already exists (expected, from expansion generator),
 *    shallow-merge the patch over it. Arrays in the patch REPLACE the
 *    generator's arrays (objectives, audioRefs, etc.) since the whole
 *    point is hand-authored replacement.
 *  - If the lesson doesn't exist (shouldn't normally happen), log a
 *    warning and insert the patch as-is cast to Lesson — calling code
 *    should ensure base generation ran first.
 */
export function applyExpansionOverrides(
  lessons: Record<string, Lesson>,
): void {
  for (const [id, patch] of Object.entries(EXPANSION_OVERRIDES)) {
    const existing = lessons[id];
    if (!existing) {
      // Generator should have produced this; fall back gracefully.
      // eslint-disable-next-line no-console
      console.warn(`[expansion] patch for ${id} has no base lesson; inserting raw.`);
      lessons[id] = patch as Lesson;
      continue;
    }
    lessons[id] = {
      ...existing,
      ...patch,
      // drills is nested — merge so we don't wipe out other drill
      // sections (demo, guided_play, quizzes) that the hydrator
      // produces elsewhere.
      drills: {
        ...(existing.drills ?? {}),
        ...(patch.drills ?? {}),
      },
    } as Lesson;
  }
}
