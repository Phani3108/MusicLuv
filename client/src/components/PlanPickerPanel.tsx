import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import { planPickerOpenAtom, subscriptionAtom, authUserAtom, authPanelOpenAtom, launchStatusAtom } from "@/atoms/billing";
import { listPlans, LAUNCH_PROMO, type PlanTier } from "@catalogs/planCatalog";
import { SidePanel } from "./SidePanel";

const API_BASE = ((import.meta as any).env.VITE_SERVER_URL as string | undefined) || "";

/**
 * Plan comparison panel. Shows Free / Pro / Genius side by side.
 *
 * During the launch promo window (first 200 users OR 90 days, whichever
 * first), every plan's CTA reads "You're in — free" instead of "Start trial"
 * and Pro's price renders $7 crossed → $5 as anchor.
 *
 * When monetization is LIVE, CTA calls POST /api/v1/billing/checkout which
 * returns a Stripe Checkout Session URL (web) or queues IAP (mobile).
 */
export function PlanPickerPanel() {
  const [open, setOpen] = useAtom(planPickerOpenAtom);
  const [sub, setSub] = useAtom(subscriptionAtom);
  const [user] = useAtom(authUserAtom);
  const launch = useAtomValue(launchStatusAtom);
  const setAuthPanel = useSetAtom(authPanelOpenAtom);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;
  const plans = listPlans();
  const promoActive = !launch.active;

  const handleSelect = async (planId: PlanTier) => {
    setError(null);
    if (planId === "free") {
      setSub({ ...sub, plan: "free", status: sub.status === "active" ? "canceled" : "none" });
      setOpen(false);
      return;
    }
    if (!user) {
      setOpen(false);
      setAuthPanel(true);
      return;
    }

    setBusy(true);
    try {
      // Unified flow: server decides. If promo is active, server marks the
      // sub "active" immediately (no charge). If live, returns a Stripe URL.
      const res = await fetch(`${API_BASE}/api/v1/billing/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": user.id },
        body: JSON.stringify({ planId, cycle: billingCycle }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || `status ${res.status}`);

      if (data.promoApplied) {
        setSub({ ...sub, plan: planId, status: "active", stripeCustomerId: `promo_${user.id}` });
        setOpen(false);
      } else if (data.url && /^https?:\/\//.test(data.url)) {
        window.location.href = data.url;
      } else {
        // Fallback stub URL from dev billingService — mark locally.
        setSub({ ...sub, plan: planId, status: "trialing", trialEndsAt: new Date(Date.now() + 7 * 24 * 3600e3).toISOString() });
        setOpen(false);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <SidePanel title="Choose your plan" open={open} onClose={() => setOpen(false)} width="w-full md:w-[52rem]">
      <div className="space-y-5">
        {promoActive && (
          <div className="rounded-xl p-4 border border-emerald-400/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[10px] uppercase tracking-widest text-emerald-300">Launch promo · live</div>
              <div className="text-[10px] text-emerald-300/80 font-mono">
                {launch.seatsRemaining}/{launch.maxFreeUsers} seats · day {launch.daysElapsed}/{launch.maxFreeDays}
              </div>
            </div>
            <div className="text-sm font-semibold">Free for the first {launch.maxFreeUsers} users</div>
            <div className="text-xs text-white/70 mt-1">{LAUNCH_PROMO.copy}</div>
          </div>
        )}

        <div className="flex justify-center">
          <div className="inline-flex rounded-lg bg-white/5 border border-white/10 p-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-md text-sm transition-colors ${billingCycle === "monthly" ? "bg-white/10 text-white" : "text-white/60 hover:text-white/80"}`}
            >Monthly</button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-1.5 rounded-md text-sm transition-colors ${billingCycle === "yearly" ? "bg-white/10 text-white" : "text-white/60 hover:text-white/80"}`}
            >
              Yearly <span className="text-emerald-400 text-[10px] ml-1">-35%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          {plans.map((plan) => {
            const priceMonthly = billingCycle === "monthly" ? plan.priceUsdMonthly : Math.round((plan.priceUsdYearly / 12) * 10) / 10;
            const strikeMonthly = plan.strikethroughPriceUsdMonthly;
            const isCurrent = sub.plan === plan.id;
            const highlighted = plan.id === "pro";
            return (
              <div
                key={plan.id}
                className={`rounded-xl p-5 border transition-colors flex flex-col
                  ${highlighted ? "bg-gradient-to-b from-indigo-500/10 to-violet-500/5 border-indigo-400/30" : "bg-white/5 border-white/10"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold">{plan.label}</div>
                  {highlighted && <span className="text-[10px] uppercase tracking-widest text-indigo-300">Most popular</span>}
                </div>
                <div className="text-xs text-white/60 mb-4 min-h-[2.5rem]">{plan.tagline}</div>
                <div className="mb-5">
                  <div className="flex items-baseline gap-2">
                    {strikeMonthly && billingCycle === "monthly" && (
                      <span className="text-white/30 line-through font-mono text-xl">${strikeMonthly}</span>
                    )}
                    <span className="text-3xl font-mono font-semibold">${priceMonthly}</span>
                    <span className="text-white/40 text-sm">/mo</span>
                  </div>
                  {billingCycle === "yearly" && plan.priceUsdYearly > 0 && (
                    <div className="text-[10px] text-white/50 mt-1">Billed ${plan.priceUsdYearly}/year</div>
                  )}
                  {promoActive && plan.id !== "free" && (
                    <div className="text-[10px] mt-1.5 text-emerald-300/90">$0 during launch promo</div>
                  )}
                </div>
                <ul className="text-xs text-white/75 space-y-2 flex-1 mb-4">
                  {plan.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSelect(plan.id)}
                  disabled={isCurrent || busy}
                  className={`py-2.5 rounded-lg text-sm font-semibold transition-colors
                    ${isCurrent ? "bg-white/5 text-white/40 cursor-not-allowed"
                      : highlighted ? "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400"
                      : "bg-white/10 hover:bg-white/15 text-white"}
                    disabled:opacity-60`}
                >
                  {isCurrent
                    ? "Current plan"
                    : plan.id === "free"
                    ? "Stay on Free"
                    : promoActive
                    ? "Claim free seat"
                    : "Start subscription"}
                </button>
              </div>
            );
          })}
        </div>

        {error && (
          <div className="text-xs text-rose-400 text-center bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
            {error}
          </div>
        )}

        <div className="text-[11px] text-white/40 text-center">
          {promoActive
            ? "No card required during launch promo. Monetization flips on after 200 users or 90 days, whichever first."
            : "Cancel anytime. India + Latin America get regional pricing at checkout."}
        </div>
      </div>
    </SidePanel>
  );
}
