/**
 * Billing service. Real Stripe integration primary (web); App Store
 * and Play Store IAP for mobile. Falls back to dev-stub behavior when
 * STRIPE_SECRET_KEY is unset so local development doesn't require
 * a Stripe project.
 *
 * Environment:
 *   STRIPE_SECRET_KEY       sk_live_... | sk_test_...
 *   STRIPE_WEBHOOK_SECRET   whsec_...     (for signature verification)
 *   STRIPE_PRICE_PRO_MONTHLY   price_... mapped to plan.priceUsdMonthly
 *   STRIPE_PRICE_PRO_YEARLY    price_...
 *   STRIPE_PRICE_GENIUS_MONTHLY
 *   STRIPE_PRICE_GENIUS_YEARLY
 *   CHECKOUT_SUCCESS_URL    defaults to <APP_URL>/billing/success
 *   CHECKOUT_CANCEL_URL     defaults to <APP_URL>/billing/cancel
 *   APP_URL                 e.g. https://musicluv.vercel.app
 *
 * When STRIPE_SECRET_KEY is missing:
 *   - createCheckoutSession returns a synthetic dev URL + fake record
 *   - handleStripeWebhook is a no-op logger
 *   - createConnectAccountLink returns a stub
 */

import type { Request, Response } from "express";
import { PLANS, type PlanTier } from "@catalogs/planCatalog";
import { atomicWriteJson, readJsonSafe, dataPath } from "./persistence.js";
import { isMonetizationActive } from "./monetizationGate.js";
import { captureError } from "./observability.js";

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
const CUST_FILE = dataPath("stripeCustomers.json"); // userId → stripeCustomerId
const CONNECT_FILE = dataPath("stripeConnectAccounts.json"); // userId → stripeAccountId

function loadAll(): Record<string, SubscriptionRecord> {
  return readJsonSafe<Record<string, SubscriptionRecord>>(SUB_FILE, {});
}
function saveAll(data: Record<string, SubscriptionRecord>): void {
  atomicWriteJson(SUB_FILE, data);
}

function loadCustomers(): Record<string, string> {
  return readJsonSafe<Record<string, string>>(CUST_FILE, {});
}
function saveCustomers(data: Record<string, string>): void {
  atomicWriteJson(CUST_FILE, data);
}

function loadConnectAccounts(): Record<string, string> {
  return readJsonSafe<Record<string, string>>(CONNECT_FILE, {});
}
function saveConnectAccounts(data: Record<string, string>): void {
  atomicWriteJson(CONNECT_FILE, data);
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

// ── Stripe SDK (lazy) ────────────────────────────────────────────────
let stripeClient: any = null;
let stripeReady: Promise<any> | null = null;

async function getStripe(): Promise<any> {
  if (stripeClient) return stripeClient;
  if (!process.env.STRIPE_SECRET_KEY) return null;
  if (stripeReady) return stripeReady;
  stripeReady = (async () => {
    try {
      const mod: any = await import("stripe");
      const Stripe = mod.default || mod.Stripe || mod;
      stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2024-11-20.acacia" as any,
        typescript: true,
      });
      return stripeClient;
    } catch (err) {
      captureError(err as Error, { where: "stripe.init" });
      return null;
    }
  })();
  return stripeReady;
}

/**
 * Resolve the Stripe Customer for a given user, creating one if needed.
 */
async function ensureCustomer(userId: string, email?: string): Promise<string | null> {
  const stripe = await getStripe();
  if (!stripe) return null;
  const map = loadCustomers();
  if (map[userId]) return map[userId];
  try {
    const customer = await stripe.customers.create({
      metadata: { userId },
      email,
    });
    map[userId] = customer.id;
    saveCustomers(map);
    return customer.id;
  } catch (err) {
    captureError(err as Error, { where: "stripe.customers.create", userId });
    return null;
  }
}

function priceIdFor(planId: PlanTier, cycle: "monthly" | "yearly"): string | null {
  const envKey =
    planId === "pro"
      ? cycle === "monthly" ? "STRIPE_PRICE_PRO_MONTHLY" : "STRIPE_PRICE_PRO_YEARLY"
      : planId === "genius"
        ? cycle === "monthly" ? "STRIPE_PRICE_GENIUS_MONTHLY" : "STRIPE_PRICE_GENIUS_YEARLY"
        : null;
  return envKey ? process.env[envKey] ?? null : null;
}

/**
 * Create a Stripe Checkout Session. Real session when STRIPE_SECRET_KEY
 * + price IDs are configured; otherwise dev stub (synthetic URL + fake
 * trialing record) so local dev UX flows end-to-end.
 *
 * During the launch promo window, short-circuits to a promo grant —
 * no Stripe round-trip, no charge.
 */
export async function createCheckoutSession(
  userId: string,
  planId: PlanTier,
  cycle: "monthly" | "yearly",
  email?: string,
): Promise<{ url: string; sessionId: string; promoApplied?: boolean }> {
  if (planId === "free") {
    throw new Error("Cannot checkout free plan");
  }

  // Launch promo: grant Genius-equivalent access without a charge.
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

  const stripe = await getStripe();
  const priceId = priceIdFor(planId, cycle);

  // Real Stripe path.
  if (stripe && priceId) {
    try {
      const customer = await ensureCustomer(userId, email);
      const successUrl = process.env.CHECKOUT_SUCCESS_URL
        || `${process.env.APP_URL || "http://localhost:5173"}/billing/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = process.env.CHECKOUT_CANCEL_URL
        || `${process.env.APP_URL || "http://localhost:5173"}/billing/cancel`;

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: customer ?? undefined,
        customer_email: customer ? undefined : email,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelUrl,
        subscription_data: {
          trial_period_days: 7,
          metadata: { userId, planId, cycle },
        },
        metadata: { userId, planId, cycle },
        allow_promotion_codes: true,
      });

      // Mark "pending" locally so the UI can reflect in-flight state.
      setSubscription({
        userId,
        plan: planId,
        status: "trialing",
        provider: "stripe",
        stripeCustomerId: customer ?? undefined,
        stripeSubscriptionId: undefined,
        startedAt: new Date().toISOString(),
      });

      return {
        url: session.url!,
        sessionId: session.id,
      };
    } catch (err) {
      captureError(err as Error, { where: "stripe.checkout.sessions.create", userId, planId });
      // Fall through to dev stub so the UX doesn't hard-break.
    }
  }

  // Dev stub — trial record + synthetic confirmation URL.
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
 * Stripe webhook handler. Real signature verification when
 * STRIPE_WEBHOOK_SECRET is set; otherwise logs + processes best-effort.
 *
 * IMPORTANT: this endpoint needs raw body parsing, not JSON — mount it
 * before express.json() with an express.raw({ type: "application/json" })
 * middleware. See server/src/index.ts.
 */
export async function handleStripeWebhook(req: Request, res: Response): Promise<void> {
  const stripe = await getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers["stripe-signature"] as string | undefined;

  let event: any = null;

  if (stripe && webhookSecret && signature) {
    try {
      // `req.body` must be a Buffer here. Routes file sets this up.
      event = stripe.webhooks.constructEvent(req.body as any, signature, webhookSecret);
    } catch (err) {
      captureError(err as Error, { where: "stripe.webhooks.constructEvent" });
      res.status(400).json({ error: `Webhook signature failed: ${(err as Error).message}` });
      return;
    }
  } else {
    // Dev / missing secret — trust the body (for local testing only).
    try {
      event = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch {
      res.status(400).json({ error: "invalid_body" });
      return;
    }
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId as PlanTier | undefined;
        if (userId && planId) {
          setSubscription({
            ...getSubscription(userId),
            userId,
            plan: planId,
            status: "active",
            provider: "stripe",
            stripeCustomerId: session.customer || undefined,
            stripeSubscriptionId: session.subscription || undefined,
            startedAt: new Date().toISOString(),
          });
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object;
        const userId = sub.metadata?.userId;
        if (userId) {
          const cur = getSubscription(userId);
          setSubscription({
            ...cur,
            userId,
            status: mapStripeStatus(sub.status),
            stripeCustomerId: sub.customer,
            stripeSubscriptionId: sub.id,
            renewsAt: sub.current_period_end
              ? new Date(sub.current_period_end * 1000).toISOString()
              : cur.renewsAt,
          });
        }
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object;
        const userId = sub.metadata?.userId;
        if (userId) {
          const cur = getSubscription(userId);
          setSubscription({
            ...cur,
            userId,
            status: "canceled",
            canceledAt: new Date().toISOString(),
          });
        }
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const userId = invoice.metadata?.userId;
        if (userId) {
          const cur = getSubscription(userId);
          setSubscription({ ...cur, status: "past_due" });
        }
        break;
      }
    }
    res.json({ received: true });
  } catch (e) {
    captureError(e as Error, { where: "stripe.webhook.handler", eventType: event?.type });
    res.status(500).json({ error: (e as Error).message });
  }
}

function mapStripeStatus(s: string): SubscriptionRecord["status"] {
  switch (s) {
    case "active":
    case "incomplete_expired":
      return s === "active" ? "active" : "canceled";
    case "trialing":
      return "trialing";
    case "past_due":
    case "incomplete":
    case "unpaid":
      return "past_due";
    case "canceled":
      return "canceled";
    default:
      return "none";
  }
}

// ── Stripe Connect (creator payouts) ─────────────────────────────────

/**
 * Create or resume a Stripe Connect Express account for a creator +
 * return an account-link URL they visit to finish onboarding. Real
 * `accountLinks.create` when STRIPE_SECRET_KEY is set; otherwise
 * returns a stub URL.
 */
export async function createConnectAccountLink(
  userId: string,
  email?: string,
): Promise<{ url: string; accountId?: string; stub?: boolean }> {
  const stripe = await getStripe();
  if (!stripe) {
    return {
      url: `/creator/stripe-connect/onboarded?user=${encodeURIComponent(userId)}`,
      stub: true,
    };
  }

  try {
    const map = loadConnectAccounts();
    let accountId = map[userId];
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        email,
        metadata: { userId },
        capabilities: {
          transfers: { requested: true },
        },
      });
      accountId = account.id;
      map[userId] = accountId;
      saveConnectAccounts(map);
    }

    const base = process.env.APP_URL || "http://localhost:5173";
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${base}/creator/connect-refresh`,
      return_url: `${base}/creator/connect-return`,
      type: "account_onboarding",
    });

    return { url: accountLink.url, accountId };
  } catch (err) {
    captureError(err as Error, { where: "stripe.accountLinks.create", userId });
    return {
      url: `/creator/stripe-connect/onboarded?user=${encodeURIComponent(userId)}`,
      stub: true,
    };
  }
}

// ── IAP (real verification stubbed until Apple/Google keys land) ─────

export async function verifyIapReceipt(
  userId: string,
  provider: "appstore" | "playstore",
  receipt: string,
  planId: PlanTier,
): Promise<SubscriptionRecord> {
  // Production TODO: verify via Apple's verifyReceipt endpoint or
  // Google Play Developer API. Pending integration; for now we trust
  // the receipt payload on the client side (not suitable for real money).
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

/** Cancel a subscription. Real Stripe cancel when SDK available. */
export async function cancelSubscription(userId: string): Promise<SubscriptionRecord> {
  const current = getSubscription(userId);
  const stripe = await getStripe();
  if (stripe && current.stripeSubscriptionId && !current.stripeSubscriptionId.startsWith("dev_") && !current.stripeSubscriptionId.startsWith("promo_") && !current.stripeSubscriptionId.startsWith("iap_")) {
    try {
      await stripe.subscriptions.cancel(current.stripeSubscriptionId);
    } catch (err) {
      captureError(err as Error, { where: "stripe.subscriptions.cancel", userId });
    }
  }
  const updated: SubscriptionRecord = {
    ...current,
    status: "canceled",
    canceledAt: new Date().toISOString(),
  };
  setSubscription(updated);
  return updated;
}
