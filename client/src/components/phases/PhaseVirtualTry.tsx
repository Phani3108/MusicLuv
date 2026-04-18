import { useState } from "react";
import type { Instrument, Exercise } from "@catalogs/types";
import { PianoHero } from "../PianoHero";
import { SitarHero } from "../SitarHero";
import { GenericHero } from "../GenericHero";
import { VirtualGuitar } from "../VirtualGuitar";
import { VirtualViolin } from "../VirtualViolin";

export function PhaseVirtualTry({ instrument, exercise, onEngage }: { instrument: Instrument; exercise: Exercise; onEngage: () => void }) {
  const [keysPressed, setKeysPressed] = useState(0);

  const handleKeyClick = (_note: string) => {
    setKeysPressed((n) => {
      const next = n + 1;
      if (next >= 3) onEngage();
      return next;
    });
  };

  return (
    <div>
      <div className="text-sm text-white/70 mb-4 text-center max-w-xl mx-auto">
        Play freely — tap or click any key. The on-screen piano sounds just like a real one. No need for the instrument yet.
      </div>

      {instrument.id === "piano" && <PianoHero onKeyClick={handleKeyClick} />}
      {instrument.id === "guitar" && <VirtualGuitar />}
      {instrument.id === "violin" && <VirtualViolin />}
      {instrument.id === "sitar" && <SitarHero />}
      {instrument.id !== "piano" && instrument.id !== "sitar" && instrument.id !== "guitar" && instrument.id !== "violin" && (
        <GenericHero instrument={instrument} />
      )}

      <div className="mt-4 text-center text-[11px] text-white/40">
        {keysPressed === 0
          ? "Tap at least 3 keys to continue"
          : keysPressed < 3
            ? `${keysPressed}/3 played`
            : "✓ explored · try the first notes of the target melody"}
      </div>

      <div className="mt-3 text-center text-[10px] text-white/30 font-mono">
        target: {exercise.targetPattern.notes?.slice(0, 5).map((n) => n.pitch).join(" · ")}
      </div>
    </div>
  );
}
