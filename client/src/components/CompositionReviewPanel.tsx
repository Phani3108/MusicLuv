import { useAtom } from "jotai";
import { useState } from "react";
import { compositionReviewPanelAtom } from "@/atoms/community";
import { authUserAtom } from "@/atoms/billing";
import { SidePanel } from "./SidePanel";
import { AsyncBoundary, LoadingSpinner, EmptyState, ErrorState } from "./common/AsyncBoundary";
import { useAsync } from "@/hooks/useAsync";
import { MUSICLUV_SERVER_URL, serverAuthHeaders, getDeviceUserId } from "@/lib/api";
import { listInstruments } from "@catalogs/instrumentCatalog";

interface Composition {
  id: string;
  userId: string;
  title: string;
  description?: string;
  instrumentId?: string;
  status: "submitted" | "in_review" | "approved" | "needs_revision" | "rejected";
  createdAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
  rubric?: {
    melody: number; harmony: number; rhythm: number; originality: number; craft: number;
  };
}

/**
 * Composition review panel. Genius-tier learners upload original
 * compositions (audio + notes) for human review by a working composer.
 *
 * Submission flow:
 *   1. Pick audio + add title/description/instrument
 *   2. POST /api/v1/compositions → added to reviewer queue
 *   3. Reviewer gives rubric (melody/harmony/rhythm/originality/craft)
 *      + notes; status flips to approved / needs_revision / rejected
 *   4. Learner sees the review inline
 */
export function CompositionReviewPanel() {
  const [open, setOpen] = useAtom(compositionReviewPanelAtom);
  const [authUser] = useAtom(authUserAtom);
  const [submitting, setSubmitting] = useState(false);
  const userId = authUser?.id ?? getDeviceUserId();

  const { status, data, error, refetch } = useAsync<Composition[]>(
    async () => {
      if (!MUSICLUV_SERVER_URL) throw new Error("Server not configured");
      const res = await fetch(`${MUSICLUV_SERVER_URL}/api/v1/compositions/${userId}`, {
        headers: serverAuthHeaders(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json();
      return body.compositions as Composition[];
    },
    [open, userId],
    { isEmpty: (list) => list.length === 0 },
  );

  const items = data ?? [];

  return (
    <SidePanel
      title="Composition review"
      subtitle="Submit an original for human review"
      open={open}
      onClose={() => setOpen(false)}
      width="w-full md:w-[30rem]"
    >
      <div className="space-y-4">
        {!submitting && (
          <button
            onClick={() => setSubmitting(true)}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-ink-900 font-semibold text-sm"
          >
            + Submit a new composition
          </button>
        )}
        {submitting && (
          <SubmitForm
            userId={userId}
            onClose={() => setSubmitting(false)}
            onSubmitted={() => { setSubmitting(false); void refetch(); }}
          />
        )}

        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Your submissions</div>
          <AsyncBoundary
            status={open ? status : "idle"}
            loading={<LoadingSpinner label="Loading compositions…" />}
            empty={
              <EmptyState
                glyph="🎼"
                title="No compositions yet"
                body="Submit your first original piece and get structured feedback from a working composer."
              />
            }
            error={<ErrorState message={error ?? "Unable to load"} onRetry={refetch} />}
          >
            <div className="space-y-2">
              {items.map((c) => (
                <CompositionRow key={c.id} c={c} />
              ))}
            </div>
          </AsyncBoundary>
        </section>
      </div>
    </SidePanel>
  );
}

function CompositionRow({ c }: { c: Composition }) {
  const statusColor: Record<Composition["status"], string> = {
    submitted: "text-white/50",
    in_review: "text-amber-300",
    approved: "text-emerald-300",
    needs_revision: "text-indigo-300",
    rejected: "text-rose-400",
  };
  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-medium">{c.title}</div>
        <span className={`text-[10px] uppercase tracking-widest ${statusColor[c.status]}`}>
          {c.status.replace("_", " ")}
        </span>
      </div>
      {c.description && <p className="text-[11px] text-white/60 mb-2">{c.description}</p>}
      {c.rubric && (
        <div className="grid grid-cols-5 gap-1 text-[10px] font-mono text-white/60 mt-2">
          <Metric label="melody" v={c.rubric.melody} />
          <Metric label="harmony" v={c.rubric.harmony} />
          <Metric label="rhythm" v={c.rubric.rhythm} />
          <Metric label="orig" v={c.rubric.originality} />
          <Metric label="craft" v={c.rubric.craft} />
        </div>
      )}
      {c.reviewerNotes && (
        <div className="mt-2 p-2 rounded-md bg-white/[0.02] border border-white/5 text-[11px] text-white/70">
          <strong className="text-white/90">Reviewer:</strong> {c.reviewerNotes}
        </div>
      )}
    </div>
  );
}
function Metric({ label, v }: { label: string; v: number }) {
  return (
    <div className="text-center p-1 rounded-md bg-white/[0.02]">
      <div className="text-white/90">{v}/5</div>
      <div className="text-[9px] text-white/40">{label}</div>
    </div>
  );
}

function SubmitForm({
  userId,
  onClose,
  onSubmitted,
}: {
  userId: string;
  onClose: () => void;
  onSubmitted: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instrumentId, setInstrumentId] = useState("piano");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async () => {
    if (!title.trim()) { setErr("Title is required"); return; }
    if (!file) { setErr("Audio file is required"); return; }
    setBusy(true); setErr(null);
    try {
      // NOTE: real upload requires S3/R2. For now, we record metadata
      // only; production adds signed-URL generation + multipart upload.
      const payload = {
        id: `comp_${Date.now()}`,
        userId,
        title: title.trim(),
        description: description.trim() || undefined,
        instrumentId,
        status: "submitted" as const,
        createdAt: new Date().toISOString(),
      };
      const res = await fetch(`${MUSICLUV_SERVER_URL}/api/v1/compositions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...serverAuthHeaders() },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) throw new Error(body.error || `HTTP ${res.status}`);
      onSubmitted();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel p-4 space-y-3">
      <div className="text-[10px] uppercase tracking-widest text-amber-300">Submit composition</div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Brief description (optional)"
        rows={2}
        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm resize-none"
      />
      <select
        value={instrumentId}
        onChange={(e) => setInstrumentId(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
      >
        {listInstruments().map((i) => (
          <option key={i.id} value={i.id}>{i.name}</option>
        ))}
      </select>
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="w-full text-xs text-white/70"
      />
      {err && <div className="text-xs text-rose-400">{err}</div>}
      <div className="flex gap-2">
        <button onClick={onClose} className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm">Cancel</button>
        <button
          onClick={submit}
          disabled={busy}
          className="flex-1 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-ink-900 text-sm font-semibold disabled:opacity-50"
        >
          {busy ? "Submitting…" : "Submit for review"}
        </button>
      </div>
    </div>
  );
}
