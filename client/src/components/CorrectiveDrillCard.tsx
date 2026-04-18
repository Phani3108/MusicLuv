import { useRef, useState } from "react";
import { useAtomValue } from "jotai";
import { currentExerciseIdAtom, lastGradeAtom } from "@/atoms/practice";
import { getExercise } from "@catalogs/exerciseCatalog";
import { generateDrill } from "@/lib/correctiveDrill";
import { playPianoNote, unlockAudio, ensurePianoReady } from "@/audio/pianoSampler";

const DIM_GLYPH: Record<string, string> = {
  pitch: "🎯", rhythm: "🥁", tone: "🎨", dynamics: "📣", consistency: "🧭",
};

export function CorrectiveDrillCard() {
  const exerciseId = useAtomValue(currentExerciseIdAtom);
  const grade = useAtomValue(lastGradeAtom);
  const exercise = exerciseId ? getExercise(exerciseId) : null;
  const drill = exercise && grade ? generateDrill(exercise, grade) : null;

  const [playing, setPlaying] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  if (!drill) {
    return (
      <div className="panel p-4 bg-emerald-500/5 border-emerald-400/20 text-center">
        <div className="text-2xl mb-1">✨</div>
        <div className="text-sm font-semibold">No drill needed — you're already close to perfect.</div>
      </div>
    );
  }

  const play = async () => {
    if (playing) return;
    await unlockAudio();
    await ensurePianoReady();
    setPlaying(true);
    const notes = drill.exercise.targetPattern.notes ?? [];
    timeoutsRef.current = notes.map((n) =>
      setTimeout(() => playPianoNote(n.pitch, n.durationMs / 1000), n.startMs)
    );
    const total = Math.max(...notes.map((n) => n.startMs + n.durationMs), 500);
    timeoutsRef.current.push(setTimeout(() => setPlaying(false), total + 200));
  };

  return (
    <div className="panel p-5 bg-gradient-to-br from-indigo-500/10 to-violet-500/5 border-indigo-400/20">
      <div className="flex items-start gap-3 mb-3">
        <div className="text-3xl">{DIM_GLYPH[drill.weakestDim] ?? "🎯"}</div>
        <div className="flex-1">
          <div className="text-[11px] uppercase tracking-widest text-indigo-200/80 mb-1">
            Targeted drill · {drill.weakestDim}
          </div>
          <div className="font-semibold text-base">{drill.title}</div>
          <div className="text-xs text-white/60 leading-relaxed mt-1">{drill.blurb}</div>
        </div>
      </div>

      <div className="panel bg-black/20 p-3 mb-3">
        <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-2">
          <span>{drill.exercise.tempo.bpm} bpm · {Math.round(drill.tempoScale * 100)}% speed</span>
          <span>{drill.exercise.targetPattern.notes?.length ?? 0} notes</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(drill.exercise.targetPattern.notes ?? []).map((n, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-md bg-indigo-400/20 border border-indigo-400/30 text-xs font-mono text-indigo-100"
            >
              {n.pitch}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button className="btn-ghost text-sm flex-1" onClick={play} disabled={playing}>
          {playing ? "⏸ Playing" : "▶ Preview drill"}
        </button>
        <button
          className="btn-primary text-sm flex-1"
          onClick={() => {
            // Future: route this into the practice studio as the current exercise.
            // For now, show a confirmation — the full "load drill into studio" flow
            // is wired when we add drill-as-exercise routing.
            alert("Drill queued — full 'load into studio' routing lands with the offline-queue wedge.");
          }}
        >
          Try this drill →
        </button>
      </div>
    </div>
  );
}
