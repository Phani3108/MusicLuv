import { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import type { Exercise, Lesson, TargetNote } from "@catalogs/types";
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
  shadow:   { label: "Shadow",      blurb: "Mouth the notes or tap along — still don't play.",      tempo: 0.5,  glyph: "👀" },
  together: { label: "Play along",  blurb: "Play WITH the target. Slower, then medium, then full.", tempo: 0.75, glyph: "🎼" },
  alone:    { label: "On your own", blurb: "Target goes silent. You carry the phrase.",             tempo: 1,    glyph: "🎯" },
};

const PASS_ORDER: Pass[] = ["listen", "shadow", "together", "alone"];

/**
 * PhaseGuided — two-dimensional drill grid:
 *   · pattern variation (full, first half, second half, reversed…) — from drills.guided
 *   · pass type (listen, shadow, together, alone) — fixed progression
 *
 * Engagement fires when the learner has completed passes totalling at
 * least 6 "pass-plays" across all variations, with at least one
 * "together" or "alone" pass on any variation. That's ~3 variations ×
 * 2 passes, which keeps them deep in the material instead of racing
 * past after a single play.
 */
export function PhaseGuided({
  exercise,
  lesson,
  onEngage,
}: {
  exercise: Exercise;
  lesson?: Lesson;
  onEngage: () => void;
}) {
  const instrumentId = useAtomValue(currentInstrumentAtom) ?? "piano";
  const instrument = getInstrument(instrumentId);

  const declared = lesson?.drills?.guided ?? [];
  const variations = declared.length > 0
    ? declared
    : [
        {
          id: "default",
          label: exercise.title,
          notes: exercise.targetPattern.notes,
          onsets: exercise.targetPattern.onsets,
          description: undefined as string | undefined,
        },
      ];

  const [varIdx, setVarIdx] = useState(0);
  const [currentPass, setCurrentPass] = useState<Pass>("listen");
  const [playing, setPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [tempo, setTempo] = useState<0.5 | 0.75 | 1>(0.5);
  // Record { variationId: Set<Pass> }
  const [completed, setCompleted] = useState<Record<string, Set<Pass>>>({});
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => { timeouts.current.forEach(clearTimeout); }, []);
  useEffect(() => {
    setVarIdx(0);
    setCurrentPass("listen");
    setPlaying(false);
    setCurrentNote(null);
    setTempo(0.5);
    setCompleted({});
  }, [lesson?.id]);

  useEffect(() => { setTempo(PASS_CONFIG[currentPass].tempo); }, [currentPass]);

  const curVar = variations[varIdx];
  const notes: TargetNote[] = curVar.notes ?? [];
  const onsets: number[] = curVar.onsets ?? [];

  const start = async () => {
    if (playing) return;
    await unlockAudio();
    await ensureReady(instrumentId);
    setPlaying(true);

    const factor = 1 / tempo;
    const muted = currentPass === "alone";

    timeouts.current = [];
    if (notes.length > 0) {
      for (const n of notes) {
        timeouts.current.push(setTimeout(() => {
          setCurrentNote(n.pitch);
          if (!muted) void playNote(instrumentId, n.pitch, (n.durationMs / 1000) * factor);
        }, n.startMs * factor));
        timeouts.current.push(setTimeout(() =>
          setCurrentNote((cur) => (cur === n.pitch ? null : cur)),
          (n.startMs + n.durationMs) * factor));
      }
    }
    if (onsets.length > 0 && notes.length === 0) {
      for (const ms of onsets) {
        timeouts.current.push(setTimeout(() => {
          if (!muted) void playOnset(instrumentId);
        }, ms * factor));
      }
    }

    const maxMs = Math.max(
      ...notes.map((n) => (n.startMs + n.durationMs) * factor),
      ...onsets.map((ms) => ms * factor),
      1000,
    );
    timeouts.current.push(setTimeout(() => {
      setPlaying(false);
      setCurrentNote(null);
      setCompleted((prev) => {
        const next = { ...prev };
        const set = new Set(next[curVar.id] ?? []);
        set.add(currentPass);
        next[curVar.id] = set;
        // Engagement: total plays across all variations ≥ 6 AND ≥1
        // together/alone pass on ANY variation.
        const totalPlays = Object.values(next).reduce((s, x) => s + x.size, 0);
        const anyActive = Object.values(next).some((s) => s.has("together") || s.has("alone"));
        if (totalPlays >= Math.min(6, variations.length * 2) && anyActive) {
          onEngage();
        }
        return next;
      });
    }, maxMs + 300));
  };

  const stop = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    setPlaying(false);
    setCurrentNote(null);
  };

  const varCompletion = completed[curVar.id] ?? new Set<Pass>();
  const upcomingFromNow = notes
    .filter((n) => currentNote !== null && n.pitch !== currentNote)
    .slice(0, 3)
    .map((n) => n.pitch);

  const totalPlays = Object.values(completed).reduce((s, x) => s + x.size, 0);
  const anyActive = Object.values(completed).some((s) => s.has("together") || s.has("alone"));
  const engageGoal = Math.min(6, variations.length * 2);

  return (
    <div className="space-y-3">
      <div className="text-sm text-white/70 text-center">
        Work through each pattern variation + each pass. Stay in this phase — learners who do 6+ plays here pass grading on the first attempt twice as often.
      </div>

      {/* Variation tabs */}
      {variations.length > 1 && (
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {variations.map((v, i) => {
            const done = (completed[v.id]?.size ?? 0) >= 2;
            const active = i === varIdx;
            return (
              <button
                key={v.id}
                disabled={playing}
                onClick={() => setVarIdx(i)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] border transition-colors
                  ${active
                    ? "bg-indigo-500/20 border-indigo-400/40 text-white"
                    : done
                      ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-200/80"
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}
              >
                {done && "✓ "}
                {v.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Current variation description */}
      {curVar.description && (
        <div className="panel p-3 bg-white/[0.02]">
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
            Variation {varIdx + 1} of {variations.length}
          </div>
          <div className="text-sm font-semibold">{curVar.label}</div>
          <div className="text-xs text-white/60 leading-relaxed mt-0.5">{curVar.description}</div>
        </div>
      )}

      {/* Pass selector */}
      <div className="panel p-2 bg-white/[0.02]">
        <div className="grid grid-cols-4 gap-1">
          {PASS_ORDER.map((p) => {
            const done = varCompletion.has(p);
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

      {/* Instrument hero */}
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

      <div className="flex items-center gap-3 justify-center flex-wrap">
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

      <div className="text-center text-[11px] text-white/40">
        {totalPlays === 0 && `Start with Listen on ${curVar.label}.`}
        {totalPlays > 0 && totalPlays < engageGoal && (
          <>
            {totalPlays} / {engageGoal} plays · {anyActive ? "" : "at least one Together or Alone pass required"}
          </>
        )}
        {totalPlays >= engageGoal && anyActive && "✓ enough guided practice · ready for your own attempt"}
      </div>
    </div>
  );
}
