import { useAtom } from "jotai";
import { proctoredExamPanelAtom } from "@/atoms/community";
import { SidePanel } from "./SidePanel";

/**
 * Proctored certificate exams — official tier testing with a human proctor.
 *
 * Deferred to post-monetization (phase 6.5). Real proctoring requires
 * WebRTC + environment/cheating detection + payment processor + scheduled
 * proctor network, none of which are worth shipping before the launch
 * window closes. This panel surfaces the roadmap and lets users register
 * interest.
 */
export function ProctoredExamPanel() {
  const [open, setOpen] = useAtom(proctoredExamPanelAtom);

  return (
    <SidePanel
      title="Proctored certificate exams"
      subtitle="Official tier testing"
      open={open}
      onClose={() => setOpen(false)}
      width="w-full md:w-[30rem]"
    >
      <div className="space-y-5">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent border border-indigo-400/20 text-center">
          <div className="text-5xl mb-3">🏆</div>
          <div className="text-[10px] uppercase tracking-widest text-indigo-300 mb-1">Coming after launch</div>
          <h2 className="text-lg font-semibold mb-2">Earn LinkedIn-shareable certificates</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            Proctored exams let you earn a verified tier certificate reviewed by a real
            human musician. We're building this for release just after the launch-promo
            window closes.
          </p>
        </div>

        <section className="space-y-2">
          <div className="text-[10px] uppercase tracking-widest text-white/40">Planned exam tiers</div>
          <PlannedTier tier="Standard" price={29} body="L3 practical + 5-question written. 20-min slot with a verified proctor." />
          <PlannedTier tier="Pro" price={49} body="L6 practical + written + sight-read. 45-min slot." />
          <PlannedTier tier="Genius" price={99} body="L9 full concert piece + composition + multi-language if applicable. 90-min slot with panel review." />
        </section>

        <div className="text-[11px] text-white/40 text-center">
          Master the standard arc in-app today — the proctored exam is the official seal on top.
        </div>
      </div>
    </SidePanel>
  );
}

function PlannedTier({ tier, price, body }: { tier: string; price: number; body: string }) {
  return (
    <div className="flex gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <div className="text-sm font-semibold">{tier}</div>
          <div className="font-mono text-[11px] text-white/50">${price}</div>
        </div>
        <div className="text-xs text-white/60 mt-0.5">{body}</div>
      </div>
    </div>
  );
}
