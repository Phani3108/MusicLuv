import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { paywallAtom, planPickerOpenAtom, launchStatusAtom } from "@/atoms/billing";
import { minimumPlanFor, getPlan, LAUNCH_PROMO, type FeatureKey } from "@catalogs/planCatalog";

const FEATURE_COPY: Record<FeatureKey, { title: string; body: string }> = {
  lessons_l1_to_l3: { title: "Standard tier lessons", body: "L1-L3 lessons are free. Sign in to track your progress." },
  lessons_l4_to_l6: { title: "Pro tier unlocks L4-L6", body: "Go deeper into scales, raga elaboration, chords, and repertoire with a Pro subscription." },
  lessons_l7_to_l9: { title: "Genius tier unlocks L7-L9", body: "Improvisation, composition, and concert-quality performance require the Genius tier." },
  artist_paths_l1_to_l3: { title: "Artist signature licks", body: "Available on all plans." },
  artist_paths_l4_to_l6: { title: "Pro-tier artist paths", body: "Hendrix, Segovia, Bill Evans, and Ravi Shankar unlock with Pro." },
  artist_paths_l7_to_l9: { title: "Genius-tier artist paths", body: "Advanced signature licks require Genius." },
  song_upload_unlimited: { title: "Unlimited song uploads", body: "Free tier allows 1 song upload/day. Pro removes the limit." },
  proctored_exams: { title: "Proctored tier exams", body: "Human-reviewed certification exams require the Genius tier." },
  multi_instrument: { title: "Multi-instrument progress", body: "Pro and Genius tiers track progress across all 6+ instruments." },
  offline_cache: { title: "Offline lesson caching", body: "Pro and Genius unlock offline practice." },
  human_recital_review: { title: "Human recital review", body: "Recital submissions reviewed by professional musicians (Genius only)." },
  style_fingerprint: { title: "Style-fingerprint matching", body: "Play 'in the voice of' Hendrix, Shankar, Rahman — Genius only." },
  composition_review: { title: "Composition review", body: "Feedback on your original compositions from working composers (Genius)." },
  creator_portal: { title: "Creator portal", body: "Author lessons + earn revenue share. Genius tier." },
  live_1on1: { title: "Live 1:1 lessons marketplace", body: "Book private lessons from verified teachers. Genius tier." },
};

/**
 * Upsell modal triggered by the paywall middleware. Shows the blocked
 * feature's context, the minimum plan that unlocks it, and a CTA to
 * open the plan picker.
 */
export function PaywallModal() {
  const [paywall, setPaywall] = useAtom(paywallAtom);
  const setPlanPicker = useSetAtom(planPickerOpenAtom);
  const launch = useAtomValue(launchStatusAtom);
  const promoActive = !launch.active;

  if (!paywall) return null;
  const copy = FEATURE_COPY[paywall.feature];
  const minPlan = minimumPlanFor(paywall.feature);
  const plan = minPlan ? getPlan(minPlan) : null;

  const close = () => setPaywall(null);
  const upgrade = () => {
    close();
    setPlanPicker(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink-900/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={close}>
      <div className="max-w-md w-full rounded-2xl bg-ink-800 border border-white/10 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-3">
          <div className="text-[10px] uppercase tracking-widest text-indigo-300">
            {promoActive ? "Included in your launch seat" : "Upgrade required"}
          </div>
          <button onClick={close} className="text-white/40 hover:text-white/70 text-xl leading-none">×</button>
        </div>
        <h2 className="text-xl font-semibold mb-2">{copy.title}</h2>
        {paywall.contextLabel && (
          <div className="text-sm text-white/60 mb-3">{paywall.contextLabel}</div>
        )}
        <p className="text-sm text-white/70 mb-5">{copy.body}</p>

        {promoActive && (
          <div className="rounded-xl p-4 mb-5 border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/5">
            <div className="flex items-baseline justify-between mb-1">
              <div className="font-semibold text-emerald-300">You're in — on us.</div>
              <div className="text-[10px] uppercase tracking-widest text-emerald-300/80">
                {launch.seatsRemaining} / {launch.maxFreeUsers} left
              </div>
            </div>
            <p className="text-xs text-white/70">
              {LAUNCH_PROMO.copy} Day {launch.daysElapsed} of {launch.maxFreeDays}.
            </p>
          </div>
        )}

        {!promoActive && plan && plan.id !== "free" && (
          <div className="rounded-xl bg-white/5 p-4 mb-5 border border-white/10">
            <div className="flex items-baseline justify-between mb-2">
              <div className="font-semibold text-white">{plan.label}</div>
              <div className="text-sm text-white/60 flex items-baseline gap-1">
                {plan.strikethroughPriceUsdMonthly && (
                  <span className="text-white/30 line-through font-mono">${plan.strikethroughPriceUsdMonthly}</span>
                )}
                <span className="text-white font-mono">${plan.priceUsdMonthly}</span>
                <span className="text-white/40">/mo</span>
              </div>
            </div>
            <div className="text-xs text-white/60">{plan.tagline}</div>
          </div>
        )}

        <div className="flex gap-2">
          <button onClick={close} className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white/80">
            {promoActive ? "Got it" : "Maybe later"}
          </button>
          <button onClick={upgrade} className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-sm font-semibold">
            {promoActive ? "See what's inside" : "See plans"}
          </button>
        </div>
      </div>
    </div>
  );
}
