import { useAtom } from "jotai";
import { creatorPortalPanelAtom } from "@/atoms/community";
import { SidePanel } from "./SidePanel";

/**
 * Creator portal — author lessons, earn revenue share.
 *
 * Deferred to post-monetization (phase 6.5). Stripe Connect payout plumbing,
 * lesson editor, and approval queue are non-trivial and there's no point
 * building them before the monetization gate flips. For now this panel
 * surfaces the roadmap so learners know it's planned.
 */
export function CreatorPortalPanel() {
  const [open, setOpen] = useAtom(creatorPortalPanelAtom);

  return (
    <SidePanel
      title="Creator portal"
      subtitle="Author lessons, share revenue"
      open={open}
      onClose={() => setOpen(false)}
      width="w-full md:w-[30rem]"
    >
      <div className="space-y-5">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-400/20 text-center">
          <div className="text-5xl mb-3">✍️</div>
          <div className="text-[10px] uppercase tracking-widest text-amber-300 mb-1">Coming after launch</div>
          <h2 className="text-lg font-semibold mb-2">Build the curriculum with us</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            The Creator portal opens once MusicLuv exits its launch promo. Genius-tier
            members will be able to author lessons, submit them for educator review,
            and earn a 70% revenue share on sales (via Stripe Connect).
          </p>
        </div>

        <section className="space-y-3">
          <div className="text-[10px] uppercase tracking-widest text-white/40">What's planned</div>
          <FeatureRow glyph="📝" title="Lesson editor" body="Structured editor for writtenContent, audio refs, exercise plans, and mastery quizzes." />
          <FeatureRow glyph="🧪" title="Educator review queue" body="Our music educator vets every submission for pedagogical soundness before publish." />
          <FeatureRow glyph="💸" title="Stripe Connect payouts" body="70% creator / 30% platform on each sale. Monthly payouts to your connected bank." />
          <FeatureRow glyph="📊" title="Revenue dashboard" body="Sales, regional breakdown, top-performing lessons, suggested next topics." />
        </section>

        <div className="text-[11px] text-white/40 text-center">
          Want early access? Mention it to mentor chat — we're compiling a waitlist.
        </div>
      </div>
    </SidePanel>
  );
}

function FeatureRow({ glyph, title, body }: { glyph: string; title: string; body: string }) {
  return (
    <div className="flex gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
      <span className="text-2xl">{glyph}</span>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-white/60 mt-0.5">{body}</div>
      </div>
    </div>
  );
}
