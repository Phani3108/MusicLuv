/**
 * Feature flags. Everything beyond the core loop (lesson → practice → grade →
 * feedback) is hidden until that loop is validated with real learners. The
 * code stays; users just don't see it.
 *
 *   VITE_FEATURES=community,proctored   enable specific features
 *   VITE_FEATURES=all                   enable everything
 *
 * The server gates the matching API routes with FEATURES (server/src/features.ts).
 */
import { EXPANSION_INSTRUMENT_IDS } from "@catalogs/expansionContent";

export type Feature =
  | "community"            // recital feed, public profiles
  | "creator"              // creator portal (lesson authoring + payouts)
  | "proctored"            // proctored certificate exams
  | "liveLessons"          // 1:1 live lesson booking
  | "compositions"         // composition submission + human review
  | "teacher"              // teacher dashboard — rebuilt on accounts/RLS in Phase 3
  | "expansionInstruments"; // the 14 instruments whose L2–L9 is generated scaffolding

const raw = ((import.meta as any).env?.VITE_FEATURES as string | undefined) ?? "";
const enabled = new Set(raw.split(",").map((s) => s.trim()).filter(Boolean));

export const isEnabled = (feature: Feature): boolean => enabled.has("all") || enabled.has(feature);

const expansion = new Set(EXPANSION_INSTRUMENT_IDS);

export const isInstrumentVisible = (instrumentId: string): boolean =>
  isEnabled("expansionInstruments") || !expansion.has(instrumentId);
