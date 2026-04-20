import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { PlanTier, FeatureKey } from "@catalogs/planCatalog";
import { planHas } from "@catalogs/planCatalog";

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  authProvider: "email" | "google" | "apple" | "beta-code";
}

export interface Subscription {
  plan: PlanTier;
  status: "active" | "trialing" | "past_due" | "canceled" | "none";
  renewsAt?: string;          // ISO
  trialEndsAt?: string;
  stripeCustomerId?: string;
  appStoreTransactionId?: string;
  playStorePurchaseToken?: string;
  region?: "US" | "IN" | "LATAM" | "EU" | "OTHER";
}

// Signed-in user (null = not authenticated). Persisted locally.
export const authUserAtom = atomWithStorage<AuthUser | null>("musicluv:auth", null);

// Current subscription state. Default: free plan, status "none" (no card on file).
export const subscriptionAtom = atomWithStorage<Subscription>("musicluv:sub", {
  plan: "free",
  status: "none",
});

// Derived: which features the current user has access to.
export const hasFeatureAtom = atom((get) => {
  const sub = get(subscriptionAtom);
  return (feature: FeatureKey) => planHas(sub.plan, feature);
});

// Paywall modal state — set to the blocked feature to trigger the upsell.
export const paywallAtom = atom<{ feature: FeatureKey; contextLabel?: string } | null>(null);

// Plan picker panel (chooser UI).
export const planPickerOpenAtom = atom<boolean>(false);

// Auth panel (sign-in/up UI).
export const authPanelOpenAtom = atom<boolean>(false);

// ── Launch promo state ────────────────────────────────────────────────
// Queried once at app boot from /api/v1/monetization/status. While the
// launch window is open, the paywall middleware treats every user as
// Genius-equivalent and the UI shows "Free for first 200 users" badges.
export interface LaunchStatus {
  active: boolean;              // true → monetization is LIVE; false → promo still running
  firstUserAt: string | null;
  userCount: number;
  seatsRemaining: number;
  maxFreeUsers: number;
  maxFreeDays: number;
  daysElapsed: number;
  daysRemaining: number;
  monetizationActivatedAt: string | null;
  activationReason: "user_cap_reached" | "days_elapsed" | "manual" | null;
}

/** Default assumes promo active — safest failure mode (no spurious paywalls). */
export const launchStatusAtom = atomWithStorage<LaunchStatus>("musicluv:launchStatus", {
  active: false,
  firstUserAt: null,
  userCount: 0,
  seatsRemaining: 200,
  maxFreeUsers: 200,
  maxFreeDays: 90,
  daysElapsed: 0,
  daysRemaining: 90,
  monetizationActivatedAt: null,
  activationReason: null,
});
