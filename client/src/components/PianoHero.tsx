import { useMemo } from "react";

/** The 5-finger C-position (C4–G4) is special — we glow the active/target keys. */
const WHITE_KEYS = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5"];
const BLACK_KEYS: Record<string, string> = {
  "C#4": "C4", "D#4": "D4", "F#4": "F4", "G#4": "G4", "A#4": "A4",
  "C#5": "C5", "D#5": "D5", "F#5": "F5", "G#5": "G5", "A#5": "A5",
};

export interface PianoHeroProps {
  highlight?: string | null;     // note being played right now (from live pitch)
  upcoming?: string[];           // next N notes in timeline
  target?: string | null;        // the *currently-expected* note (for ghost-hand)
  onKeyClick?: (note: string) => void;
}

export function PianoHero({ highlight, upcoming = [], target, onKeyClick }: PianoHeroProps) {
  const blackMap = useMemo(() => Object.entries(BLACK_KEYS), []);

  return (
    <div className="relative select-none">
      {/* Body/cabinet */}
      <div className="relative rounded-[28px] bg-gradient-to-b from-zinc-800 via-zinc-900 to-black p-4 pb-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] border border-white/5">
        <div className="flex justify-between items-center mb-3 px-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-amber-200/70 font-mono">
            Grand · C-Position
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">
            MusicLuv · Piano
          </div>
        </div>

        <div className="relative flex gap-[2px] h-44 md:h-56 bg-black rounded-2xl p-[3px]">
          {/* White keys */}
          {WHITE_KEYS.map((note) => {
            const isHighlight = highlight === note;
            const isUpcoming = upcoming.includes(note);
            const isTarget = target === note;
            return (
              <button
                key={note}
                onClick={() => onKeyClick?.(note)}
                className={`relative flex-1 rounded-b-xl transition-all duration-150 focus:outline-none
                  ${isHighlight
                    ? "bg-gradient-to-b from-indigo-100 to-indigo-300 shadow-[inset_0_-12px_20px_-8px_rgba(99,102,241,0.9)]"
                    : isTarget
                      ? "bg-gradient-to-b from-white to-amber-100 shadow-[inset_0_-10px_18px_-6px_rgba(251,191,36,0.7)]"
                      : isUpcoming
                        ? "bg-gradient-to-b from-white to-indigo-50"
                        : "bg-gradient-to-b from-white via-white to-zinc-200"}
                  hover:brightness-[1.05] active:translate-y-[1px]
                `}
              >
                {/* Label the C-position fingering (C–G) */}
                <span className="absolute bottom-2 inset-x-0 text-center text-[9px] md:text-[10px] font-mono text-zinc-500">
                  {note}
                </span>
                {isTarget && (
                  <span className="absolute inset-0 flex items-start justify-center pt-1">
                    <span className="chip bg-amber-500 text-black shadow-lg animate-pulse-soft text-[10px]">next</span>
                  </span>
                )}
                {isHighlight && (
                  <span className="absolute inset-0 flex items-start justify-center pt-1">
                    <span className="chip bg-indigo-600 text-white shadow-lg text-[10px]">you</span>
                  </span>
                )}
              </button>
            );
          })}

          {/* Black keys — positioned absolute over whites */}
          <div className="absolute inset-0 pointer-events-none">
            {blackMap.map(([black, leftWhite]) => {
              const idx = WHITE_KEYS.indexOf(leftWhite);
              if (idx === -1) return null;
              const whiteWidthPct = 100 / WHITE_KEYS.length;
              const leftPct = whiteWidthPct * (idx + 1) - whiteWidthPct * 0.3;
              const isHighlight = highlight === black;
              const isTarget = target === black;
              return (
                <button
                  key={black}
                  onClick={() => onKeyClick?.(black)}
                  className={`absolute pointer-events-auto h-[62%] rounded-b-md transition-all duration-150 focus:outline-none
                    ${isHighlight
                      ? "bg-gradient-to-b from-indigo-600 to-indigo-900 shadow-[inset_0_-8px_12px_rgba(99,102,241,0.6)]"
                      : isTarget
                        ? "bg-gradient-to-b from-amber-600 to-amber-900 shadow-[inset_0_-8px_12px_rgba(251,191,36,0.5)]"
                        : "bg-gradient-to-b from-zinc-800 via-zinc-900 to-black"}
                  `}
                  style={{ left: `${leftPct}%`, width: `${whiteWidthPct * 0.6}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
