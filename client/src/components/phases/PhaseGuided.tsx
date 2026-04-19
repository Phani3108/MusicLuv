import { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import type { Exercise } from "@catalogs/types";
import { playNote, playOnset, unlockAudio, ensureReady } from "@/audio/instrumentSampler";
import { currentInstrumentAtom } from "@/atoms/session";
import { getInstrument } from "@catalogs/instrumentCatalog";
import { PianoHero } from "../PianoHero";
import { VirtualGuitar } from "../VirtualGuitar";
import { VirtualViolin } from "../VirtualViolin";
import { VirtualDrums } from "../VirtualDrums";
import { SitarHero } from "../SitarHero";
import { GenericHero } from "../GenericHero";

type Pass = "listen" | "shadow" | "together" | "alone";

const PASS_CONFIG: Record<Pass, { label: string; blurb: string; tempo: 0.5 | 0.75 | 1; glyph: string }> = {
  listen:   { label: "Listen",      blurb: "Watch + listen. Don't play yet.",                       tempo: 0.5,  glyph: "👂" },
  shadow:   { label: "Shadow",      blurb: "Mouth the notes or tap along — still don't play.",     tempo: 0.5,  glyph: "👀" },
  together: { label: "Play along",  blurb: "Play WITH the target. Slower, then medium, then full.", tempo: 0.75, glyph: "🎼" },
  alone:    { label: "On your own", blurb: "Target goes silent. You carry the phrase.",             tempo: 1,    glyph: "🎯" },
};

const PASS_ORDER: Pass[] = ["listen", "shadow", "together", "alone"];

/**
 * Guided-play phase — instrument-aware + multi-pass structure.
 * Four progressive passes:
 *   1. Listen (50% tempo) — learner just absorbs
 *   2. Shadow (50%)       — learner mimes / taps rhythm
 *   3. Together (75%→100%)— learner plays along with target audible
 *   4. Alone (100%)       — target muted, learner carries it
 * Engagement fires after the learner completes at least 2 passes (one of which is "together" or "alone").
 */
export function PhaseGuided({ exercise, onEngage }: { exercise: Exercise; onEngage: () => void }) {
  const instrumentId = useAtomValue(currentInstrumentAtom) ?? "piano";
  const instrument = getInstrument(instrumentId);
  const [playing, setPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [currentPass, setCurrentPass] = useState<Pass>("listen");
  const [completedPasses, setCompletedPasses] = useState<Set<Pass>>(new Set());
  const [tempo, setTempo] = useState<0.5 | 0.75 | 1>(0.5);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => { timeouts.current.forEach(clearTimeout); }, []);

  // Auto-select tempo to match recommended pass tempo on pass change
  useEffect(() => { setTempo(PASS_CONFIG[currentPass].tempo); }, [currentPass]);

  const start = async () => {
    if (playing) return;
    await unlockAudio();
    await ensureReady(instrumentId);
    setPlaying(true);

    const notes = exercise.targetPattern.notes ?? [];
    const onsets = exercise.targetPattern.onsets ?? [];
    const factor = 1 / tempo;
    const muted = currentPass === "alone";  // silent target on the alone pass

    // Schedule pitched notes
    if (notes.length > 0) {
      timeouts.current = notes.flatMap((n) => [
        setTimeout(() => {
          setCurrentNote(n.pitch);
          if (!muted) playNote(instrumentId, n.pitch, (n.durationMs / 1000) * factor);
        }, n.startMs * factor),
        setTimeout(() => setCurrentNote((cur) => (cur === n.pitch ? null : cur)),
                   (n.startMs + n.durationMs) * factor),
      ]);
    }
    // Schedule onsets (drums / rhythm-only exercises)
    if (onsets.length > 0 && notes.length === 0) {
      timeouts.current = onsets.map((ms) =>
        setTimeout(() => {
          if (!muted) playOnset(instrumentId);
        }, ms * factor)
      );
    }

    const maxMs = Math.max(
      ...notes.map((n) => (n.startMs + n.durationMs) * factor),
      ...onsets.map((ms) => ms * factor),
      1000
    );
    timeouts.current.push(setTimeout(() => {
      setPlaying(false);
      setCurrentNote(null);
      const next = new Set(completedPasses);
      next.add(currentPass);
      setCompletedPasses(next);
      // Engage when learner has done at least 2 passes and one is together/alone
      const engagedEnough = next.size >= 2 && (next.has("together") || next.has("alone"));
      if (engagedEnough) onEngage();
    }, maxMs + 300));
  };

  const stop = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    setPlaying(false);
    setCurrentNote(null);
  };

  const notes = exercise.targetPattern.notes ?? [];
  const upcomingFromNow = notes
    .filter((n) => currentNote !== null && n.pitch !== currentNote)
    .slice(0, 3)
    .map((n) => n.pitch);

  return (
    <div>
      <div className="text-sm text-white/70 mb-4 text-center max-w-xl mx-auto">
        Four progressive passes — each one a new task. Do at least two (one involving playing along).
      </div>

      {/* Pass selector */}
      <div className="panel p-2 mb-4 bg-white/[0.02]">
        <div className="grid grid-cols-4 gap-1">
          {PASS_ORDER.map((p) => {
            const done = completedPasses.has(p);
            const active = currentPass === p;
            const meta = PASS_CONFIG[p];
            return (
              <button
                key={p}
                onClick={() => { if (!playing) setCurrentPass(p); }}
                disabled={playing}
                className={`relative p-2 rounded-xl text-center transition-all
                  ${active
                    ? "bg-indigo-500/20 border border-indigo-400/40"
                    : done
                      ? "bg-emerald-500/10 border border-emerald-400/20 text-emerald-200/80"
                      : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"}`}
              >
                <div className="text-lg">{meta.glyph}</div>
                <div className="text-[10px] font-semibold mt-0.5">{meta.label}</div>
                {done && <span className="absolute top-1 right-1 text-emerald-400 text-[10px]">✓</span>}
              </button>
            );
          })}
        </div>
        <div className="text-[11px] text-white/60 mt-2 text-center">
          {PASS_CONFIG[currentPass].glyph} <strong>{PASS_CONFIG[currentPass].label}</strong> — {PASS_CONFIG[currentPass].blurb}
        </div>
      </div>

      {/* Instrument hero — dispatch by instrument family */}
      {instrument && (
        <>
          {instrument.id === "piano" && (
            <PianoHero highlight={null} target={currentNote} upcoming={upcomingFromNow} showNoodleHints={false} />
          )}
          {instrument.id === "guitar" && <VirtualGuitar showNoodleHints={false} />}
          {instrument.id === "violin" && <VirtualViolin showHints={false} />}
          {instrument.id === "drums" && <VirtualDrums showHints={false} />}
          {instrument.id === "sitar" && <SitarHero highlight={currentNote} />}
          {!["piano","guitar","violin","drums","sitar"].includes(instrument.id) && (
            <GenericHero instrument={instrument} />
          )}
        </>
      )}

      <div className="flex items-center gap-3 justify-center mt-4 flex-wrap">
        <div className="flex gap-1 text-xs">
          {[0.5, 0.75, 1].map((t) => (
            <button
              key={t}
              disabled={playing}
              onClick={() => setTempo(t as 0.5 | 0.75 | 1)}
              className={`px-2 py-1 rounded-md border transition-colors
                ${tempo === t
                  ? "bg-indigo-500/20 border-indigo-400/40 text-white"
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}
            >
              {Math.round(t * 100)}%
            </button>
          ))}
        </div>
        <button className="btn-primary" onClick={playing ? stop : start}>
          {playing ? `⏸ Stop ${PASS_CONFIG[currentPass].label}` : `▶ ${PASS_CONFIG[currentPass].label} · ${Math.round(tempo * 100)}%`}
        </button>
      </div>

      <div className="text-center text-[11px] text-white/40 mt-3">
        {completedPasses.size === 0 && "Start with Listen."}
        {completedPasses.size === 1 && "Great. Pick another pass — at least one should be Together or On your own."}
        {completedPasses.size >= 2 && (completedPasses.has("together") || completedPasses.has("alone"))
          ? "✓ guided · ready for your own attempt"
          : completedPasses.size >= 2 && "Almost — do at least one Together or Alone pass to advance."}
      </div>
    </div>
  );
}
