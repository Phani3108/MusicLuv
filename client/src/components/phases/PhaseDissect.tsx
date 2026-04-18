import { useState } from "react";
import { useSetAtom } from "jotai";
import type { Instrument } from "@catalogs/types";
import { dissectionAtom } from "@/atoms/panels";

export function PhaseDissect({ instrument, onEngage }: { instrument: Instrument; onEngage: () => void }) {
  const setDissection = useSetAtom(dissectionAtom);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  const openControl = (id: string) => {
    setDissection(id);
    const next = new Set(viewed);
    next.add(id);
    setViewed(next);
    if (next.size >= Math.min(2, instrument.controls.length)) onEngage();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-sm text-white/70 mb-4 text-center">
        Tap any control to open its close-up — hear a sample, read what it does, understand the instrument.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {instrument.controls.map((c) => {
          const seen = viewed.has(c.id);
          return (
            <button
              key={c.id}
              onClick={() => openControl(c.id)}
              className={`panel p-4 text-left transition-all
                ${seen ? "bg-emerald-500/5 border-emerald-400/20" : "hover:bg-white/5"}`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="font-semibold text-sm">{c.name}</div>
                {seen && <span className="text-emerald-400 text-xs">✓</span>}
              </div>
              <div className="text-xs text-white/55 leading-snug line-clamp-2">{c.description}</div>
            </button>
          );
        })}
      </div>

      <div className="text-center text-[11px] text-white/40 mt-4">
        {viewed.size === 0
          ? "Open at least 2 controls to continue"
          : viewed.size < 2
            ? `${viewed.size}/2 opened`
            : "✓ explored"}
      </div>
    </div>
  );
}
