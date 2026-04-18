import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { currentInstrumentAtom, progressAtom, screenAtom, userAtom } from "@/atoms/session";
import {
  lessonPanelAtom, mentorPanelAtom, progressPanelAtom,
  questsPanelAtom, libraryPanelAtom, artistPanelAtom, songUploadAtom,
} from "@/atoms/panels";
import { getInstrument } from "@catalogs/instrumentCatalog";
import { tierForXp } from "@catalogs/tierCatalog";

export function TopBar() {
  const user = useAtomValue(userAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom);
  const progress = useAtomValue(progressAtom);
  const setScreen = useSetAtom(screenAtom);

  const [lessonOpen, setLessonOpen] = useAtom(lessonPanelAtom);
  const [mentorOpen, setMentorOpen] = useAtom(mentorPanelAtom);
  const [progressOpen, setProgressOpen] = useAtom(progressPanelAtom);
  const [questsOpen, setQuestsOpen] = useAtom(questsPanelAtom);
  const [libraryOpen, setLibraryOpen] = useAtom(libraryPanelAtom);
  const [artistOpen, setArtistOpen] = useAtom(artistPanelAtom);
  const [songOpen, setSongOpen] = useAtom(songUploadAtom);

  const instrument = instrumentId ? getInstrument(instrumentId) : undefined;
  const instProgress = instrumentId ? progress[instrumentId] : undefined;
  const tier = tierForXp(instProgress?.xp ?? 0);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-ink-900/70 border-b border-white/5">
      <div className="px-4 md:px-6 h-14 md:h-16 flex items-center gap-2 md:gap-3">
        <button className="btn-ghost text-xs" onClick={() => setScreen("picker")}>
          ← Switch
        </button>

        <div className="flex items-center gap-2 mr-2">
          <span className="text-2xl">{instrument?.glyph}</span>
          <div className="hidden md:block">
            <div className="text-sm font-semibold leading-tight">{instrument?.name}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">
              L{tier.levelId} · {tier.label}
            </div>
          </div>
        </div>

        <div className="flex-1" />

        {/* Quick-toggle panel buttons */}
        <PanelToggle label="Lesson"   active={lessonOpen}   onClick={() => setLessonOpen((v) => !v)} glyph="📖" />
        <PanelToggle label="Mentor"   active={mentorOpen}   onClick={() => setMentorOpen((v) => !v)} glyph="💬" />
        <PanelToggle label="Quests"   active={questsOpen}   onClick={() => setQuestsOpen((v) => !v)} glyph="⚔️" />
        <PanelToggle label="Progress" active={progressOpen} onClick={() => setProgressOpen((v) => !v)} glyph="📈" />
        <PanelToggle label="Library"  active={libraryOpen}  onClick={() => setLibraryOpen((v) => !v)} glyph="🎵" />
        <PanelToggle label="Artists"  active={artistOpen}   onClick={() => setArtistOpen((v) => !v)} glyph="⭐" />
        <PanelToggle label="Upload"   active={songOpen}     onClick={() => setSongOpen((v) => !v)} glyph="⬆️" />

        <div className="w-px h-6 bg-white/10 mx-1 hidden md:block" />

        <StatPill icon="🔥" value={user?.currentStreak ?? 0} label="streak" />
        <StatPill icon="❤️" value={user?.heartsToday ?? 5} label="hearts" />
        <StatPill icon="⚡" value={user?.totalXp ?? 0} label="XP" />
      </div>
    </header>
  );
}

function PanelToggle({ label, active, onClick, glyph }: { label: string; active: boolean; onClick: () => void; glyph: string }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all
        ${active ? "bg-white/15 shadow-glow" : "bg-white/5 hover:bg-white/10"}
      `}
    >
      {glyph}
    </button>
  );
}

function StatPill({ icon, value, label }: { icon: string; value: number; label: string }) {
  return (
    <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
      <span className="text-sm">{icon}</span>
      <span className="font-mono text-sm font-semibold">{value}</span>
      <span className="text-[10px] uppercase tracking-widest text-white/40">{label}</span>
    </div>
  );
}
