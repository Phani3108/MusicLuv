import { useSetAtom } from "jotai";
import { screenAtom, userAtom } from "@/atoms/session";

export function WelcomePage() {
  const setScreen = useSetAtom(screenAtom);
  const setUser = useSetAtom(userAtom);

  const start = () => {
    setUser({
      username: "you",
      displayName: "You",
      joinedAt: new Date().toISOString(),
      totalXp: 0,
      currentStreak: 0,
      heartsToday: 5,
      heartsMax: 5,
      practiceMinutesToday: 0,
    });
    setScreen("picker");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* ambient floating notes */}
      <div className="absolute inset-0 pointer-events-none">
        {["🎹", "🎻", "🥁", "🎸", "🪕", "🪈", "🎤", "🎷"].map((g, i) => (
          <div
            key={i}
            className="absolute text-6xl opacity-[0.05] animate-float"
            style={{
              left: `${(i * 12 + 6) % 100}%`,
              top: `${((i * 17) % 80) + 8}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            {g}
          </div>
        ))}
      </div>

      <div className="relative max-w-2xl text-center">
        <div className="chip bg-white/5 border border-white/10 text-white/70 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
          v0.1 · UI prototype
        </div>
        <h1 className="display text-6xl md:text-8xl font-semibold leading-[1.02] mb-6">
          From novice<br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-violet-300 to-amber-200">
            to genius.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
          Learn 20+ instruments, step by step. Watch. Play. Get graded.
          From Middle C to raga Yaman — nine levels, one beautiful arc.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button className="btn-primary text-base px-8 py-4" onClick={start}>
            Pick an instrument →
          </button>
          <button className="btn-ghost text-sm" onClick={start}>
            Skip intro
          </button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 text-left max-w-xl mx-auto">
          <Feature title="Standard" levels="L1–3" desc="Posture, notes, first songs" color="from-slate-300 to-indigo-300" />
          <Feature title="Pro"      levels="L4–6" desc="Scales, ragas, repertoire"  color="from-amber-300 to-orange-400" />
          <Feature title="Genius"   levels="L7–9" desc="Improvise, compose, master" color="from-fuchsia-300 to-violet-400" />
        </div>
      </div>
    </div>
  );
}

function Feature({ title, levels, desc, color }: { title: string; levels: string; desc: string; color: string }) {
  return (
    <div className="panel p-4">
      <div className={`text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${color} bg-clip-text text-transparent mb-1`}>
        {title} · {levels}
      </div>
      <div className="text-sm text-white/70">{desc}</div>
    </div>
  );
}
