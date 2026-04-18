import { useEffect, useState } from "react";
import { ensureViolinReady, playViolinNote, unlockAudio } from "@/audio/violinSampler";

/** Standard violin tuning low → high. */
const STRINGS = ["G3", "D4", "A4", "E5"];
const STRING_LABELS = ["G", "D", "A", "E"];

/**
 * For L1–L3 we use discrete "first positions" (open, 1st, 2nd, 3rd, 4th fingers).
 * The intonation sensitivity (real violin is fretless!) is represented in the
 * real grading pipeline's tighter pitch tolerance; for the virtual keyboard
 * we snap to these diatonic positions so noodling is musical.
 */
const SEMIS = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"] as const;
function up(note: string, semitones: number): string {
  const m = /^([A-G]#?)(\d)$/.exec(note);
  if (!m) return note;
  const [, n, o] = m;
  const midi = SEMIS.indexOf(n as (typeof SEMIS)[number]) + (Number(o) + 1) * 12 + semitones;
  const tN = SEMIS[midi % 12];
  const tO = Math.floor(midi / 12) - 1;
  return `${tN}${tO}`;
}

const FINGER_OFFSETS = [0, 2, 4, 5, 7]; // open, 1st (whole tone), 2nd, 3rd (½), 4th

export function VirtualViolin({ showHints = true }: { showHints?: boolean }) {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bowPressure, setBowPressure] = useState(0.7);
  const [contactPoint, setContactPoint] = useState(0);
  const [pressed, setPressed] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    ensureViolinReady()
      .then(() => { if (mounted) { setReady(true); setLoading(false); } })
      .catch(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const handlePositionClick = async (stringIdx: number, fingerIdx: number) => {
    const note = up(STRINGS[stringIdx], FINGER_OFFSETS[fingerIdx]);
    await unlockAudio();
    await playViolinNote(note, 1.4, bowPressure, contactPoint);
    const key = `${stringIdx}:${fingerIdx}`;
    setPressed(key);
    setTimeout(() => setPressed((cur) => (cur === key ? null : cur)), 200);
  };

  return (
    <div className="relative select-none">
      <div className="rounded-[28px] bg-gradient-to-b from-rose-950 via-rose-900 to-black p-4 pb-5 border border-rose-800/40 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="flex justify-between items-center mb-3 px-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-rose-200/80 font-mono flex items-center gap-2">
            Violin · First position
            {loading && <span className="inline-flex items-center gap-1 text-white/40 normal-case tracking-normal"><span className="w-1 h-1 rounded-full bg-rose-300 animate-pulse" />loading samples…</span>}
            {ready && <span className="inline-flex items-center gap-1 text-emerald-300/80 normal-case tracking-normal"><span className="w-1 h-1 rounded-full bg-emerald-400" />playable</span>}
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">
            MusicLuv · Violin
          </div>
        </div>

        {/* Fingerboard: 4 strings × (open + 4 fingers) */}
        <div className="rounded-2xl bg-gradient-to-b from-black via-rose-950 to-black border border-rose-800/30 p-2">
          <div className="grid grid-cols-6 gap-[2px]">
            {/* Header row */}
            <div />
            {["open", "1", "2", "3", "4"].map((label) => (
              <div key={label} className="text-[9px] text-rose-200/50 font-mono text-center py-1">
                {label}
              </div>
            ))}
            {/* String rows */}
            {STRINGS.map((openNote, stringIdx) => (
              <div key={stringIdx} className="contents">
                <div className="text-[11px] font-mono text-rose-200/80 flex items-center justify-end pr-2 py-2">
                  <span className="inline-flex items-center gap-1">
                    <span className="font-semibold text-rose-100">{STRING_LABELS[stringIdx]}</span>
                    <span className="text-white/30 text-[9px]">{openNote}</span>
                  </span>
                </div>
                {FINGER_OFFSETS.map((offset, fingerIdx) => {
                  const key = `${stringIdx}:${fingerIdx}`;
                  const isPressed = pressed === key;
                  const note = up(openNote, offset);
                  return (
                    <button
                      key={fingerIdx}
                      onMouseDown={() => handlePositionClick(stringIdx, fingerIdx)}
                      onTouchStart={(e) => { e.preventDefault(); handlePositionClick(stringIdx, fingerIdx); }}
                      className={`relative h-11 rounded border border-rose-700/30 transition-all
                        ${isPressed
                          ? "bg-emerald-400/30 border-emerald-400/50"
                          : fingerIdx === 0
                            ? "bg-rose-800/40 hover:bg-rose-700/50"
                            : "bg-rose-900/40 hover:bg-rose-700/40"}
                      `}
                    >
                      <span className="absolute left-0 right-0 top-1/2 h-[1.5px] bg-rose-200/40 pointer-events-none" />
                      <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono text-rose-100/70">
                        {note}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bow controls */}
        <div className="mt-4 flex gap-4 items-center">
          <div className="flex-1">
            <div className="flex justify-between text-[10px] font-mono text-rose-200/70 mb-1">
              <span>Bow pressure</span>
              <span>{Math.round(bowPressure * 100)}%</span>
            </div>
            <input
              type="range" min={0} max={1} step={0.05}
              value={bowPressure}
              onChange={(e) => setBowPressure(Number(e.target.value))}
              className="w-full accent-rose-400"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-[10px] font-mono text-rose-200/70 mb-1">
              <span>Contact · sul tasto ↔ ponticello</span>
              <span>{contactPoint > 0 ? "+" : ""}{contactPoint.toFixed(1)}</span>
            </div>
            <input
              type="range" min={-1} max={1} step={0.1}
              value={contactPoint}
              onChange={(e) => setContactPoint(Number(e.target.value))}
              className="w-full accent-rose-400"
            />
          </div>
        </div>

        {showHints && (
          <div className="mt-3 text-[10px] text-white/40 px-2 flex items-center justify-between">
            <span>🎵 Tap a position to bow that note</span>
            <span>Remember: real violin is fretless — intonation matters</span>
          </div>
        )}
      </div>
    </div>
  );
}
