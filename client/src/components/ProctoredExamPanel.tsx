import { useAtom } from "jotai";
import { useState } from "react";
import { proctoredExamPanelAtom, proctoredSessionsAtom } from "@/atoms/community";
import { SidePanel } from "./SidePanel";
import { getInstrument } from "@catalogs/instrumentCatalog";
import type { ProctoredExamSession } from "@catalogs/communityTypes";

/**
 * Proctored exam scheduler — for official tier certificate exams.
 * Standard $29 · Pro $49 · Genius $99. Remote proctoring via WebRTC
 * (production: Zoom / custom WebRTC stack with pre-exam environment check).
 */
export function ProctoredExamPanel() {
  const [open, setOpen] = useAtom(proctoredExamPanelAtom);
  const [sessions] = useAtom(proctoredSessionsAtom);
  const items = sessions.length > 0 ? sessions : MOCK_SESSIONS;
  const [tier, setTier] = useState<"standard" | "pro" | "genius">("standard");

  const fees = { standard: 29, pro: 49, genius: 99 };

  return (
    <SidePanel title="Proctored certificate exams" open={open} onClose={() => setOpen(false)} width="w-full md:w-[30rem]">
      <div className="space-y-5">
        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Schedule a new exam</div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {(["standard","pro","genius"] as const).map((t) => (
              <button key={t} onClick={() => setTier(t)}
                className={`p-3 rounded-lg border text-center transition-colors
                  ${tier === t ? "bg-indigo-500/20 border-indigo-400/40" : "bg-white/[0.02] border-white/5 hover:bg-white/5"}`}>
                <div className="text-xs font-semibold uppercase">{t}</div>
                <div className="font-mono text-base mt-0.5">${fees[t]}</div>
              </button>
            ))}
          </div>
          <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 font-semibold text-sm">
            Pay + choose time slot →
          </button>
          <div className="text-[11px] text-white/50 mt-2">
            You'll pick a 30-min slot with a verified proctor. Env-check happens 10 min before.
          </div>
        </section>

        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Your exam history</div>
          <div className="space-y-2">
            {items.map((s) => <SessionRow key={s.id} session={s} />)}
            {items.length === 0 && <div className="text-xs text-white/40">No proctored exams yet.</div>}
          </div>
        </section>
      </div>
    </SidePanel>
  );
}

function SessionRow({ session }: { session: ProctoredExamSession }) {
  const inst = getInstrument(session.instrumentId);
  const statusColor: Record<typeof session.status, string> = {
    scheduled: "text-white/50",
    in_progress: "text-indigo-300",
    passed: "text-emerald-300",
    failed: "text-rose-400",
    cancelled: "text-white/40",
  };
  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span>{inst?.glyph}</span>
          <div className="text-sm font-medium">{inst?.name} {session.tier}</div>
        </div>
        <span className={`text-[10px] uppercase tracking-widest ${statusColor[session.status]}`}>{session.status.replace("_", " ")}</span>
      </div>
      <div className="text-[11px] text-white/60">
        {new Date(session.scheduledAt).toLocaleString()} · ${session.feeUsd}
      </div>
    </div>
  );
}

const MOCK_SESSIONS: ProctoredExamSession[] = [
  { id: "ps1", userId: "me", examId: "sitar_standard_certificate", instrumentId: "sitar", tier: "standard", scheduledAt: new Date(Date.now() + 3 * 86400e3).toISOString(), status: "scheduled", feeUsd: 29 },
  { id: "ps2", userId: "me", examId: "piano_pro_certificate", instrumentId: "piano", tier: "pro", scheduledAt: new Date(Date.now() - 14 * 86400e3).toISOString(), status: "passed", feeUsd: 49, completedAt: new Date(Date.now() - 14 * 86400e3).toISOString() },
];
