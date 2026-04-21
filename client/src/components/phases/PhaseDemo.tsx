import { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import type { Lesson, Exercise } from "@catalogs/types";
import { playNote, playOnset, unlockAudio, ensureReady } from "@/audio/instrumentSampler";
import { currentInstrumentAtom } from "@/atoms/session";
import { prefsAtom } from "@/atoms/prefs";

/**
 * PhaseDemo — multiple audio demonstrations the learner must listen
 * through. Each demo clip is a different view of the same passage
 * (slow · medium · full · focused mid-section). Engagement fires once
 * at least 2 clips have been played end-to-end, one of which is the
 * full-tempo clip.
 *
 * Falls back to a single-clip view when no drills.demo is declared.
 */

type Tempo = 0.5 | 0.75 | 1;

export function PhaseDemo({ lesson, exercise, onEngage }: { lesson: Lesson; exercise: Exercise; onEngage: () => void }) {
  const instrumentId = useAtomValue(currentInstrumentAtom) ?? "piano";
  const prefs = useAtomValue(prefsAtom);
  const declared = lesson.drills?.demo;
  const clips = declared && declared.length > 0
    ? declared
    : [
        { id: "default", label: exercise.title, notes: exercise.targetPattern.notes, onsets: exercise.targetPattern.onsets, tempoBpm: exercise.tempo.bpm, description: undefined as string | undefined },
      ];

  const [index, setIndex] = useState(0);
  const [tempo, setTempo] = useState<Tempo>(1);
  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => { timeouts.current.forEach(clearTimeout); }, []);
  useEffect(() => {
    setIndex(0);
    setCompleted(new Set());
  }, [lesson.id]);

  // Honor the user's autoPlayDemo preference — when enabled, play the
  // first clip automatically on phase entry so the learner hears the
  // target immediately.
  useEffect(() => {
    if (!prefs.autoPlayDemo) return;
    if (index !== 0) return;
    if (completed.size > 0) return; // only on very first entry
    const t = setTimeout(() => void play(), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id]);

  const cur = clips[index];
  const notes = cur.notes ?? [];
  const onsets = cur.onsets ?? [];

  const play = async () => {
    if (playing) return;
    await unlockAudio();
    await ensureReady(instrumentId);
    setPlaying(true);
    const factor = 1 / tempo;

    timeouts.current = [];
    if (notes.length > 0) {
      for (const n of notes) {
        timeouts.current.push(setTimeout(() => {
          void playNote(instrumentId, n.pitch, (n.durationMs / 1000) * factor);
        }, n.startMs * factor));
      }
    }
    if (onsets.length > 0 && notes.length === 0) {
      for (const ms of onsets) {
        timeouts.current.push(setTimeout(() => { void playOnset(instrumentId); }, ms * factor));
      }
    }

    const maxMs = Math.max(
      ...notes.map((n) => (n.startMs + n.durationMs) * factor),
      ...onsets.map((ms) => ms * factor),
      1000,
    );
    timeouts.current.push(setTimeout(() => {
      setPlaying(false);
      setCompleted((prev) => {
        const next = new Set(prev);
        next.add(cur.id);
        // Engage if they've heard 2 clips AND at least one was full-tempo.
        const anyFull = clips.some((c, i) => (next.has(c.id) && (c.tempoBpm ?? exercise.tempo.bpm) >= exercise.tempo.bpm * 0.95));
        if (next.size >= Math.min(2, clips.length) && anyFull) onEngage();
        return next;
      });
    }, maxMs + 200));
  };

  const stop = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    setPlaying(false);
  };

  const advanceToNextUnheard = () => {
    if (playing) return;
    const nextUnheard = clips.findIndex((c, i) => i > index && !completed.has(c.id));
    if (nextUnheard >= 0) setIndex(nextUnheard);
    else setIndex(Math.min(clips.length - 1, index + 1));
  };

  return (
    <div className="max-w-xl mx-auto space-y-3">
      {/* Clip tabs */}
      <div className="flex gap-1 overflow-x-auto scrollbar-none">
        {clips.map((c, i) => {
          const done = completed.has(c.id);
          const active = i === index;
          return (
            <button
              key={c.id}
              disabled={playing}
              onClick={() => setIndex(i)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] border transition-colors
                ${active
                  ? "bg-indigo-500/20 border-indigo-400/40 text-white"
                  : done
                    ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-200/80"
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}
            >
              {done && "✓ "}
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="panel p-5 bg-white/[0.02]">
        <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">
          Clip {index + 1} of {clips.length}
        </div>
        <div className="font-semibold text-base mb-1">{cur.label}</div>
        {cur.description && (
          <div className="text-xs text-white/55 leading-relaxed mb-2">{cur.description}</div>
        )}
        <div className="text-xs text-white/50">
          {cur.tempoBpm ? `${cur.tempoBpm} bpm` : `${exercise.tempo.bpm} bpm`} ·{" "}
          {notes.length > 0 ? `${notes.length} notes` : `${onsets.length} hits`}
        </div>

        <div className="flex items-center gap-2 mt-5">
          <button
            className="btn-primary text-base"
            onClick={playing ? stop : play}
          >
            {playing ? "⏸ Stop" : completed.has(cur.id) ? "▶ Play again" : "▶ Listen"}
          </button>
          <div className="flex-1" />
          <div className="flex gap-1 text-xs">
            {[0.5, 0.75, 1].map((t) => (
              <button
                key={t}
                disabled={playing}
                onClick={() => setTempo(t as Tempo)}
                className={`px-2 py-1 rounded-md border transition-colors
                  ${tempo === t ? "bg-indigo-500/20 border-indigo-400/40 text-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}
              >
                {Math.round(t * 100)}%
              </button>
            ))}
          </div>
        </div>

        {completed.has(cur.id) && index < clips.length - 1 && (
          <button
            onClick={advanceToNextUnheard}
            className="w-full mt-4 py-2 rounded-md bg-white/5 hover:bg-white/10 text-xs border border-white/10"
          >
            Next clip: {clips[index + 1].label} →
          </button>
        )}
      </div>

      <div className="text-center text-[11px] text-white/40">
        {completed.size === 0 && `Listen to at least 2 clips, including at least one at full tempo`}
        {completed.size > 0 && completed.size < clips.length && `${completed.size} / ${clips.length} heard`}
        {completed.size >= clips.length && `✓ heard every clip · move on to Dissect`}
      </div>
    </div>
  );
}
