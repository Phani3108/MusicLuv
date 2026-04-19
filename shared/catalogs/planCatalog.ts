/**
 * Subscription plans. Free / Pro / Genius tiers.
 *
 * Free = learner reaches Standard Certificate on their chosen instrument
 *   (L1-L3 + Standard exam, song upload limited to 1/day, no artist paths beyond L3).
 * Pro  = all 6 instruments, L1-L6, artist paths through Pro, unlimited uploads.
 * Genius = L7-L9, proctored grade exams, style-fingerprint matching, composition review.
 *
 * Geographic pricing (IN/LATAM discounts) surfaces at payment time;
 * the catalog stores USD baselines.
 */

export type PlanTier = "free" | "pro" | "genius";

export type FeatureKey =
  | "lessons_l1_to_l3"
  | "lessons_l4_to_l6"
  | "lessons_l7_to_l9"
  | "artist_paths_l1_to_l3"
  | "artist_paths_l4_to_l6"
  | "artist_paths_l7_to_l9"
  | "song_upload_unlimited"
  | "proctored_exams"
  | "multi_instrument"
  | "offline_cache"
  | "human_recital_review"
  | "style_fingerprint"
  | "composition_review"
  | "creator_portal"
  | "live_1on1";

export interface Plan {
  id: PlanTier;
  label: string;
  tagline: string;
  priceUsdMonthly: number;
  priceUsdYearly: number;
  features: FeatureKey[];
  highlights: string[];
  stripePriceIdMonthly?: string;   // populated by server env
  stripePriceIdYearly?: string;
  appStoreProductIdMonthly?: string;
  appStoreProductIdYearly?: string;
}

export const PLANS: Record<PlanTier, Plan> = {
  free: {
    id: "free",
    label: "Free",
    tagline: "Your Standard Certificate, on us.",
    priceUsdMonthly: 0,
    priceUsdYearly: 0,
    features: [
      "lessons_l1_to_l3",
      "artist_paths_l1_to_l3",
    ],
    highlights: [
      "L1-L3 on any one instrument",
      "Mentor chat + mastery quizzes",
      "Earn a free Standard Certificate",
      "1 song upload / day",
    ],
  },
  pro: {
    id: "pro",
    label: "Pro",
    tagline: "All instruments, through the Pro Certificate.",
    priceUsdMonthly: 9.99,
    priceUsdYearly: 79,
    features: [
      "lessons_l1_to_l3",
      "lessons_l4_to_l6",
      "artist_paths_l1_to_l3",
      "artist_paths_l4_to_l6",
      "song_upload_unlimited",
      "multi_instrument",
      "offline_cache",
    ],
    highlights: [
      "All L1-L6 content, every instrument",
      "Unlimited song uploads",
      "Offline lesson caching",
      "Artist signature licks through Pro difficulty",
    ],
  },
  genius: {
    id: "genius",
    label: "Genius",
    tagline: "Concert-quality certification + human review.",
    priceUsdMonthly: 19.99,
    priceUsdYearly: 159,
    features: [
      "lessons_l1_to_l3",
      "lessons_l4_to_l6",
      "lessons_l7_to_l9",
      "artist_paths_l1_to_l3",
      "artist_paths_l4_to_l6",
      "artist_paths_l7_to_l9",
      "song_upload_unlimited",
      "multi_instrument",
      "offline_cache",
      "proctored_exams",
      "human_recital_review",
      "style_fingerprint",
      "composition_review",
      "creator_portal",
      "live_1on1",
    ],
    highlights: [
      "Everything in Pro",
      "L7-L9 Genius tier content",
      "Proctored tier certificate exams",
      "Human-reviewed recital submissions",
      "Style-fingerprint matching (play in Hendrix / Shankar / Rahman voice)",
      "Composition + creator portal access",
    ],
  },
};

/** Lowest plan that unlocks a given feature, or null if everyone has it. */
export function minimumPlanFor(feature: FeatureKey): PlanTier | null {
  for (const tier of ["free", "pro", "genius"] as PlanTier[]) {
    if (PLANS[tier].features.includes(feature)) return tier;
  }
  return null;
}

/** Does a plan grant a feature? */
export function planHas(plan: PlanTier, feature: FeatureKey): boolean {
  return PLANS[plan].features.includes(feature);
}

/** Map a lesson's tier + instrument to the feature key that gates it. */
export function featureForLesson(
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
): FeatureKey {
  if (level <= 3) return "lessons_l1_to_l3";
  if (level <= 6) return "lessons_l4_to_l6";
  return "lessons_l7_to_l9";
}

export const getPlan = (id: PlanTier) => PLANS[id];
export const listPlans = () => [PLANS.free, PLANS.pro, PLANS.genius];
