import { useEffect, useState } from "react";
import type { Instrument, Exercise, Lesson } from "@catalogs/types";
import { PianoHero } from "../PianoHero";
import { SitarHero } from "../SitarHero";
import { GenericHero } from "../GenericHero";
import { VirtualGuitar } from "../VirtualGuitar";
import { VirtualViolin } from "../VirtualViolin";
import { VirtualDrums } from "../VirtualDrums";

/**
 * PhaseVirtualTry — targeted hunt-and-find drills on the on-screen
 * instrument. Each prompt names specific notes the learner must press
 * (e.g. "Find F#4", "Play the highest + lowest notes in the passage").
 * A drill completes when minHits of its targetNotes are pressed.
 *
 * Engagement fires after all prompts are cleared, or at least 3
 * whichever comes first.
 */
export function PhaseVirtualTry({
  instrument,
  exercise,
  lesson,
  onEngage,
}: {
  instrument: Instrument;
  exercise: Exercise;
  lesson?: Lesson;
  onEngage: () => void;
}) {
  const declared = lesson?.drills?.virtualTry ?? [];
  const prompts = declared.length > 0
    ? declared
    : [
        {
          id: "default",
          prompt: "Explore the instrument — play any 3 notes to advance.",
          targetNotes: exercise.targetPattern.notes?.slice(0, 3).map((n) => n.pitch) ?? ["C4", "D4", "E4"],
          minHits: 3,
        },
      ];

  const [index, setIndex] = useState(0);
  const [hits, setHits] = useState<Record<string, Set<string>>>({});
  const [cleared, setCleared] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIndex(0);
    setHits({});
    setCleared(new Set());
  }, [lesson?.id]);

  const cur = prompts[index];
  const hitSet = hits[cur.id] ?? new Set<string>();
  const required = cur.minHits ?? cur.targetNotes.length;

  const handleKey = (note: string) => {
    // Only record if note is one we're asking for.
    if (!cur.targetNotes.includes(note)) return;
    const nextSet = new Set(hitSet);
    nextSet.add(note);
    setHits({ ...hits, [cur.id]: nextSet });

    if (nextSet.size >= required && !cleared.has(cur.id)) {
      const nextCleared = new Set(cleared);
      nextCleared.add(cur.id);
      setCleared(nextCleared);
      const engageThreshold = Math.min(prompts.length, 3);
      if (nextCleared.size >= engageThreshold) onEngage();
      // Auto-advance after a short pause so the user sees success feedback.
      if (index < prompts.length - 1) {
        setTimeout(() => setIndex(index + 1), 700);
      }
    }
  };

  // For other virtual heroes that don't accept an onKeyClick, we still
  // register any press events via `data-piano-note` clicks bubbling up.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("[data-piano-note]") as HTMLElement | null;
      if (!el) return;
      const note = el.getAttribute("data-piano-note");
      if (note) handleKey(note);
    };
    const root = document.querySelector("[data-piano-root]");
    if (root) root.addEventListener("mousedown", handler as any);
    return () => {
      if (root) root.removeEventListener("mousedown", handler as any);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur.id, hits, cleared, index]);

  return (
    <div className="space-y-3">
      {/* Prompt header */}
      <div className="panel p-3 bg-white/[0.02]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">
              Prompt {index + 1} of {prompts.length}
            </div>
            <div className="text-sm font-semibold">{cur.prompt}</div>
            <div className="text-[11px] text-white/55 mt-1">
              Target notes: <span className="font-mono">{cur.targetNotes.join(" · ")}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest text-white/40">hits</div>
            <div className="font-mono text-xl font-semibold">
              {hitSet.size} / {required}
            </div>
          </div>
        </div>
        <div className="mt-2 flex gap-1 overflow-x-auto scrollbar-none">
          {prompts.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setIndex(i)}
              className={`shrink-0 px-3 py-1 rounded-full text-[11px] border transition-colors ${
                i === index
                  ? "bg-indigo-500/20 border-indigo-400/40 text-white"
                  : cleared.has(p.id)
                    ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-200/80"
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
              }`}
            >
              {cleared.has(p.id) && "✓ "}
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Hero instrument */}
      {instrument.id === "piano" && <PianoHero onKeyClick={handleKey} />}
      {instrument.id === "guitar" && <VirtualGuitar />}
      {instrument.id === "violin" && <VirtualViolin />}
      {instrument.id === "drums" && <VirtualDrums />}
      {instrument.id === "sitar" && <SitarHero />}
      {!["piano", "guitar", "violin", "drums", "sitar"].includes(instrument.id) && (
        <GenericHero instrument={instrument} />
      )}

      <div className="text-center text-[11px] text-white/40">
        {cleared.size === 0
          ? "Press the requested notes to clear this prompt"
          : cleared.size < prompts.length
            ? `${cleared.size} / ${prompts.length} prompts cleared`
            : "✓ all prompts cleared · ready for guided play"}
      </div>
    </div>
  );
}
