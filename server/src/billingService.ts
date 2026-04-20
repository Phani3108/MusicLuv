/**
 * Billing service. Stripe primary (web), App Store / Play Store (mobile).
 *
 * Phase 5 scaffold — provider calls are stubbed behind a clean interface
 * so the client can be built against the real API shape from day one.
 * Real Stripe SDK wiring ships when we flip the STRIPE_SECRET env var.
 */

import type { Request, Response } from "express";
import { PLANS, type PlanTier } from "@catalogs/planCatalog";
import { atomicWriteJson, readJsonSafe, dataPath } from "./persistence.js";
import { isMonetizationActive } from "./monetizationGate.js";

export interface SubscriptionRecord {
  userId: string;
  plan: PlanTier;
  status: "active" | "trialing" | "past_due" | "canceled" | "none";
  provider?: "stripe" | "appstore" | "playstore";
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  startedAt: string;
  renewsAt?: string;
  canceledAt?: string;
  region?: "US" | "IN" | "LATAM" | "EU" | "OTHER";
}

const SUB_FILE = dataPath("subscriptions.json");

function loadAll(): Record<string, SubscriptionRecord> {
  return readJsonSafe<Record<string, SubscriptionRecord>>(SUB_FILE, {});
}

function saveAll(data: Record<string, SubscriptionRecord>): void {
  atomicWriteJson(SUB_FILE, data);
}

export function getSubscription(userId: string): SubscriptionRecord {
  const all = loadAll();
  return all[userId] ?? {
    userId,
    plan: "free",
    status: "none",
    startedAt: new Date().toISOString(),
  };
}

export function setSubscription(record: SubscriptionRecord): void {
  const all = loadAll();
  all[record.userId] = record;
  saveAll(all);
}

/**
 * Create a Stripe Checkout Session (or return a stub URL in dev).
 * Client redirects the browser to the returned URL.
 *
 * Production: Stripe SDK — stripe.checkout.sessions.create({
 *   customer, mode: "subscription",
 *   line_items: [{ price: planPrice, quantity: 1 }],
 *   success_url, cancel_url, subscription_data: { trial_period_days: 7 }
 * })
 */
export async function createCheckoutSession(
  userId: string,
  planId: PlanTier,
  cycle: "monthly" | "yearly"
): Promise<{ url: string; sessionId: string; promoApplied?: boolean }> {
  if (planId === "free") {
    throw new Error("Cannot checkout free plan");
  }

  // During the launch window everyone gets Genius-equivalent access.
  // Record the checkout intent as a "promo grant" (not a real charge) and
  // return a synthetic success URL so the client flow stays smooth.
  if (!isMonetizationActive()) {
    const record: SubscriptionRecord = {
      userId,
      plan: planId,
      status: "active",
      provider: "stripe",
      stripeCustomerId: `promo_cust_${userId}`,
      stripeSubscriptionId: `promo_${Date.now()}`,
      startedAt: new Date().toISOString(),
    };
    setSubscription(record);
    return {
      url: `/billing/promo-granted?plan=${planId}`,
      sessionId: record.stripeSubscriptionId!,
      promoApplied: true,
    };
  }

  const plan = PLANS[planId];
  const priceId = cycle === "monthly" ? plan.stripePriceIdMonthly : plan.stripePriceIdYearly;

  // Production: use real Stripe.
  if (process.env.STRIPE_SECRET_KEY) {
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    // const session = await stripe.checkout.sessions.create({ ... });
    // return { url: session.url!, sessionId: session.id };
  }

  // Dev stub — mark trialing immediately so UI flow works end-to-end.
  const record: SubscriptionRecord = {
    userId,
    plan: planId,
    status: "trialing",
    provider: "stripe",
    stripeCustomerId: `dev_cust_${userId}`,
    stripeSubscriptionId: `dev_sub_${Date.now()}`,
    startedAt: new Date().toISOString(),
    renewsAt: new Date(Date.now() + 7 * 24 * 3600e3).toISOString(),
  };
  setSubscription(record);

  const stubUrl = `/billing/dev-checkout-confirm?plan=${planId}&cycle=${cycle}&session=${record.stripeSubscriptionId}`;
  return { url: stubUrl, sessionId: record.stripeSubscriptionId! };
}

/**
 * Stripe webhook handler. Handles events:
 *   customer.subscription.created / .updated / .deleted
 *   invoice.payment_succeeded / .payment_failed
 */
export async function handleStripeWebhook(req: Request, res: Response): Promise<void> {
  // Production: verify signature with stripe.webhooks.constructEvent
  const event = req.body as { type: string; data: { object: { customer: string; status: string; id: string } } };

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        // Look up user by stripe customer id, update subscription record.
        console.log("[stripe] subscription update", event.data.object.id, event.data.object.status);
        break;
      }
      case "customer.subscription.deleted": {
        // Mark canceled.
        console.log("[stripe] subscription canceled", event.data.object.id);
        break;
      }
      case "invoice.payment_failed": {
        console.log("[stripe] payment failed", event.data.object.id);
        break;
      }
    }
    res.json({ received: true });
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

/**
 * Verify an App Store or Play Store IAP receipt + update subscription.
 * Production: Apple App Store Server API / Google Play Developer API.
 */
export async function verifyIapReceipt(
  userId: string,
  provider: "appstore" | "playstore",
  receipt: string,
  planId: PlanTier
): Promise<SubscriptionRecord> {
  // Production: call provider's verifyReceipt endpoint, validate response,
  //             extract subscription expiry + set record accordingly.
  const record: SubscriptionRecord = {
    userId,
    plan: planId,
    status: "active",
    provider,
    stripeSubscriptionId: `iap_${receipt.slice(0, 16)}`,
    startedAt: new Date().toISOString(),
    renewsAt: new Date(Date.now() + 30 * 24 * 3600e3).toISOString(),
  };
  setSubscription(record);
  return record;
}

/** Cancel a subscription (reverts to free at period end). */
export function cancelSubscription(userId: string): SubscriptionRecord {
  const current = getSubscription(userId);
  const updated: SubscriptionRecord = {
    ...current,
    status: "canceled",
    canceledAt: new Date().toISOString(),
  };
  setSubscription(updated);
  return updated;
}
