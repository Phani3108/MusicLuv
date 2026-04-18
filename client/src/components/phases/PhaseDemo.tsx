import { useEffect, useRef, useState } from "react";
import type { Lesson, Exercise } from "@catalogs/types";
import { playPianoNote, unlockAudio, ensurePianoReady } from "@/audio/pianoSampler";

type Tempo = 0.5 | 0.75 | 1;

export function PhaseDemo({ lesson, exercise, onEngage }: { lesson: Lesson; exercise: Exercise; onEngage: () => void }) {
  const [tempo, setTempo] = useState<Tempo>(1);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => { timeoutsRef.current.forEach(clearTimeout); }, []);

  const play = async () => {
    if (playing) return;
    await unlockAudio();
    await ensurePianoReady();
    setPlaying(true);
    const notes = exercise.targetPattern.notes ?? [];
    const factor = 1 / tempo; // 0.5 tempo = slower = 2x time
    timeoutsRef.current = notes.map((n) => {
      return setTimeout(async () => {
        await playPianoNote(n.pitch, (n.durationMs / 1000) * factor);
      }, n.startMs * factor);
    });
    // Mark end
    const total = Math.max(...notes.map((n) => (n.startMs + n.durationMs) * factor), 1000);
    timeoutsRef.current.push(setTimeout(() => {
      setPlaying(false);
      setPlayed(true);
      onEngage();
    }, total + 200));
  };

  const stop = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setPlaying(false);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="panel p-5 bg-white/[0.02] mb-4">
        <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Target performance</div>
        <div className="font-semibold text-base mb-1">{exercise.title}</div>
        <div className="text-xs text-white/55">
          {exercise.tempo.bpm} bpm · {(exercise.targetPattern.notes?.length ?? 0)} notes
        </div>

        <div className="flex items-center gap-2 mt-5">
          <button
            className="btn-primary text-base"
            onClick={playing ? stop : play}
          >
            {playing ? "⏸ Stop" : played ? "▶ Play again" : "▶ Listen"}
          </button>
          <div className="flex-1" />
          <div className="flex gap-1 text-xs">
            {[0.5, 0.75, 1].map((t) => (
              <button
                key={t}
                onClick={() => setTempo(t as Tempo)}
                className={`px-2 py-1 rounded-md border transition-colors
                  ${tempo === t ? "bg-indigo-500/20 border-indigo-400/40 text-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}
              >
                {Math.round(t * 100)}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-white/40">
        {played ? "✓ heard · move on to Dissect" : "Listen all the way through to continue"}
      </div>
    </div>
  );
}
