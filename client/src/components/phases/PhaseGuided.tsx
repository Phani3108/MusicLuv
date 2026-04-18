import { useEffect, useRef, useState } from "react";
import type { Exercise } from "@catalogs/types";
import { playPianoNote, unlockAudio, ensurePianoReady } from "@/audio/pianoSampler";
import { PianoHero } from "../PianoHero";

export function PhaseGuided({ exercise, onEngage }: { exercise: Exercise; onEngage: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [tempo, setTempo] = useState<0.5 | 0.75 | 1>(0.5);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => { timeouts.current.forEach(clearTimeout); }, []);

  const start = async () => {
    if (playing) return;
    await unlockAudio();
    await ensurePianoReady();
    setPlaying(true);
    setCompleted(false);
    const notes = exercise.targetPattern.notes ?? [];
    const factor = 1 / tempo;
    timeouts.current = notes.flatMap((n) => [
      setTimeout(() => {
        setCurrentNote(n.pitch);
        playPianoNote(n.pitch, (n.durationMs / 1000) * factor);
      }, n.startMs * factor),
      setTimeout(() => setCurrentNote((cur) => (cur === n.pitch ? null : cur)),
                 (n.startMs + n.durationMs) * factor),
    ]);
    const total = Math.max(...notes.map((n) => (n.startMs + n.durationMs) * factor), 1000);
    timeouts.current.push(setTimeout(() => {
      setPlaying(false);
      setCurrentNote(null);
      setCompleted(true);
      onEngage();
    }, total + 300));
  };

  const stop = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    setPlaying(false);
    setCurrentNote(null);
  };

  const notes = exercise.targetPattern.notes ?? [];
  const upcomingFromNow = notes
    .filter((n, i) => i > 0 && currentNote !== null && n.pitch !== currentNote)
    .slice(0, 3)
    .map((n) => n.pitch);

  return (
    <div>
      <div className="text-sm text-white/70 mb-4 text-center max-w-xl mx-auto">
        Watch and play along with the highlighted keys. Slow speed first — speed comes with repetition.
      </div>

      <PianoHero
        highlight={null}
        target={currentNote}
        upcoming={upcomingFromNow}
        showNoodleHints={false}
      />

      <div className="flex items-center gap-3 justify-center mt-4">
        <div className="flex gap-1 text-xs">
          {[0.5, 0.75, 1].map((t) => (
            <button
              key={t}
              disabled={playing}
              onClick={() => setTempo(t as 0.5 | 0.75 | 1)}
              className={`px-2 py-1 rounded-md border transition-colors
                ${tempo === t ? "bg-indigo-500/20 border-indigo-400/40 text-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}
            >
              {Math.round(t * 100)}%
            </button>
          ))}
        </div>
        <button className="btn-primary" onClick={playing ? stop : start}>
          {playing ? "⏸ Stop" : completed ? "▶ Play again" : "▶ Guided play"}
        </button>
      </div>

      <div className="text-center text-[11px] text-white/40 mt-3">
        {completed ? "✓ guided · ready for your own attempt" : "Play all the way through to continue"}
      </div>
    </div>
  );
}
