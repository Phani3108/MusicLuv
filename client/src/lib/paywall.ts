/**
 * Paywall middleware. Check feature access before triggering any gated
 * action (opening a L4+ lesson, song upload, proctored exam submission).
 *
 * During the launch promo window (first 200 users OR first 90 days —
 * whichever first), monetization is OFF: every user gets Genius-equivalent
 * access regardless of their subscription plan.
 *
 * Usage:
 *   const gate = usePaywall();
 *   if (!gate.canAccess("lessons_l7_to_l9", "L7 · Chopin prelude")) return;
 *   // proceed...
 */
import { useAtomValue, useSetAtom } from "jotai";
import { subscriptionAtom, paywallAtom, launchStatusAtom } from "@/atoms/billing";
import { planHas, type FeatureKey } from "@catalogs/planCatalog";

export function usePaywall() {
  const sub = useAtomValue(subscriptionAtom);
  const launch = useAtomValue(launchStatusAtom);
  const setPaywall = useSetAtom(paywallAtom);

  // During launch promo, everyone is effectively Genius — no paywall fires.
  const promoActive = !launch.active;

  return {
    plan: sub.plan,
    promoActive,
    launch,
    hasFeature: (feature: FeatureKey) =>
      promoActive || planHas(sub.plan, feature),
    /**
     * Returns true if allowed. If blocked, triggers the paywall modal
     * with a contextual label (e.g. "L7 · Chopin prelude").
     */
    canAccess(feature: FeatureKey, contextLabel?: string): boolean {
      if (promoActive) return true;
      if (planHas(sub.plan, feature)) return true;
      setPaywall({ feature, contextLabel });
      return false;
    },
    /** Use when you want to check without triggering the modal. */
    hasSilent(feature: FeatureKey): boolean {
      return promoActive || planHas(sub.plan, feature);
    },
  };
}
