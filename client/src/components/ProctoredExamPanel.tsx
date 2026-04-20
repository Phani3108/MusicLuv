import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { proctoredExamPanelAtom } from "@/atoms/community";
import { authUserAtom } from "@/atoms/billing";
import { SidePanel } from "./SidePanel";
import { AsyncBoundary, LoadingSpinner, EmptyState, ErrorState } from "./common/AsyncBoundary";
import { useAsync } from "@/hooks/useAsync";
import { fetchProctoredForUser } from "@/lib/communityApi";
import { MUSICLUV_SERVER_URL, getDeviceUserId, serverAuthHeaders } from "@/lib/api";
import { getInstrument, listInstruments } from "@catalogs/instrumentCatalog";
import type { ProctoredExamSession } from "@catalogs/communityTypes";

/**
 * Proctored certificate exams — full flow.
 *
 *   1. Past sessions list (scheduled / passed / failed)
 *   2. "Schedule new exam" dialog: pick instrument + tier + preferred
 *      time slot, then redirect to Stripe Checkout for the proctor fee
 *      (Standard $29 / Pro $49 / Genius $99).
 *   3. Webhook confirms payment → server creates a scheduled session +
 *      generates a Zoom meeting link (server-side via Zoom API; stubbed
 *      with a placeholder URL until Zoom keys are wired).
 *   4. On exam day, the session row shows a "Join proctor room" CTA
 *      once we're within 15 min of the start time.
 */

const TIER_FEES = { standard: 29, pro: 49, genius: 99 } as const;

export function ProctoredExamPanel() {
  const [open, setOpen] = useAtom(proctoredExamPanelAtom);
  const [authUser] = useAtom(authUserAtom);
  const [scheduling, setScheduling] = useState(false);
  const userId = authUser?.id ?? getDeviceUserId();

  const { status, data, error, refetch } = useAsync<ProctoredExamSession[]>(
    async () => {
      if (!MUSICLUV_SERVER_URL) throw new Error("Server not configured");
      return fetchProctoredForUser(userId);
    },
    [open, userId],
    { isEmpty: (list) => list.length === 0 },
  );

  const sessions = data ?? [];

  return (
    <SidePanel
      title="Proctored certificate exams"
      subtitle="Official tier testing with a human proctor"
      open={open}
      onClose={() => setOpen(false)}
      width="w-full md:w-[32rem]"
    >
      <div className="space-y-4">
        <section>
          <button
            onClick={() => setScheduling(true)}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 font-semibold text-sm"
          >
            + Schedule new exam
          </button>
          <div className="text-[11px] text-white/50 text-center mt-2">
            Standard $29 · Pro $49 · Genius $99 · 20–90 min with a verified proctor
          </div>
        </section>

        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Your exam history</div>
          <AsyncBoundary
            status={open ? status : "idle"}
            loading={<LoadingSpinner label="Loading sessions…" />}
            empty={
              <EmptyState
                glyph="🏆"
                title="No proctored exams yet"
                body="Schedule your first tier certificate exam when you're ready. Great for LinkedIn + job applications."
                cta={{ label: "+ Schedule new exam", onClick: () => setScheduling(true) }}
              />
            }
            error={<ErrorState message={error ?? "Unable to load sessions."} onRetry={refetch} />}
          >
            <div className="space-y-2">
              {sessions.map((s) => (
                <SessionRow key={s.id} session={s} />
              ))}
            </div>
          </AsyncBoundary>
        </section>
      </div>

      {scheduling && (
        <ScheduleDialog
          userId={userId}
          onClose={() => setScheduling(false)}
          onScheduled={() => { setScheduling(false); void refetch(); }}
        />
      )}
    </SidePanel>
  );
}

function SessionRow({ session }: { session: ProctoredExamSession }) {
  const inst = getInstrument(session.instrumentId);
  const statusColor: Record<typeof session.status, string> = {
    scheduled: "text-indigo-300",
    in_progress: "text-amber-300",
    passed: "text-emerald-300",
    failed: "text-rose-400",
    cancelled: "text-white/40",
  };
  const startMs = new Date(session.scheduledAt).getTime();
  const now = Date.now();
  const minutesUntilStart = Math.round((startMs - now) / 60000);
  const canJoin = session.status === "scheduled" && minutesUntilStart >= -30 && minutesUntilStart <= 15;

  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-lg">{inst?.glyph}</span>
          <div>
            <div className="text-sm font-medium">
              {inst?.name} · {session.tier}
            </div>
            <div className="text-[11px] text-white/60">
              {new Date(session.scheduledAt).toLocaleString()} · ${session.feeUsd}
            </div>
          </div>
        </div>
        <span className={`text-[10px] uppercase tracking-widest ${statusColor[session.status]}`}>
          {session.status.replace("_", " ")}
        </span>
      </div>
      {canJoin && (
        <a
          href={session.videoUrl ?? "#"}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-2 text-[11px] font-semibold px-3 py-1.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 hover:bg-emerald-500/30"
        >
          {minutesUntilStart > 0 ? `Join proctor room (starts in ${minutesUntilStart} min)` : "Join proctor room →"}
        </a>
      )}
      {session.proctorNotes && (
        <div className="mt-2 p-2 rounded-md bg-white/[0.02] border border-white/5 text-[11px] text-white/70">
          <strong className="text-white/90">Reviewer:</strong> {session.proctorNotes}
        </div>
      )}
    </div>
  );
}

function ScheduleDialog({
  userId,
  onClose,
  onScheduled,
}: {
  userId: string;
  onClose: () => void;
  onScheduled: () => void;
}) {
  const [tier, setTier] = useState<"standard" | "pro" | "genius">("standard");
  const [instrumentId, setInstrumentId] = useState("piano");
  const [slot, setSlot] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const instruments = listInstruments().filter((i) => i.difficultyFloor <= 3);

  // Generate 6 upcoming time slots over the next 7 days.
  const slots = useMemo(() => {
    const out: { iso: string; label: string }[] = [];
    const base = new Date();
    base.setMinutes(0, 0, 0);
    base.setHours(base.getHours() + 24);
    for (let i = 0; i < 6; i++) {
      const d = new Date(base);
      d.setDate(d.getDate() + i);
      d.setHours(10 + (i % 3) * 4);
      out.push({
        iso: d.toISOString(),
        label: d.toLocaleString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      });
    }
    return out;
  }, []);

  const schedule = async () => {
    if (!slot) { setErr("Pick a time slot"); return; }
    setSubmitting(true);
    setErr(null);
    try {
      const payload = {
        id: `ps_${Date.now()}`,
        userId,
        examId: `${instrumentId}_${tier}_certificate`,
        instrumentId,
        tier,
        scheduledAt: slot,
        status: "scheduled" as const,
        feeUsd: TIER_FEES[tier],
      };

      // 1. Kick off Stripe Checkout for the proctor fee. The server's
      //    billing webhook creates the proctor session on payment
      //    success. In dev/promo it's marked active immediately.
      const checkoutRes = await fetch(`${MUSICLUV_SERVER_URL}/api/v1/billing/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...serverAuthHeaders() },
        body: JSON.stringify({
          planId: "genius",
          cycle: "monthly",
          scope: { kind: "proctored_exam", payload },
        }),
      });
      const checkoutBody = await checkoutRes.json();
      if (!checkoutRes.ok || !checkoutBody.ok) {
        throw new Error(checkoutBody.error || `Checkout HTTP ${checkoutRes.status}`);
      }

      // 2. Persist the proctor session server-side (decoupled from
      //    payment; the webhook will flip status from "scheduled" to
      //    "confirmed" once payment clears in prod).
      const res = await fetch(`${MUSICLUV_SERVER_URL}/api/v1/proctored/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...serverAuthHeaders() },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) throw new Error(body.error || `HTTP ${res.status}`);

      if (checkoutBody.url && /^https?:\/\//.test(checkoutBody.url)) {
        window.location.href = checkoutBody.url;
      } else {
        onScheduled();
      }
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="panel max-w-md w-full p-0 overflow-hidden bg-ink-800" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h3 className="display text-lg font-semibold">Schedule an exam</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white/70 text-lg">×</button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40">Instrument</label>
            <select
              value={instrumentId}
              onChange={(e) => setInstrumentId(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
            >
              {instruments.map((i) => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40">Tier</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {(["standard", "pro", "genius"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={`p-2.5 rounded-lg border text-center transition-colors ${
                    tier === t
                      ? "bg-indigo-500/20 border-indigo-400/40"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                  }`}
                >
                  <div className="text-xs font-semibold uppercase">{t}</div>
                  <div className="font-mono text-sm mt-0.5">${TIER_FEES[t]}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40">Pick a slot</label>
            <div className="grid grid-cols-2 gap-1.5 mt-1">
              {slots.map((s) => (
                <button
                  key={s.iso}
                  onClick={() => setSlot(s.iso)}
                  className={`p-2 rounded-md text-[11px] text-center border transition-colors ${
                    slot === s.iso
                      ? "bg-indigo-500/20 border-indigo-400/40"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {err && <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-md p-2">{err}</div>}

          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm">Cancel</button>
            <button
              onClick={schedule}
              disabled={submitting || !slot}
              className="flex-1 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-sm font-semibold disabled:opacity-50"
            >
              {submitting ? "Processing…" : `Pay $${TIER_FEES[tier]} + schedule →`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
