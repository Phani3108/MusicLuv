import { useEffect, useRef, useState } from "react";
import type { Instrument, Exercise, Lesson, VirtualTryPrompt } from "@catalogs/types";
import { PianoHero } from "../PianoHero";
import { SitarHero } from "../SitarHero";
import { GenericHero } from "../GenericHero";
import { VirtualGuitar } from "../VirtualGuitar";
import { VirtualViolin } from "../VirtualViolin";
import { VirtualDrums } from "../VirtualDrums";
import { keyboardRangeFor, normalizeNote, pitchClass } from "@/lib/notes";

/**
 * PhaseVirtualTry — targeted hunt-and-find drills on the on-screen
 * instrument. Each prompt names specific notes the learner must press
 * (e.g. "Find F#4", "Play the highest + lowest notes in the passage").
 * A drill completes when minHits of its targetNotes are pressed.
 *
 * - Unpitched exercises (drums, claps) accept any distinct pads.
 * - A target the on-screen instrument can't play (C3 on a one-octave strip)
 *   accepts any key with the same note name.
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
  const exerciseNotes = exercise.targetPattern.notes ?? [];
  const freeMode = exerciseNotes.length === 0;
  const declared = lesson?.drills?.virtualTry ?? [];
  const prompts: VirtualTryPrompt[] = declared.length > 0
    ? declared
    : [
        {
          id: "default",
          prompt: "Explore the instrument — play any 3 notes to advance.",
          targetNotes: exerciseNotes.slice(0, 3).map((n) => n.pitch),
          minHits: 3,
        },
      ];

  const [index, setIndex] = useState(0);
  const [hits, setHits] = useState<Record<string, string[]>>({});
  const [playable, setPlayable] = useState<Set<string>>(new Set());
  const rootRef = useRef<HTMLDivElement>(null);
  const engagedRef = useRef(false);

  useEffect(() => {
    setIndex(0);
    setHits({});
    engagedRef.current = false;
  }, [lesson?.id]);

  // Which notes does the on-screen instrument actually have?
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll("[data-piano-note]") ?? [];
    setPlayable(new Set(Array.from(els, (el) => normalizeNote(el.getAttribute("data-piano-note") ?? ""))));
  }, [instrument.id, exercise.id]);

  const cur = prompts[Math.min(index, prompts.length - 1)];
  const required = (p: VirtualTryPrompt) =>
    freeMode ? Math.min(p.minHits ?? 3, 3) : Math.min(p.minHits ?? p.targetNotes.length, new Set(p.targetNotes).size);
  const isCleared = (p: VirtualTryPrompt) => (hits[p.id]?.length ?? 0) >= required(p);

  /** The target a pressed note counts toward, or null if it doesn't count. */
  const matchTarget = (p: VirtualTryPrompt, note: string): string | null => {
    if (freeMode) return note;
    const pressed = normalizeNote(note);
    for (const t of p.targetNotes) {
      const target = normalizeNote(t);
      if (target === pressed) return target;
      if (!playable.has(target) && pitchClass(target) === pitchClass(pressed)) return target;
    }
    return null;
  };

  const handleNote = (note: string) => {
    const matched = matchTarget(cur, note);
    if (!matched) return;
    setHits((prev) => {
      const set = new Set(prev[cur.id] ?? []);
      set.add(matched);
      return { ...prev, [cur.id]: [...set] };
    });
  };

  const clearedCount = prompts.filter(isCleared).length;
  const curCleared = isCleared(cur);

  useEffect(() => {
    if (!engagedRef.current && clearedCount >= Math.min(prompts.length, 3)) {
      engagedRef.current = true;
      onEngage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearedCount]);

  // Auto-advance after a short pause so the user sees success feedback.
  useEffect(() => {
    if (!curCleared || index >= prompts.length - 1) return;
    const t = setTimeout(() => setIndex((i) => Math.min(i + 1, prompts.length - 1)), 700);
    return () => clearTimeout(t);
  }, [curCleared, index, prompts.length]);

  const hitCount = hits[cur.id]?.length ?? 0;
  const pianoRange = keyboardRangeFor([...exerciseNotes.map((n) => n.pitch), ...cur.targetNotes]);

  return (
    <div className="space-y-3">
      {/* Prompt header */}
      <div className="panel p-3 bg-white/[0.02]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">
              Prompt {index + 1} of {prompts.length}
            </div>
            <div className="text-sm font-semibold">
              {freeMode ? `Hit ${required(cur)} different pads to get a feel for the kit.` : cur.prompt}
            </div>
            {!freeMode && (
              <div className="text-[11px] text-white/55 mt-1">
                Target notes: <span className="font-mono">{cur.targetNotes.join(" · ")}</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest text-white/40">hits</div>
            <div className="font-mono text-xl font-semibold">
              {Math.min(hitCount, required(cur))} / {required(cur)}
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
                  : isCleared(p)
                    ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-200/80"
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
              }`}
            >
              {isCleared(p) && "✓ "}
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Hero instrument */}
      <div ref={rootRef}>
        {instrument.id === "piano" && <PianoHero range={pianoRange} onKeyClick={handleNote} />}
        {instrument.id === "guitar" && <VirtualGuitar onNote={handleNote} />}
        {instrument.id === "violin" && <VirtualViolin onNote={handleNote} />}
        {instrument.id === "drums" && <VirtualDrums onNote={handleNote} />}
        {instrument.id === "sitar" && <SitarHero onNote={handleNote} />}
        {!["piano", "guitar", "violin", "drums", "sitar"].includes(instrument.id) && (
          <GenericHero instrument={instrument} onNote={handleNote} />
        )}
      </div>

      <div className="text-center text-[11px] text-white/40">
        {clearedCount === 0
          ? "Press the requested notes to clear this prompt"
          : clearedCount < prompts.length
            ? `${clearedCount} / ${prompts.length} prompts cleared`
            : "✓ all prompts cleared · ready for guided play"}
      </div>
    </div>
  );
}
