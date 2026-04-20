import { useAtom } from "jotai";
import { useState } from "react";
import { liveLessonsPanelAtom } from "@/atoms/community";
import { authUserAtom } from "@/atoms/billing";
import { SidePanel } from "./SidePanel";
import { AsyncBoundary, LoadingSpinner, EmptyState, ErrorState } from "./common/AsyncBoundary";
import { useAsync } from "@/hooks/useAsync";
import { fetchAvailableLiveSlots } from "@/lib/communityApi";
import { MUSICLUV_SERVER_URL, getDeviceUserId, serverAuthHeaders } from "@/lib/api";
import type { LiveSlot } from "@catalogs/communityTypes";

/**
 * Live 1-on-1 lessons marketplace. Lists available slots from verified
 * teachers, lets learners book + pay. Platform takes a 15% fee; the
 * teacher keeps 85%.
 *
 * Flow:
 *   1. Fetch /api/v1/live/available → slot list
 *   2. Tap "Book" → POST /api/v1/billing/checkout for the slot price
 *   3. On payment success (webhook or promo-active) → POST
 *      /api/v1/live/:slotId/book to lock it + generate meeting URL
 *   4. "Join lesson" CTA appears 15 min before start
 */
export function LiveLessonsPanel() {
  const [open, setOpen] = useAtom(liveLessonsPanelAtom);
  const [authUser] = useAtom(authUserAtom);
  const [booking, setBooking] = useState<LiveSlot | null>(null);
  const userId = authUser?.id ?? getDeviceUserId();

  const { status, data, error, refetch } = useAsync<LiveSlot[]>(
    async () => {
      if (!MUSICLUV_SERVER_URL) throw new Error("Server not configured");
      return fetchAvailableLiveSlots();
    },
    [open],
    { isEmpty: (list) => list.length === 0 },
  );

  const slots = data ?? [];

  return (
    <SidePanel
      title="Live 1-on-1 lessons"
      subtitle="Book a private session with a verified teacher"
      open={open}
      onClose={() => setOpen(false)}
      width="w-full md:w-[32rem]"
    >
      <div className="space-y-4">
        <div className="rounded-xl p-4 bg-white/[0.02] border border-white/5">
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">How it works</div>
          <ol className="text-xs text-white/75 space-y-1 list-decimal list-inside">
            <li>Browse available slots from verified teachers</li>
            <li>Book + pay (platform fee: 15%; teacher earns 85%)</li>
            <li>Join via Zoom meeting link 15 min before start</li>
            <li>Rate the teacher post-lesson to help the community</li>
          </ol>
        </div>

        <AsyncBoundary
          status={open ? status : "idle"}
          loading={<LoadingSpinner label="Loading available slots…" />}
          empty={
            <EmptyState
              glyph="🎤"
              title="No slots available right now"
              body="Teachers post their availability weekly. Check back soon, or follow a teacher's profile to get notified."
            />
          }
          error={<ErrorState message={error ?? "Unable to load slots."} onRetry={refetch} />}
        >
          <div className="space-y-2">
            {slots.map((s) => (
              <SlotRow key={s.id} slot={s} onBook={() => setBooking(s)} />
            ))}
          </div>
        </AsyncBoundary>
      </div>

      {booking && (
        <BookingDialog
          slot={booking}
          userId={userId}
          onClose={() => setBooking(null)}
          onBooked={() => { setBooking(null); void refetch(); }}
        />
      )}
    </SidePanel>
  );
}

function SlotRow({ slot, onBook }: { slot: LiveSlot; onBook: () => void }) {
  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-medium">Teacher {slot.teacherId}</div>
        <div className="text-sm font-mono">${slot.priceUsd}</div>
      </div>
      <div className="text-[11px] text-white/60 mb-2">
        {new Date(slot.startAt).toLocaleString()} · {slot.durationMin} min
      </div>
      <button
        onClick={onBook}
        className="w-full py-1.5 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 text-xs font-semibold"
      >
        Book this slot →
      </button>
    </div>
  );
}

function BookingDialog({
  slot,
  userId,
  onClose,
  onBooked,
}: {
  slot: LiveSlot;
  userId: string;
  onClose: () => void;
  onBooked: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const confirm = async () => {
    setSubmitting(true);
    setErr(null);
    try {
      // 1. Kick off checkout for the slot price.
      const checkoutRes = await fetch(`${MUSICLUV_SERVER_URL}/api/v1/billing/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...serverAuthHeaders() },
        body: JSON.stringify({
          planId: "pro",
          cycle: "monthly",
          scope: { kind: "live_lesson", slotId: slot.id, priceUsd: slot.priceUsd },
        }),
      });
      const checkoutBody = await checkoutRes.json();
      if (!checkoutRes.ok || !checkoutBody.ok) {
        throw new Error(checkoutBody.error || `Checkout HTTP ${checkoutRes.status}`);
      }

      // 2. Lock the slot + mint a meeting URL (server-side via Zoom API
      //    in prod; stubbed here until ZOOM_JWT env is wired).
      const meetingUrl = `https://zoom.us/j/pending-${slot.id}`;
      const res = await fetch(`${MUSICLUV_SERVER_URL}/api/v1/live/${slot.id}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...serverAuthHeaders() },
        body: JSON.stringify({ studentId: userId, meetingUrl }),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) throw new Error(body.error || `HTTP ${res.status}`);

      if (checkoutBody.url && /^https?:\/\//.test(checkoutBody.url)) {
        window.location.href = checkoutBody.url;
      } else {
        onBooked();
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
          <h3 className="display text-lg font-semibold">Confirm booking</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white/70 text-lg">×</button>
        </div>
        <div className="p-5 space-y-4">
          <div className="rounded-lg bg-white/[0.02] border border-white/5 p-3">
            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Slot</div>
            <div className="text-sm font-medium">Teacher {slot.teacherId}</div>
            <div className="text-[11px] text-white/60">
              {new Date(slot.startAt).toLocaleString()} · {slot.durationMin} min
            </div>
          </div>

          <div className="flex items-baseline justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="text-sm">Total today</div>
            <div className="font-mono text-xl font-semibold">${slot.priceUsd}</div>
          </div>

          <div className="text-[11px] text-white/60">
            You'll receive the Zoom meeting link immediately after payment. Cancel up to 24 hours
            before for a full refund; within 24 hours, 50% is refundable.
          </div>

          {err && <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-md p-2">{err}</div>}

          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm">Cancel</button>
            <button
              onClick={confirm}
              disabled={submitting}
              className="flex-1 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-sm font-semibold disabled:opacity-50"
            >
              {submitting ? "Processing…" : `Pay $${slot.priceUsd} + book`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
