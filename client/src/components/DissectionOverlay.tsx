import { useAtom, useAtomValue } from "jotai";
import { dissectionAtom } from "@/atoms/panels";
import { currentInstrumentAtom } from "@/atoms/session";
import { getInstrument } from "@catalogs/instrumentCatalog";

export function DissectionOverlay() {
  const [controlId, setControlId] = useAtom(dissectionAtom);
  const instrumentId = useAtomValue(currentInstrumentAtom);

  if (!controlId || !instrumentId) return null;
  const instrument = getInstrument(instrumentId);
  const control = instrument.controls.find((c) => c.id === controlId);
  if (!control) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
         onClick={() => setControlId(null)}>
      <div className="panel max-w-lg w-full p-0 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 pb-4 border-b border-white/5">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-1">
            {instrument.name} · {control.label}
          </div>
          <h3 className="display text-2xl font-semibold">{control.name}</h3>
        </div>

        {/* Exploded "X-ray" illustration placeholder */}
        <div className="aspect-video bg-gradient-to-br from-indigo-500/10 via-transparent to-amber-400/10 flex items-center justify-center relative overflow-hidden">
          <div className="text-8xl opacity-40 animate-float">{instrument.glyph}</div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,124,255,0.25),transparent_60%)]" />
          <div className="absolute bottom-3 left-3 chip bg-black/40 border border-white/10 text-white/60">
            X-ray illustration · Phase 6
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm text-white/85 leading-relaxed mb-4">{control.description}</p>

          <button className="w-full panel p-3 flex items-center gap-3 hover:bg-white/5 mb-4"
                  onClick={() => alert("Mock: would play " + control.name + " sample")}>
            <span className="w-9 h-9 rounded-full bg-indigo-400/20 flex items-center justify-center">▶</span>
            <div className="flex-1 text-left">
              <div className="text-sm">Hear how it sounds</div>
              <div className="text-[11px] text-white/50">Sample audio · mock</div>
            </div>
          </button>

          <div className="flex gap-2">
            <button className="btn-ghost flex-1" onClick={() => setControlId(null)}>Close</button>
            <button className="btn-primary flex-1" onClick={() => setControlId(null)}>Got it</button>
          </div>
        </div>
      </div>
    </div>
  );
}
