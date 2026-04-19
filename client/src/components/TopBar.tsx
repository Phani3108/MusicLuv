import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { currentInstrumentAtom, progressAtom, screenAtom, userAtom, navDrawerOpenAtom } from "@/atoms/session";
import { mentorPanelAtom } from "@/atoms/panels";
import { getInstrument } from "@catalogs/instrumentCatalog";
import { tierForXp, nextTier } from "@catalogs/tierCatalog";
import { OfflineQueueChip } from "./OfflineQueueChip";

/**
 * Compact, production-quality top bar.
 * Mobile (default): back · instrument · streak · mentor · menu
 * Desktop (lg+): adds inline XP progress bar + larger stats display.
 *
 * All secondary navigation (lesson details, quests, progress ladder, library,
 * artists, upload) lives in the NavDrawer behind the menu button. Clean.
 */
export function TopBar() {
  const user = useAtomValue(userAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom);
  const progress = useAtomValue(progressAtom);
  const setScreen = useSetAtom(screenAtom);
  const [mentorOpen, setMentorOpen] = useAtom(mentorPanelAtom);
  const [drawerOpen, setDrawerOpen] = useAtom(navDrawerOpenAtom);

  const instrument = instrumentId ? getInstrument(instrumentId) : undefined;
  const instProgress = instrumentId ? progress[instrumentId] : undefined;
  const currentXp = instProgress?.xp ?? 0;
  const tier = tierForXp(currentXp);
  const nxt = nextTier(currentXp);
  const progressPct = nxt
    ? Math.min(100, ((currentXp - tier.xpThreshold) / (nxt.xpThreshold - tier.xpThreshold)) * 100)
    : 100;

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-ink-900/80 border-b border-white/5">
      <div className="px-3 md:px-5 h-14 md:h-16 flex items-center gap-2 md:gap-3">
        <button
          onClick={() => setScreen("picker")}
          className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 flex-shrink-0"
          title="Switch instrument"
        >←</button>

        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl">{instrument?.glyph}</span>
          <div className="min-w-0 hidden sm:block">
            <div className="text-sm font-semibold leading-tight truncate">{instrument?.name}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/40 truncate">
              L{tier.levelId} · {tier.label}
            </div>
          </div>
        </div>

        {nxt && (
          <div className="hidden lg:flex items-center gap-2 flex-1 max-w-sm ml-4">
            <div className="h-1.5 flex-1 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-white/50 whitespace-nowrap">
              {currentXp} / {nxt.xpThreshold} XP
            </span>
          </div>
        )}

        <div className="flex-1 lg:flex-none" />

        <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 flex-shrink-0">
          <span className="text-base">🔥</span>
          <span className="font-mono text-sm font-semibold">{user?.currentStreak ?? 0}</span>
        </div>

        <OfflineQueueChip />

        <button
          onClick={() => setMentorOpen(!mentorOpen)}
          title="Ask your mentor"
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-colors flex-shrink-0
            ${mentorOpen
              ? "bg-indigo-500/25 text-white border border-indigo-400/30"
              : "bg-white/5 hover:bg-white/10 text-white/80"}`}
        >💬</button>

        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          title="Menu"
          className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80 flex-shrink-0"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {nxt && (
        <div className="lg:hidden h-[3px] bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-indigo-400 to-violet-500 transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      )}
    </header>
  );
}
