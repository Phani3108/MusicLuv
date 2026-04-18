import { useAtom, useAtomValue } from "jotai";
import { progressPanelAtom } from "@/atoms/panels";
import { currentInstrumentAtom, progressAtom, userAtom } from "@/atoms/session";
import { getInstrument } from "@catalogs/instrumentCatalog";
import { nextTier, tierForXp, TIERS } from "@catalogs/tierCatalog";
import { SidePanel } from "./SidePanel";

export function ProgressPanel() {
  const [open, setOpen] = useAtom(progressPanelAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom);
  const progress = useAtomValue(progressAtom);
  const user = useAtomValue(userAtom);

  if (!instrumentId) return null;
  const instrument = getInstrument(instrumentId);
  const instProg = progress[instrumentId] ?? { xp: 0, level: 1, lessonsCompleted: [] };
  const tier = tierForXp(instProg.xp);
  const nxt = nextTier(instProg.xp);
  const pct = nxt ? Math.min(100, ((instProg.xp - tier.xpThreshold) / (nxt.xpThreshold - tier.xpThreshold)) * 100) : 100;

  return (
    <SidePanel open={open} onClose={() => setOpen(false)} title="Your progress" subtitle="Across instruments and within this one" side="right">
      {/* Overall */}
      <section className="mb-6">
        <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Overall musicianship</div>
        <div className="panel p-4 flex items-center gap-4">
          <div className="text-4xl">⚡</div>
          <div className="flex-1">
            <div className="text-2xl font-mono font-semibold">{user?.totalXp ?? 0} <span className="text-sm text-white/40 font-sans">XP</span></div>
            <div className="text-xs text-white/50">Streak: {user?.currentStreak ?? 0} days · {user?.heartsToday ?? 0}/{user?.heartsMax ?? 5} hearts</div>
          </div>
        </div>
      </section>

      {/* Per-instrument */}
      <section className="mb-6">
        <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">
          {instrument.name} · level progression
        </div>
        <div className="panel p-4">
          <div className="flex items-baseline gap-2 mb-3">
            <div className="font-mono text-3xl font-semibold" style={{ color: tier.color }}>L{tier.levelId}</div>
            <div className="text-sm text-white/70">{tier.label}</div>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-white/50">
            <span>{instProg.xp} XP</span>
            <span>{nxt ? `${nxt.xpThreshold} XP → L${nxt.levelId}` : "max tier reached"}</span>
          </div>
        </div>
      </section>

      {/* Level ladder */}
      <section>
        <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">The ladder</div>
        <div className="space-y-1.5">
          {TIERS.map((t) => {
            const reached = instProg.xp >= t.xpThreshold;
            return (
              <div
                key={t.levelId}
                className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all
                  ${t.levelId === tier.levelId ? "bg-white/5 border-white/20" : "bg-white/[0.02] border-white/5"}
                  ${!reached ? "opacity-50" : ""}
                `}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold"
                     style={{ background: `${t.color}25`, color: t.color }}>
                  {t.levelId}
                </div>
                <div className="flex-1">
                  <div className="text-sm">{t.label}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">{t.tier}</div>
                </div>
                <div className="font-mono text-xs text-white/40">{t.xpThreshold} XP</div>
              </div>
            );
          })}
        </div>
      </section>
    </SidePanel>
  );
}
