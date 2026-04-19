import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";
import { planPickerOpenAtom, subscriptionAtom, authUserAtom, authPanelOpenAtom } from "@/atoms/billing";
import { listPlans, type PlanTier } from "@catalogs/planCatalog";
import { SidePanel } from "./SidePanel";

/**
 * Plan comparison panel. Shows Free / Pro / Genius side by side.
 * CTA flow: unauthenticated → AuthPanel first; authenticated → checkout.
 *
 * Checkout is stubbed — in production calls POST /api/v1/billing/checkout
 * which returns a Stripe Checkout Session URL (web) or opens IAP (mobile).
 */
export function PlanPickerPanel() {
  const [open, setOpen] = useAtom(planPickerOpenAtom);
  const [sub, setSub] = useAtom(subscriptionAtom);
  const [user] = useAtom(authUserAtom);
  const setAuthPanel = useSetAtom(authPanelOpenAtom);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  if (!open) return null;
  const plans = listPlans();

  const handleSelect = async (planId: PlanTier) => {
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
    // Production path: await fetch("/api/v1/billing/checkout", { method: "POST", ...})
    //                  const { url } = await res.json(); window.location.href = url;
    // Stub for now:
    setSub({ ...sub, plan: planId, status: "trialing", trialEndsAt: new Date(Date.now() + 7 * 24 * 3600e3).toISOString() });
    setOpen(false);
  };

  return (
    <SidePanel title="Choose your plan" open={open} onClose={() => setOpen(false)} width="w-full md:w-[52rem]">
      <div className="space-y-5">
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
              Yearly <span className="text-emerald-400 text-[10px] ml-1">-33%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          {plans.map((plan) => {
            const price = billingCycle === "monthly" ? plan.priceUsdMonthly : Math.round(plan.priceUsdYearly / 12);
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
                  <span className="text-3xl font-mono font-semibold">${price}</span>
                  <span className="text-white/40 text-sm ml-1">/mo</span>
                  {billingCycle === "yearly" && plan.priceUsdYearly > 0 && (
                    <div className="text-[10px] text-white/50 mt-1">Billed ${plan.priceUsdYearly}/year</div>
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
                  disabled={isCurrent}
                  className={`py-2.5 rounded-lg text-sm font-semibold transition-colors
                    ${isCurrent ? "bg-white/5 text-white/40 cursor-not-allowed"
                      : highlighted ? "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400"
                      : "bg-white/10 hover:bg-white/15 text-white"}`}
                >
                  {isCurrent ? "Current plan" : plan.id === "free" ? "Downgrade" : "Start 7-day trial"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-[11px] text-white/40 text-center">
          Cancel anytime. India + Latin America get regional pricing at checkout.
        </div>
      </div>
    </SidePanel>
  );
}
