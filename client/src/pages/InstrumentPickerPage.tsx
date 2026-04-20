import { useAtom, useSetAtom } from "jotai";
import { listInstruments } from "@catalogs/instrumentCatalog";
import { listLessonsForInstrument } from "@catalogs/lessonCatalog";
import { currentInstrumentAtom, currentLessonIdAtom, screenAtom, userAtom } from "@/atoms/session";
import type { Instrument } from "@catalogs/types";

const ACCENT_BG: Record<string, string> = {
  keyboard: "from-indigo-500/30 to-violet-500/20 border-indigo-400/30",
  fretted:  "from-amber-500/30 to-orange-500/20 border-amber-400/30",
  bowed:    "from-rose-500/30 to-pink-500/20 border-rose-400/30",
  perc:     "from-slate-500/30 to-zinc-500/20 border-slate-400/30",
  indian:   "from-amber-400/30 to-yellow-500/20 border-amber-300/40",
  voice:    "from-teal-400/30 to-cyan-500/20 border-teal-300/40",
};

export function InstrumentPickerPage() {
  const setScreen = useSetAtom(screenAtom);
  const setInstrument = useSetAtom(currentInstrumentAtom);
  const setLesson = useSetAtom(currentLessonIdAtom);
  const [user, setUser] = useAtom(userAtom);

  const choose = (inst: Instrument) => {
    setInstrument(inst.id);
    const first = listLessonsForInstrument(inst.id)[0];
    if (first) setLesson(first.id);
    // Mark onboarding complete so we don't bounce them back through Welcome.
    if (user && !user.onboardedAt) {
      setUser({ ...user, onboardedAt: new Date().toISOString() });
    }
    setScreen("studio");
  };

  const instruments = listInstruments();

  return (
    <div className="min-h-screen p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-10 md:mb-14">
        <button className="btn-ghost text-xs mb-6" onClick={() => setScreen("welcome")}>← Back</button>
        <h2 className="display text-4xl md:text-6xl font-semibold mb-3">
          What do you want to play?
        </h2>
        <p className="text-white/60 text-lg max-w-xl">
          Pick anything. You can switch later — your progress follows you across instruments.
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {instruments.map((inst) => (
          <button
            key={inst.id}
            onClick={() => choose(inst)}
            className={`panel bg-gradient-to-br ${ACCENT_BG[inst.accent] ?? "from-white/5 to-white/5"}
                       p-5 text-left group hover:scale-[1.02] transition-all duration-200`}
          >
            <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform">
              {inst.glyph}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="display text-xl font-semibold">{inst.name}</span>
              {inst.origin === "indian_classical" && (
                <span className="chip bg-amber-400/15 text-amber-200 border border-amber-400/20">
                  Hindustani
                </span>
              )}
            </div>
            <div className="text-xs text-white/55 leading-relaxed mb-3">{inst.blurb}</div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
              <span>{inst.family.replace("_", " ")}</span>
              <span>·</span>
              <span>start at L{inst.difficultyFloor}</span>
            </div>
          </button>
        ))}
      </div>

      <footer className="max-w-6xl mx-auto mt-14 text-center text-xs text-white/40">
        {instruments.length} instruments available. Pick anything — you can switch later.
      </footer>
    </div>
  );
}
