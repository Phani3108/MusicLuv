import { useState } from "react";
import { playNote, unlockAudio } from "@/audio/instrumentSampler";

/**
 * Playable stylized sitar hero. Each fret is a button that triggers the
 * sitar voice via instrumentSampler (routes to the plucked-string synth
 * in synthVoices.ts). Tagged with data-piano-note so GhostHand overlays
 * work on sitar too.
 *
 * Svara ↔ pitch mapping uses C4 tonic (Sa) by default. Shuddha svaras
 * only; komal/tivra variants are handled by lessons via pitch names
 * directly (the dispatcher doesn't care about svara names).
 */

const SVARAS: Array<{ label: string; note: string }> = [
  { label: "Sa", note: "C4" },
  { label: "Re", note: "D4" },
  { label: "Ga", note: "E4" },
  { label: "Ma", note: "F4" },
  { label: "Pa", note: "G4" },
  { label: "Dha", note: "A4" },
  { label: "Ni", note: "B4" },
  { label: "Sa'", note: "C5" },
  { label: "Re'", note: "D5" },
];

export function SitarHero({ highlight, target }: { highlight?: string | null; target?: string | null }) {
  const [pressed, setPressed] = useState<string | null>(null);

  const press = async (note: string) => {
    await unlockAudio();
    await playNote("sitar", note, 1.4);
    setPressed(note);
    setTimeout(() => setPressed((cur) => (cur === note ? null : cur)), 220);
  };

  return (
    <div className="relative select-none" data-piano-root>
      <div className="rounded-[28px] bg-gradient-to-b from-amber-950 via-amber-900 to-black p-6 border border-amber-700/30 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-amber-200/70 font-mono">
            Hindustani · Tap a svara to play
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">
            MusicLuv · Sitar
          </div>
        </div>

        {/* Fretboard */}
        <div className="relative h-44 rounded-2xl bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border border-amber-600/30 overflow-hidden">
          {/* 3 main string guides */}
          {[0.3, 0.5, 0.7].map((y) => (
            <div
              key={y}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-amber-200/40 via-amber-100/70 to-amber-200/40 pointer-events-none"
              style={{ top: `${y * 100}%` }}
            />
          ))}

          {/* Frets as buttons */}
          {SVARAS.map((s, i) => {
            const isPressed = pressed === s.note;
            const isHighlight = highlight === s.note;
            const isTarget = target === s.note;
            return (
              <button
                key={s.note}
                data-piano-note={s.note}
                onMouseDown={() => press(s.note)}
                onTouchStart={(e) => { e.preventDefault(); press(s.note); }}
                className={`absolute top-0 bottom-0 flex flex-col items-center justify-between py-2 border-r border-amber-400/20 transition-colors focus:outline-none
                  ${isPressed ? "bg-emerald-400/30"
                    : isHighlight ? "bg-indigo-400/25"
                    : isTarget ? "bg-amber-300/25"
                    : "hover:bg-amber-400/10"}
                `}
                style={{ left: `${(i / SVARAS.length) * 100}%`, width: `${100 / SVARAS.length}%` }}
              >
                <span className="text-[11px] font-mono text-amber-100">{s.label}</span>
                {isTarget && (
                  <span className="chip bg-amber-500 text-black shadow-lg text-[9px] mb-1">next</span>
                )}
                {isPressed && (
                  <span className="chip bg-emerald-500 text-black shadow-lg text-[9px] mb-1">ring</span>
                )}
                <span className="w-[2px] h-12 bg-amber-600/40" />
              </button>
            );
          })}

          {/* Sympathetic string shimmer */}
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-black/40 flex items-end gap-1 px-2 pb-1 pointer-events-none">
            {Array.from({ length: 13 }).map((_, i) => (
              <div key={i} className="flex-1 h-[1px] bg-amber-200/30" />
            ))}
          </div>
        </div>

        {/* Tumba (gourd) */}
        <div className="mt-4 flex items-center justify-center">
          <div className="w-36 h-10 rounded-b-full bg-gradient-to-b from-amber-800 to-black shadow-inner border-b border-amber-500/20" />
        </div>
      </div>
    </div>
  );
}
