import { useAtom, useAtomValue } from "jotai";
import { questsPanelAtom } from "@/atoms/panels";
import { currentInstrumentAtom } from "@/atoms/session";
import { listDailyQuests, listMasteryQuests } from "@catalogs/questCatalog";
import { SidePanel } from "./SidePanel";
import type { Quest } from "@catalogs/types";

export function QuestsPanel() {
  const [open, setOpen] = useAtom(questsPanelAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom);

  const daily = listDailyQuests();
  const mastery = listMasteryQuests(instrumentId ?? undefined);

  return (
    <SidePanel open={open} onClose={() => setOpen(false)} title="Quests" subtitle="Daily goals and mastery challenges" side="right">
      <section className="mb-6">
        <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Today</div>
        <div className="space-y-2">{daily.map((q) => <QuestCard key={q.id} quest={q} />)}</div>
      </section>

      <section>
        <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Mastery</div>
        <div className="space-y-2">{mastery.map((q) => <QuestCard key={q.id} quest={q} />)}</div>
      </section>
    </SidePanel>
  );
}

function QuestCard({ quest }: { quest: Quest }) {
  const pct = quest.goal.count ? Math.min(100, ((quest.progress ?? 0) / quest.goal.count) * 100) : 0;
  return (
    <div className="panel p-3">
      <div className="flex items-start gap-3 mb-2">
        <div className="text-2xl">{
          quest.scope === "daily" ? "🔔"
          : quest.scope === "streak" ? "🔥"
          : quest.scope === "mastery" ? "🏆"
          : "✨"
        }</div>
        <div className="flex-1">
          <div className="font-semibold text-sm">{quest.title}</div>
          <div className="text-xs text-white/55 leading-snug">{quest.blurb}</div>
        </div>
        <div className="chip bg-amber-400/15 text-amber-200 border border-amber-400/20 text-[10px]">
          +{quest.reward.xp} XP
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-500"
             style={{ width: `${pct}%` }} />
      </div>
      <div className="text-[10px] font-mono text-white/40 mt-1 text-right">
        {quest.progress ?? 0} / {quest.goal.count}
      </div>
    </div>
  );
}
