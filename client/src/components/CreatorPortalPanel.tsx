import { useAtom } from "jotai";
import { creatorPortalPanelAtom, creatorLessonsAtom } from "@/atoms/community";
import { SidePanel } from "./SidePanel";
import { getInstrument } from "@catalogs/instrumentCatalog";
import type { CreatorLesson } from "@catalogs/communityTypes";

/**
 * Creator portal — author lessons, see approval status + sales revenue.
 * Genius-tier gated. Stripe Connect payout (70/30 creator/platform split)
 * wires in with the Stripe SDK once monetization is live.
 */
export function CreatorPortalPanel() {
  const [open, setOpen] = useAtom(creatorPortalPanelAtom);
  const [lessons] = useAtom(creatorLessonsAtom);
  const items = lessons.length > 0 ? lessons : MOCK_LESSONS;

  const totalRevenue = items.reduce((s, l) => s + l.totalRevenueUsd, 0);
  const published = items.filter((l) => l.status === "published").length;
  const pending = items.filter((l) => l.status === "submitted").length;

  return (
    <SidePanel title="Creator portal" subtitle="Your published lessons + earnings" open={open} onClose={() => setOpen(false)} width="w-full md:w-[32rem]">
      <div className="space-y-4">
        <div className="rounded-xl p-5 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-400/20">
          <div className="text-[10px] uppercase tracking-widest text-amber-300 mb-1">All-time revenue</div>
          <div className="font-mono text-2xl font-semibold">${totalRevenue.toFixed(2)}</div>
          <div className="text-[11px] text-white/60 mt-1">70% creator share · next payout April 30</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <StatCard label="Published" value={published} />
          <StatCard label="In review" value={pending} />
        </div>

        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Your lessons</div>
          <div className="space-y-2">
            {items.map((l) => <LessonRow key={l.id} lesson={l} />)}
          </div>
        </section>

        <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 font-semibold text-sm text-ink-900">
          + Draft a new lesson
        </button>
      </div>
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

function LessonRow({ lesson }: { lesson: CreatorLesson }) {
  const inst = getInstrument(lesson.instrumentId);
  const statusColor: Record<typeof lesson.status, string> = {
    draft: "text-white/40",
    submitted: "text-amber-300",
    approved: "text-emerald-300",
    published: "text-emerald-300",
    rejected: "text-rose-400",
  };
  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span>{inst?.glyph}</span>
          <div className="text-sm font-medium">{lesson.title}</div>
        </div>
        <span className={`text-[10px] uppercase tracking-widest ${statusColor[lesson.status]}`}>{lesson.status}</span>
      </div>
      <div className="text-[11px] text-white/60 flex justify-between">
        <span>L{lesson.level} · {lesson.sales} sales</span>
        <span className="font-mono">${lesson.totalRevenueUsd.toFixed(2)}</span>
      </div>
    </div>
  );
}

const MOCK_LESSONS: CreatorLesson[] = [
  { id: "cl1", creatorId: "me", instrumentId: "sitar", title: "Demystifying Meend — 5 exercises", level: 4, status: "published", revenueShare: 0.7, sales: 142, totalRevenueUsd: 710, createdAt: new Date().toISOString() },
  { id: "cl2", creatorId: "me", instrumentId: "vocals", title: "Head voice without straining", level: 3, status: "published", revenueShare: 0.7, sales: 88, totalRevenueUsd: 440, createdAt: new Date().toISOString() },
  { id: "cl3", creatorId: "me", instrumentId: "sitar", title: "Taans that actually land on sam", level: 6, status: "submitted", revenueShare: 0.7, sales: 0, totalRevenueUsd: 0, createdAt: new Date().toISOString() },
];
