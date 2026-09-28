/**
 * Server feature flags — mirror of client/src/lib/features.ts. Routes for
 * features beyond the core learn → practice → feedback loop are not
 * registered unless enabled, so they can't be called while hidden.
 *
 *   FEATURES=community,proctored   enable specific features
 *   FEATURES=all                   enable everything
 */
export type ServerFeature =
  | "community"      // recitals, comments, public profiles
  | "teacher"        // teacher/student assignments
  | "creator"        // creator lessons + Stripe Connect
  | "proctored"      // proctored certificate exams
  | "liveLessons"    // 1:1 live lesson marketplace
  | "compositions"   // composition submission + review
  | "styleMatch";    // artist style-fingerprint matching

/** Read at call time so tests (and hot config) see the current env. */
export function isFeatureEnabled(feature: ServerFeature): boolean {
  const enabled = new Set((process.env.FEATURES ?? "").split(",").map((s) => s.trim()).filter(Boolean));
  return enabled.has("all") || enabled.has(feature);
}
