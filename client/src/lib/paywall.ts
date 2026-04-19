/**
 * Paywall middleware. Check feature access before triggering any gated
 * action (opening a L4+ lesson, song upload, proctored exam submission).
 *
 * Usage:
 *   const gate = usePaywall();
 *   if (!gate.canAccess("lessons_l7_to_l9", "L7 · Chopin prelude")) return;
 *   // proceed...
 */
import { useAtomValue, useSetAtom } from "jotai";
import { subscriptionAtom, paywallAtom } from "@/atoms/billing";
import { planHas, type FeatureKey } from "@catalogs/planCatalog";

export function usePaywall() {
  const sub = useAtomValue(subscriptionAtom);
  const setPaywall = useSetAtom(paywallAtom);

  return {
    plan: sub.plan,
    hasFeature: (feature: FeatureKey) => planHas(sub.plan, feature),
    /**
     * Returns true if allowed. If blocked, triggers the paywall modal
     * with a contextual label (e.g. "L7 · Chopin prelude").
     */
    canAccess(feature: FeatureKey, contextLabel?: string): boolean {
      if (planHas(sub.plan, feature)) return true;
      setPaywall({ feature, contextLabel });
      return false;
    },
    /** Use when you want to check without triggering the modal. */
    hasSilent(feature: FeatureKey): boolean {
      return planHas(sub.plan, feature);
    },
  };
}
