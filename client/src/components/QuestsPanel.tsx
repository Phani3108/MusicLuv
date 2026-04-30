import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { questsPanelAtom } from "@/atoms/panels";
import { currentInstrumentAtom } from "@/atoms/session";
import { listDailyQuests, listMasteryQuests } from "@catalogs/questCatalog";
import { SidePanel } from "./SidePanel";
import type { Quest } from "@catalogs/types";
import { MUSICLUV_SERVER_URL, getDeviceUserId, serverAuthHeaders } from "@/lib/api";

/** Quest with per-user progress merged in. Server returns this shape
 *  from /api/v1/quests/:userId; on offline / server-down we fall back
 *  to the static catalog. */
type QuestWithProgress = Quest & {
  progress: number;
  goalCount: number;
  completed: boolean;
  completedAt?: string;
  rewardClaimed: boolean;
};

export function QuestsPanel() {
  const [open, setOpen] = useAtom(questsPanelAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom);
  const [quests, setQuests] = useState<QuestWithProgress[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's per-quest progress when the panel opens. Falls back
  // to catalog defaults (zero progress, never completed) on failure
  // so the panel always renders.
  useEffect(() => {
    if (!open) return;
    const userId = getDeviceUserId();
    if (!userId) {
      setQuests(catalogDefaults(instrumentId ?? undefined));
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${MUSICLUV_SERVER_URL}/api/v1/quests/${encodeURIComponent(userId)}`, {
          headers: serverAuthHeaders(),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setQuests((data.quests as QuestWithProgress[]) ?? []);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError("Couldn't load your progress — showing the catalog defaults.");
          setQuests(catalogDefaults(instrumentId ?? undefined));
        }
      }
    })();
    return () => { cancelled = true; };
  }, [open, instrumentId]);

  const all = quests ?? catalogDefaults(instrumentId ?? undefined);
  const daily = all.filter((q) => q.scope === "daily" || q.scope === "streak");
  const mastery = all.filter((q) => q.scope === "mastery" && (!instrumentId || q.instrumentId === instrumentId));

  return (
    <SidePanel open={open} onClose={() => setOpen(false)} title="Quests" subtitle="Daily goals and mastery challenges" side="right">
      {error && (
        <div className="text-[11px] text-amber-300/70 mb-3 panel p-2.5 bg-amber-500/5 border-amber-500/20">
          {error}
        </div>
      )}

      <section className="mb-6">
        <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Today</div>
        <div className="space-y-2">{daily.map((q) => <QuestCard key={q.id} quest={q} />)}</div>
        {daily.length === 0 && (
          <div className="text-xs text-white/40 italic">No daily quests right now.</div>
        )}
      </section>

      <section>
        <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Mastery</div>
        <div className="space-y-2">{mastery.map((q) => <QuestCard key={q.id} quest={q} />)}</div>
        {mastery.length === 0 && (
          <div className="text-xs text-white/40 italic">
            {instrumentId ? "No mastery quests for this instrument yet." : "Pick an instrument to see mastery quests."}
          </div>
        )}
      </section>
    </SidePanel>
  );
}

function catalogDefaults(instrumentId?: string): QuestWithProgress[] {
  const items: Quest[] = [...listDailyQuests(), ...listMasteryQuests(instrumentId)];
  return items.map((q) => ({
    ...q,
    progress: q.progress ?? 0,
    goalCount: q.goal.count,
    completed: false,
    rewardClaimed: false,
  }));
}

function QuestCard({ quest }: { quest: QuestWithProgress }) {
  const pct = quest.goalCount ? Math.min(100, (quest.progress / quest.goalCount) * 100) : 0;
  const glyph =
    quest.scope === "daily" ? "🔔"
    : quest.scope === "streak" ? "🔥"
    : quest.scope === "mastery" ? "🏆"
    : "✨";
  return (
    <div className={`panel p-3 ${quest.completed ? "ring-1 ring-emerald-400/30 bg-emerald-500/5" : ""}`}>
      <div className="flex items-start gap-3 mb-2">
        <div className="text-2xl">{quest.completed ? "✅" : glyph}</div>
        <div className="flex-1">
          <div className="font-semibold text-sm flex items-center gap-2">
            {quest.title}
            {quest.completed && (
              <span className="chip bg-emerald-400/15 text-emerald-200 border border-emerald-400/20 text-[9px]">
                COMPLETE
              </span>
            )}
          </div>
          <div className="text-xs text-white/55 leading-snug">{quest.blurb}</div>
        </div>
        <div className="chip bg-amber-400/15 text-amber-200 border border-amber-400/20 text-[10px]">
          +{quest.reward.xp} XP
          {quest.reward.badgeId ? " · 🎖" : ""}
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            quest.completed
              ? "bg-gradient-to-r from-emerald-400 to-teal-400"
              : "bg-gradient-to-r from-amber-400 to-orange-400"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-[10px] font-mono text-white/40 mt-1 text-right">
        {quest.progress} / {quest.goalCount}
        {quest.completedAt && (
          <span className="ml-2 text-emerald-300/70">
            · earned {new Date(quest.completedAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}
