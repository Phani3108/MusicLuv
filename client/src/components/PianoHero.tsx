import { useEffect, useMemo, useRef, useState } from "react";
import { ensurePianoReady, playPianoNote, setSustain, isSustain, unlockAudio } from "@/audio/pianoSampler";

/** The 5-finger C-position (C4–G4) is special — we glow the active/target keys. */
const WHITE_KEYS = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5"];
const BLACK_KEYS: Record<string, string> = {
  "C#4": "C4", "D#4": "D4", "F#4": "F4", "G#4": "G4", "A#4": "A4",
  "C#5": "C5", "D#5": "D5", "F#5": "F5", "G#5": "G5", "A#5": "A5",
};

/** QWERTY row maps to white keys C4–G5 (a,s,d,f,g,h,j,k,l,;,',\). Row above for sharps. */
const KEYBOARD_MAP: Record<string, string> = {
  a: "C4", s: "D4", d: "E4", f: "F4", g: "G4", h: "A4", j: "B4",
  k: "C5", l: "D5", ";": "E5", "'": "F5",
  w: "C#4", e: "D#4", t: "F#4", y: "G#4", u: "A#4",
  o: "C#5", p: "D#5", "]": "F#5",
};

export interface PianoHeroProps {
  highlight?: string | null;
  upcoming?: string[];
  target?: string | null;
  onKeyClick?: (note: string) => void;
  /** Show the "tap to play" helper + keyboard hints. Defaults to true when no exercise is active. */
  showNoodleHints?: boolean;
}

export function PianoHero({ highlight, upcoming = [], target, onKeyClick, showNoodleHints = true }: PianoHeroProps) {
  const blackMap = useMemo(() => Object.entries(BLACK_KEYS), []);
  const [samplerReady, setSamplerReady] = useState(false);
  const [samplerLoading, setSamplerLoading] = useState(true);
  const [pressedNotes, setPressedNotes] = useState<Set<string>>(new Set());
  const [sustain, setSustainState] = useState(false);
  const pressedRef = useRef<Set<string>>(new Set());

  // Warm up the sampler on mount so the first click is instant.
  useEffect(() => {
    let mounted = true;
    ensurePianoReady()
      .then(() => { if (mounted) { setSamplerReady(true); setSamplerLoading(false); } })
      .catch(() => { if (mounted) setSamplerLoading(false); });
    return () => { mounted = false; };
  }, []);

  const handleKeyPress = async (note: string) => {
    await unlockAudio();
    await playPianoNote(note);
    onKeyClick?.(note);
    // Visual press indicator — clear after 180ms
    pressedRef.current.add(note);
    setPressedNotes(new Set(pressedRef.current));
    setTimeout(() => {
      pressedRef.current.delete(note);
      setPressedNotes(new Set(pressedRef.current));
    }, 180);
  };

  // Keyboard support: A-L row for white keys, W-U row for black keys, space for sustain.
  useEffect(() => {
    const active = new Set<string>();
    const onDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        setSustain(true);
        setSustainState(true);
        return;
      }
      const note = KEYBOARD_MAP[e.key.toLowerCase()];
      if (!note) return;
      if (active.has(note)) return;
      active.add(note);
      handleKeyPress(note);
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.key === " " || e.code === "Space") {
        setSustain(false);
        setSustainState(false);
        return;
      }
      const note = KEYBOARD_MAP[e.key.toLowerCase()];
      if (note) active.delete(note);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSustain = () => {
    const next = !isSustain();
    setSustain(next);
    setSustainState(next);
  };

  return (
    <div className="relative select-none">
      <div className="relative rounded-[28px] bg-gradient-to-b from-zinc-800 via-zinc-900 to-black p-4 pb-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] border border-white/5">
        <div className="flex justify-between items-center mb-3 px-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-amber-200/70 font-mono flex items-center gap-2">
            Grand · C-Position
            {samplerLoading && (
              <span className="inline-flex items-center gap-1 text-white/40 normal-case tracking-normal">
                <span className="w-1 h-1 rounded-full bg-amber-300 animate-pulse" />
                loading samples…
              </span>
            )}
            {samplerReady && (
              <span className="inline-flex items-center gap-1 text-emerald-300/80 normal-case tracking-normal">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                playable
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSustain}
              className={`text-[9px] font-mono px-2 py-1 rounded-md border transition-colors
                ${sustain
                  ? "bg-amber-400/25 border-amber-400/50 text-amber-100"
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}
              title="Toggle sustain (Space)"
            >
              SUSTAIN {sustain ? "●" : "○"}
            </button>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">
              MusicLuv · Piano
            </div>
          </div>
        </div>

        <div className="relative flex gap-[2px] h-44 md:h-56 bg-black rounded-2xl p-[3px]">
          {/* White keys */}
          {WHITE_KEYS.map((note) => {
            const isPressed = pressedNotes.has(note);
            const isHighlight = highlight === note;
            const isUpcoming = upcoming.includes(note);
            const isTarget = target === note;
            return (
              <button
                key={note}
                onMouseDown={() => handleKeyPress(note)}
                onTouchStart={(e) => { e.preventDefault(); handleKeyPress(note); }}
                className={`relative flex-1 rounded-b-xl transition-all duration-100 focus:outline-none
                  ${isPressed
                    ? "bg-gradient-to-b from-emerald-100 to-emerald-300 shadow-[inset_0_-14px_22px_-10px_rgba(52,211,153,0.9)] translate-y-[2px]"
                    : isHighlight
                      ? "bg-gradient-to-b from-indigo-100 to-indigo-300 shadow-[inset_0_-12px_20px_-8px_rgba(99,102,241,0.9)]"
                      : isTarget
                        ? "bg-gradient-to-b from-white to-amber-100 shadow-[inset_0_-10px_18px_-6px_rgba(251,191,36,0.7)]"
                        : isUpcoming
                          ? "bg-gradient-to-b from-white to-indigo-50"
                          : "bg-gradient-to-b from-white via-white to-zinc-200"}
                  hover:brightness-[1.05] active:translate-y-[1px]
                `}
              >
                <span className="absolute bottom-2 inset-x-0 text-center text-[9px] md:text-[10px] font-mono text-zinc-500">
                  {note}
                </span>
                {isTarget && (
                  <span className="absolute inset-0 flex items-start justify-center pt-1">
                    <span className="chip bg-amber-500 text-black shadow-lg animate-pulse-soft text-[10px]">next</span>
                  </span>
                )}
                {isHighlight && !isTarget && (
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
              const isPressed = pressedNotes.has(black);
              const isHighlight = highlight === black;
              const isTarget = target === black;
              return (
                <button
                  key={black}
                  onMouseDown={() => handleKeyPress(black)}
                  onTouchStart={(e) => { e.preventDefault(); handleKeyPress(black); }}
                  className={`absolute pointer-events-auto h-[62%] rounded-b-md transition-all duration-100 focus:outline-none
                    ${isPressed
                      ? "bg-gradient-to-b from-emerald-500 to-emerald-800 shadow-[inset_0_-8px_12px_rgba(52,211,153,0.6)] translate-y-[2px]"
                      : isHighlight
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

        {showNoodleHints && (
          <div className="mt-3 flex items-center justify-between text-[10px] text-white/40 px-2">
            <span>🎵 Tap any key to play · keyboard: <span className="font-mono">A S D F G H J K L</span></span>
            <span>Hold <span className="font-mono text-white/60">Space</span> for sustain</span>
          </div>
        )}
      </div>
    </div>
  );
}
