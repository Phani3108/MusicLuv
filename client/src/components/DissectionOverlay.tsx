import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { dissectionAtom } from "@/atoms/panels";
import { currentInstrumentAtom } from "@/atoms/session";
import { getInstrument } from "@catalogs/instrumentCatalog";
import { playNote, unlockAudio } from "@/audio/instrumentSampler";

/**
 * Dissection overlay — tap a labeled control on the instrument hero and
 * get a focused educator's breakdown of it. Plays a representative audio
 * sample through the real instrument sampler so learners hear exactly
 * what the control changes.
 *
 * The SVG panel isn't a full X-ray (deferred to phase 7 content sprint)
 * but it IS a meaningful zoomed focus treatment — no more gradient+emoji
 * placeholder, no more alert() modals.
 */

/**
 * Per-control demo sequences. Each is a short (3–5 note) pattern that
 * illustrates the control's effect when played through the instrument's
 * own sampler.
 */
const CONTROL_DEMOS: Record<
  string,
  Record<string, Array<{ note: string; dur: number }>>
> = {
  piano: {
    sustain_pedal: [
      { note: "C4", dur: 1.5 },
      { note: "E4", dur: 1.5 },
      { note: "G4", dur: 1.8 },
    ],
    soft_pedal: [{ note: "E4", dur: 1.2 }, { note: "G4", dur: 1.2 }],
    middle_pedal: [{ note: "C4", dur: 2.0 }, { note: "E4", dur: 0.6 }, { note: "G4", dur: 0.6 }],
  },
  sitar: {
    meend: [{ note: "E4", dur: 1.5 }, { note: "G4", dur: 1.5 }, { note: "E4", dur: 2 }],
    taraf: [{ note: "C4", dur: 3.5 }],
    mizrab: [{ note: "C4", dur: 0.3 }, { note: "C4", dur: 0.3 }, { note: "C4", dur: 0.3 }, { note: "C4", dur: 0.3 }],
  },
  guitar: {
    tuning_pegs: [{ note: "E3", dur: 1.0 }, { note: "A3", dur: 1.0 }, { note: "D4", dur: 1.0 }, { note: "G4", dur: 1.0 }],
    capo: [{ note: "E3", dur: 0.6 }, { note: "G3", dur: 0.6 }, { note: "B3", dur: 0.8 }],
  },
  violin: {
    bow: [{ note: "A4", dur: 2.0 }, { note: "A4", dur: 0.3 }, { note: "A4", dur: 0.3 }],
    vibrato: [{ note: "E5", dur: 3.0 }],
  },
};

function demoFor(instrumentId: string, controlId: string): Array<{ note: string; dur: number }> {
  return (
    CONTROL_DEMOS[instrumentId]?.[controlId] ??
    CONTROL_DEMOS.piano[controlId] ??
    [{ note: "C4", dur: 1.0 }, { note: "E4", dur: 1.0 }, { note: "G4", dur: 1.0 }]
  );
}

export function DissectionOverlay() {
  const [controlId, setControlId] = useAtom(dissectionAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom);
  const [playing, setPlaying] = useState(false);

  if (!controlId || !instrumentId) return null;
  const instrument = getInstrument(instrumentId);
  const control = instrument.controls.find((c) => c.id === controlId);
  if (!control) return null;

  const close = () => setControlId(null);

  const playDemo = async () => {
    if (playing) return;
    setPlaying(true);
    try {
      await unlockAudio();
      const seq = demoFor(instrumentId, controlId);
      let t = 0;
      for (const step of seq) {
        await new Promise((r) => setTimeout(r, t));
        // fire-and-don't-await so notes overlap naturally for sustain demos
        void playNote(instrumentId, step.note, step.dur);
        t = step.dur * 600; // 40% overlap for chord-like blending
      }
      // total duration so button re-enables after sequence finishes
      const total = seq.reduce((s, x) => s + x.dur * 1000, 0) + 400;
      await new Promise((r) => setTimeout(r, total));
    } finally {
      setPlaying(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="panel max-w-lg w-full p-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 pb-4 border-b border-white/5">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-1">
            {instrument.name} · {control.label}
          </div>
          <h3 className="display text-2xl font-semibold">{control.name}</h3>
        </div>

        {/* Zoomed focus panel with a subtle pulse to direct attention at
            the component. Replaces the gradient+emoji placeholder. */}
        <div className="aspect-video bg-gradient-to-br from-ink-900 to-ink-800 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,124,255,0.18),transparent_60%)]" />
          <svg viewBox="0 0 320 180" className="w-full h-full">
            <defs>
              <radialGradient id="spot" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(139,124,255,0.35)" />
                <stop offset="100%" stopColor="rgba(139,124,255,0)" />
              </radialGradient>
            </defs>
            <circle cx="160" cy="90" r="80" fill="url(#spot)">
              <animate attributeName="r" values="72;88;72" dur="3.2s" repeatCount="indefinite" />
            </circle>
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              className="text-6xl"
              style={{ fontSize: "72px", fill: "rgba(255,255,255,0.85)" }}
            >
              {instrument.glyph}
            </text>
            <line x1="205" y1="55" x2="260" y2="30" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            <circle cx="205" cy="55" r="4" fill="rgba(139,124,255,0.95)" />
            <text x="265" y="33" fill="rgba(255,255,255,0.7)" style={{ fontSize: "10px" }}>
              {control.label}
            </text>
          </svg>
        </div>

        <div className="p-6">
          <p className="text-sm text-white/85 leading-relaxed mb-4">{control.description}</p>

          <button
            className="w-full panel p-3 flex items-center gap-3 hover:bg-white/5 mb-4 disabled:opacity-60"
            onClick={playDemo}
            disabled={playing}
          >
            <span className="w-9 h-9 rounded-full bg-indigo-400/20 flex items-center justify-center">
              {playing ? (
                <span className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse" />
              ) : (
                "▶"
              )}
            </span>
            <div className="flex-1 text-left">
              <div className="text-sm">Hear how it sounds</div>
              <div className="text-[11px] text-white/50">
                {playing ? "Playing demo…" : "Plays through the real sampler"}
              </div>
            </div>
          </button>

          <div className="flex gap-2">
            <button className="btn-ghost flex-1" onClick={close}>
              Close
            </button>
            <button className="btn-primary flex-1" onClick={close}>
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
