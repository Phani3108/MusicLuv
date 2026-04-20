import { useState } from "react";
import type { Instrument } from "@catalogs/types";
import { playNote, playOnset, unlockAudio } from "@/audio/instrumentSampler";

/**
 * Minimal-but-functional hero for instruments that don't have a bespoke
 * virtual component yet (bass, ukulele, mandolin, bansuri, harmonium,
 * veena, cello, saxophone, trumpet, clarinet, accordion, synth, mridangam).
 *
 * Renders a keyboard-style strip (1-octave Sa-to-Sa / C-to-C) that
 * triggers the instrument's synthesis voice via instrumentSampler. Each
 * button tagged with data-piano-note so GhostHand overlay works.
 *
 * Percussion-family instruments (mridangam, dj_controller) show a
 * single-tap pad that fires playOnset for rhythm work.
 */

const KEYS_WESTERN = [
  { label: "C", note: "C4" },
  { label: "D", note: "D4" },
  { label: "E", note: "E4" },
  { label: "F", note: "F4" },
  { label: "G", note: "G4" },
  { label: "A", note: "A4" },
  { label: "B", note: "B4" },
  { label: "C'", note: "C5" },
];

const KEYS_INDIAN = [
  { label: "Sa", note: "C4" },
  { label: "Re", note: "D4" },
  { label: "Ga", note: "E4" },
  { label: "Ma", note: "F4" },
  { label: "Pa", note: "G4" },
  { label: "Dha", note: "A4" },
  { label: "Ni", note: "B4" },
  { label: "Sa'", note: "C5" },
];

export function GenericHero({ instrument, target }: { instrument: Instrument; target?: string | null }) {
  const [pressed, setPressed] = useState<string | null>(null);

  const isIndian = instrument.origin === "indian_classical";
  const isPercussion =
    instrument.family === "perc_pitched" || instrument.family === "perc_unpitched" || instrument.id === "dj_controller";
  const keys = isIndian ? KEYS_INDIAN : KEYS_WESTERN;

  const press = async (note: string) => {
    await unlockAudio();
    await playNote(instrument.id, note, 1.0);
    setPressed(note);
    setTimeout(() => setPressed((cur) => (cur === note ? null : cur)), 200);
  };

  const strike = async () => {
    await unlockAudio();
    await playOnset(instrument.id);
    setPressed("hit");
    setTimeout(() => setPressed(null), 180);
  };

  const familyAccent: Record<string, string> = {
    keyboard: "from-indigo-900/60 via-indigo-950 to-black border-indigo-700/30",
    fretted: "from-amber-900/60 via-amber-950 to-black border-amber-700/30",
    bowed: "from-rose-900/60 via-rose-950 to-black border-rose-700/30",
    woodwind: "from-teal-900/60 via-teal-950 to-black border-teal-700/30",
    brass: "from-yellow-800/60 via-amber-950 to-black border-yellow-700/30",
    perc_pitched: "from-slate-800 via-slate-900 to-black border-slate-700/30",
    perc_unpitched: "from-slate-800 via-slate-900 to-black border-slate-700/30",
    voice: "from-teal-800/60 via-teal-950 to-black border-teal-700/30",
    electronic: "from-violet-900/60 via-violet-950 to-black border-violet-700/30",
  };
  const accent = familyAccent[instrument.family] ?? "from-white/5 to-ink-900 border-white/10";

  return (
    <div className="relative select-none" data-piano-root>
      <div className={`rounded-[28px] bg-gradient-to-b ${accent} p-5 pb-6 border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]`}>
        <div className="flex justify-between items-center mb-3 px-1">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-mono flex items-center gap-2">
            <span className="text-lg">{instrument.glyph}</span>
            <span>{instrument.name}</span>
            <span className="text-emerald-300/70 normal-case tracking-normal">· playable</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">
            MusicLuv
          </div>
        </div>

        {isPercussion ? (
          <div className="py-8 flex flex-col items-center">
            <button
              onMouseDown={strike}
              onTouchStart={(e) => { e.preventDefault(); strike(); }}
              className={`w-32 h-32 rounded-full border-2 transition-all font-semibold font-mono
                ${pressed === "hit"
                  ? "bg-emerald-500/40 border-emerald-300 scale-95"
                  : "bg-white/5 border-white/30 hover:bg-white/10"}`}
            >
              <span className="text-4xl block mb-1">{instrument.glyph}</span>
              <span className="text-[10px] text-white/80 uppercase tracking-widest">Strike</span>
            </button>
            <div className="text-[10px] text-white/40 mt-4">Tap the pad to play a rhythmic hit</div>
          </div>
        ) : (
          <div className="flex gap-1 h-40">
            {keys.map((k) => {
              const isPressed = pressed === k.note;
              const isTarget = target === k.note;
              return (
                <button
                  key={k.note}
                  data-piano-note={k.note}
                  onMouseDown={() => press(k.note)}
                  onTouchStart={(e) => { e.preventDefault(); press(k.note); }}
                  className={`flex-1 rounded-xl border transition-all flex flex-col items-center justify-end pb-3 font-mono text-sm
                    ${isPressed
                      ? "bg-emerald-400/30 border-emerald-300 scale-[0.98]"
                      : isTarget
                        ? "bg-amber-300/20 border-amber-300/50"
                        : "bg-white/5 border-white/10 hover:bg-white/10"}
                  `}
                >
                  <span className="opacity-80">{k.label}</span>
                  <span className="text-[9px] text-white/30 mt-1">{k.note}</span>
                  {isTarget && <span className="chip bg-amber-500 text-black text-[9px] mt-1">next</span>}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-3 text-[10px] text-white/40 text-center">
          {isPercussion
            ? "Synthesized hit — full kit UI coming in phase 7 content sprint"
            : `Synthesized voice · full instrument hero coming in phase 7 content sprint`}
        </div>
      </div>
    </div>
  );
}
