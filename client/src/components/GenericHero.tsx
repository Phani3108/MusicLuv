import type { Instrument } from "@catalogs/types";

/** Placeholder hero for instruments without a bespoke visual yet. Uses the family accent. */
export function GenericHero({ instrument }: { instrument: Instrument }) {
  return (
    <div className="relative select-none">
      <div className="rounded-[28px] bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900 p-10 h-64 flex flex-col items-center justify-center border border-white/5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="text-9xl mb-4 animate-float">{instrument.glyph}</div>
        <div className="text-xl display font-semibold">{instrument.name}</div>
        <div className="text-xs text-white/40 mt-1 max-w-sm text-center">{instrument.blurb}</div>
        <div className="mt-4 chip bg-white/5 border border-white/10 text-white/60">
          Photoreal hero visual — Phase 6
        </div>
      </div>
    </div>
  );
}
