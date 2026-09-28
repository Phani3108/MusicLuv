import { useEffect, useMemo, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import { ensurePianoReady, playPianoNote, setSustain, isSustain, unlockAudio } from "@/audio/pianoSampler";
import { prefsAtom } from "@/atoms/prefs";
import { midiToNote, normalizeNote } from "@/lib/notes";

/** Mapping for sargamMode toggle — Western chromatic → svara label. */
const SVARA: Record<string, string> = {
  "C": "Sa", "C#": "re", "D": "Re", "D#": "ga", "E": "Ga",
  "F": "Ma", "F#": "Ma#", "G": "Pa", "G#": "dha", "A": "Dha",
  "A#": "ni", "B": "Ni",
};
function svaraLabel(note: string): string {
  const m = /^([A-G]#?)(\d)$/.exec(note);
  if (!m) return note;
  const [, pitch, octave] = m;
  const sv = SVARA[pitch];
  if (!sv) return note;
  const isUpper = Number(octave) >= 5;
  return isUpper ? `${sv}'` : sv;
}

const BLACK_PITCH_CLASSES = new Set([1, 3, 6, 8, 10]);
/** Default span when no lesson notes are given: C4–G5. */
const DEFAULT_RANGE = { low: 60, high: 79 };

/** QWERTY → semitone offset from the range's lowest C: A-row = white keys, row above = sharps. */
const KEYBOARD_OFFSETS: Record<string, number> = {
  a: 0, s: 2, d: 4, f: 5, g: 7, h: 9, j: 11, k: 12, l: 14, ";": 16, "'": 17,
  w: 1, e: 3, t: 6, y: 8, u: 10, o: 13, p: 15, "]": 18,
};

export interface PianoHeroProps {
  highlight?: string | null;
  upcoming?: string[];
  target?: string | null;
  /** Called the moment a key is pressed (before samples finish loading). */
  onKeyClick?: (note: string) => void;
  /** MIDI span to draw (see keyboardRangeFor). Defaults to C4–G5. */
  range?: { low: number; high: number };
  /** Show the "tap to play" helper + keyboard hints. Defaults to true when no exercise is active. */
  showNoodleHints?: boolean;
}

export function PianoHero({
  highlight, upcoming = [], target, onKeyClick, range = DEFAULT_RANGE, showNoodleHints = true,
}: PianoHeroProps) {
  const prefs = useAtomValue(prefsAtom);
  const { whiteKeys, blackKeys } = useMemo(() => {
    const whites: string[] = [];
    const blacks: Array<[string, string]> = [];   // [black, white key to its left]
    for (let m = range.low; m <= range.high; m++) {
      if (!BLACK_PITCH_CLASSES.has(((m % 12) + 12) % 12)) whites.push(midiToNote(m));
      else if (m > range.low) blacks.push([midiToNote(m), midiToNote(m - 1)]);
    }
    return { whiteKeys: whites, blackKeys: blacks };
  }, [range.low, range.high]);
  const highlightN = normalizeNote(highlight ?? null);
  const targetN = normalizeNote(target ?? null);
  const upcomingN = useMemo(() => upcoming.map((n) => normalizeNote(n)), [upcoming]);
  const onKeyClickRef = useRef(onKeyClick);
  onKeyClickRef.current = onKeyClick;
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
    // Report the press first: a slow sample CDN must not swallow the hit.
    onKeyClickRef.current?.(note);
    await unlockAudio();
    await playPianoNote(note);
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
      const offset = KEYBOARD_OFFSETS[e.key.toLowerCase()];
      if (offset == null) return;
      const note = midiToNote(12 * Math.floor(range.low / 12) + offset);
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
      const offset = KEYBOARD_OFFSETS[e.key.toLowerCase()];
      if (offset != null) active.delete(midiToNote(12 * Math.floor(range.low / 12) + offset));
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range.low]);

  const toggleSustain = () => {
    const next = !isSustain();
    setSustain(next);
    setSustainState(next);
  };

  return (
    <div className="relative select-none" data-piano-root>
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

        <div className="overflow-x-auto scrollbar-none rounded-2xl">
        <div
          className="relative flex gap-[2px] h-44 md:h-56 bg-black rounded-2xl p-[3px]"
          style={{ minWidth: `${whiteKeys.length * 30}px` }}
        >
          {/* White keys */}
          {whiteKeys.map((note) => {
            const isPressed = pressedNotes.has(note);
            const isHighlight = highlightN === note;
            const isUpcoming = upcomingN.includes(note);
            const isTarget = targetN === note;
            return (
              <button
                key={note}
                data-piano-note={note}
                onPointerDown={(e) => { e.preventDefault(); handleKeyPress(note); }}
                className={`relative flex-1 touch-none rounded-b-xl transition-all duration-100 focus:outline-none
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
                  {prefs.sargamMode ? svaraLabel(note) : note}
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
            {blackKeys.map(([black, leftWhite]) => {
              const idx = whiteKeys.indexOf(leftWhite);
              if (idx === -1) return null;
              const whiteWidthPct = 100 / whiteKeys.length;
              const leftPct = whiteWidthPct * (idx + 1) - whiteWidthPct * 0.3;
              const isPressed = pressedNotes.has(black);
              const isHighlight = highlightN === black;
              const isTarget = targetN === black;
              return (
                <button
                  key={black}
                  data-piano-note={black}
                  onPointerDown={(e) => { e.preventDefault(); handleKeyPress(black); }}
                  className={`absolute pointer-events-auto touch-none h-[62%] rounded-b-md transition-all duration-100 focus:outline-none
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
