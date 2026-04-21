import { useAtom } from "jotai";
import { useState } from "react";
import { creatorPortalPanelAtom, creatorLessonsAtom } from "@/atoms/community";
import { authUserAtom } from "@/atoms/billing";
import { SidePanel } from "./SidePanel";
import { AsyncBoundary, LoadingSpinner, EmptyState, ErrorState } from "./common/AsyncBoundary";
import { useAsync } from "@/hooks/useAsync";
import { MUSICLUV_SERVER_URL, getDeviceUserId, serverAuthHeaders } from "@/lib/api";
import { listInstruments } from "@catalogs/instrumentCatalog";
import type { CreatorLesson } from "@catalogs/communityTypes";
import { useToast } from "@/lib/toast";

/**
 * Creator portal — list your lessons, draft new ones, track submission
 * + approval status, see earnings. Stripe Connect onboarding CTA sits
 * in the earnings section and triggers a server redirect to the Connect
 * oauth flow (scaffolded; real Connect keys plug in via env).
 *
 * End-to-end flow:
 *   1. Draft a lesson (editor dialog) -> POST /api/v1/creator/lessons
 *      with status:"draft"
 *   2. Submit for review -> PATCH sets status to "submitted"
 *   3. Educator approves -> status flips to "approved" then "published"
 *   4. Sales accumulate on the server; revenue panel polls /creator/:id/lessons
 *   5. Stripe Connect onboarding redirects user to Stripe's hosted UI
 */
export function CreatorPortalPanel() {
  const [open, setOpen] = useAtom(creatorPortalPanelAtom);
  const [authUser] = useAtom(authUserAtom);
  const [cache, setCache] = useAtom(creatorLessonsAtom);
  const [editing, setEditing] = useState<CreatorLesson | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const creatorId = authUser?.id ?? getDeviceUserId();
  const toast = useToast();

  const { status, data, error, refetch } = useAsync<CreatorLesson[]>(
    async () => {
      if (!MUSICLUV_SERVER_URL) throw new Error("Server not configured");
      const res = await fetch(`${MUSICLUV_SERVER_URL}/api/v1/creator/${creatorId}/lessons`, {
        headers: serverAuthHeaders(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json();
      if (!body.ok) throw new Error(body.error || "failed");
      setCache(body.lessons);
      return body.lessons as CreatorLesson[];
    },
    [open, creatorId],
    { isEmpty: (list) => list.length === 0 },
  );

  const items = data ?? cache;
  const totalRevenue = items.reduce((s, l) => s + l.totalRevenueUsd, 0);
  const published = items.filter((l) => l.status === "published").length;
  const pending = items.filter((l) => l.status === "submitted").length;

  const openEditor = (lesson?: CreatorLesson) => {
    setEditing(lesson ?? null);
    setShowEditor(true);
  };

  const handleSaved = () => {
    setShowEditor(false);
    setEditing(null);
    void refetch();
  };

  const onStripeConnect = async () => {
    if (!MUSICLUV_SERVER_URL) {
      toast.warning("Server not configured", "Set VITE_SERVER_URL to use Stripe Connect onboarding.");
      return;
    }
    try {
      const res = await fetch(`${MUSICLUV_SERVER_URL}/api/v1/creator/stripe-connect`, {
        method: "POST",
        headers: serverAuthHeaders(),
        body: JSON.stringify({}),
      });
      const body = await res.json();
      if (body.ok && body.url && /^https?:\/\//.test(body.url)) {
        window.location.href = body.url;
      } else if (body.ok && body.stub) {
        toast.info(
          "Stripe Connect pending",
          "The server is running in stub mode. Add STRIPE_SECRET_KEY to enable real payouts.",
        );
      } else {
        toast.error("Couldn't start onboarding", body.error || "Please try again.");
      }
    } catch (e) {
      toast.error("Couldn't reach Stripe", (e as Error).message);
    }
  };

  return (
    <SidePanel
      title="Creator portal"
      subtitle="Author lessons, earn 70% revenue share"
      open={open}
      onClose={() => setOpen(false)}
      width="w-full md:w-[34rem]"
    >
      <div className="space-y-4">
        <div className="rounded-xl p-5 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-400/20">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-amber-300 mb-1">All-time revenue</div>
              <div className="font-mono text-3xl font-semibold">${totalRevenue.toFixed(2)}</div>
            </div>
            <button
              onClick={onStripeConnect}
              className="text-[11px] font-semibold px-3 py-1.5 rounded-md bg-amber-500/20 border border-amber-400/40 hover:bg-amber-500/30"
            >
              Connect Stripe →
            </button>
          </div>
          <div className="text-[11px] text-white/60">
            70% creator share · monthly payouts · Stripe Connect account required before payout
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <StatCard label="Published" value={published} />
          <StatCard label="In review" value={pending} />
        </div>

        <section>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Your lessons</div>
            <button
              onClick={() => openEditor()}
              className="text-[11px] font-semibold px-3 py-1 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-ink-900"
            >
              + New draft
            </button>
          </div>

          <AsyncBoundary
            status={open ? status : "idle"}
            loading={<LoadingSpinner label="Loading your lessons…" />}
            empty={
              <EmptyState
                glyph="✍️"
                title="No lessons yet"
                body="Draft your first lesson to share your teaching with the MusicLuv community."
                cta={{ label: "+ New draft", onClick: () => openEditor() }}
              />
            }
            error={<ErrorState message={error ?? "Unable to load lessons"} onRetry={refetch} />}
          >
            <div className="space-y-2">
              {items.map((l) => (
                <LessonRow key={l.id} lesson={l} onEdit={() => openEditor(l)} />
              ))}
            </div>
          </AsyncBoundary>
        </section>
      </div>

      {showEditor && (
        <LessonEditorDialog
          initial={editing}
          creatorId={creatorId}
          onClose={() => { setShowEditor(false); setEditing(null); }}
          onSaved={handleSaved}
        />
      )}
    </SidePanel>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
      <div className="font-mono text-lg font-semibold">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/40">{label}</div>
    </div>
  );
}

function LessonRow({ lesson, onEdit }: { lesson: CreatorLesson; onEdit: () => void }) {
  const statusColor: Record<typeof lesson.status, string> = {
    draft: "text-white/50",
    submitted: "text-amber-300",
    approved: "text-emerald-300",
    published: "text-emerald-300",
    rejected: "text-rose-400",
  };
  return (
    <button
      onClick={onEdit}
      className="w-full p-3 rounded-lg bg-white/[0.02] border border-white/5 text-left hover:bg-white/5"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-medium">{lesson.title}</div>
        <span className={`text-[10px] uppercase tracking-widest ${statusColor[lesson.status]}`}>
          {lesson.status}
        </span>
      </div>
      <div className="text-[11px] text-white/60 flex justify-between">
        <span>
          {lesson.instrumentId} · L{lesson.level} · {lesson.sales} sales
        </span>
        <span className="font-mono">${lesson.totalRevenueUsd.toFixed(2)}</span>
      </div>
    </button>
  );
}

function LessonEditorDialog({
  initial,
  creatorId,
  onClose,
  onSaved,
}: {
  initial: CreatorLesson | null;
  creatorId: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [instrumentId, setInstrumentId] = useState(initial?.instrumentId ?? "piano");
  const [level, setLevel] = useState<CreatorLesson["level"]>(initial?.level ?? 1);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const instruments = listInstruments();

  const save = async (status: "draft" | "submitted") => {
    if (!title.trim()) {
      setErr("Title is required");
      return;
    }
    setSubmitting(true);
    setErr(null);
    try {
      const payload: CreatorLesson = {
        id: initial?.id ?? `cl_${Date.now()}`,
        creatorId,
        instrumentId,
        title: title.trim(),
        level,
        status,
        revenueShare: 0.7,
        sales: initial?.sales ?? 0,
        totalRevenueUsd: initial?.totalRevenueUsd ?? 0,
        createdAt: initial?.createdAt ?? new Date().toISOString(),
      };
      const res = await fetch(`${MUSICLUV_SERVER_URL}/api/v1/creator/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...serverAuthHeaders() },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) throw new Error(body.error || `HTTP ${res.status}`);
      onSaved();
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
      <div
        className="panel max-w-lg w-full p-0 overflow-hidden bg-ink-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-amber-300">
              {initial ? "Edit lesson" : "New lesson draft"}
            </div>
            <h3 className="display text-lg font-semibold mt-0.5">Authoring details</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white/70 text-lg">
            ×
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Demystifying meend — 5 exercises"
              className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-indigo-400"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40">Instrument</label>
            <select
              value={instrumentId}
              onChange={(e) => setInstrumentId(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-indigo-400"
            >
              {instruments.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40">Level</label>
            <div className="grid grid-cols-9 gap-1 mt-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  onClick={() => setLevel(n as CreatorLesson["level"])}
                  className={`py-1.5 rounded-md text-xs font-mono border transition-colors ${
                    level === n
                      ? "bg-indigo-500/20 border-indigo-400/40 text-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  L{n}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg p-3 bg-white/[0.02] border border-white/5">
            <div className="text-[11px] text-white/60 leading-relaxed">
              <strong className="text-white/90">Authoring body (written content, exercises, audio
              refs)</strong> opens in a full-page editor post-launch when monetization activates.
              For now you can reserve a lesson title + slot; our educator reaches out with the
              structured brief so your first draft is tight when the tool ships.
            </div>
          </div>

          {err && (
            <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-md p-2">
              {err}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => save("draft")}
              disabled={submitting}
              className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm disabled:opacity-50"
            >
              Save draft
            </button>
            <button
              onClick={() => save("submitted")}
              disabled={submitting}
              className="flex-1 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-ink-900 text-sm font-semibold disabled:opacity-50"
            >
              Submit for review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
