import { useAtomValue } from "jotai";
import { playheadMsAtom, practiceStatusAtom } from "@/atoms/practice";
import type { Exercise } from "@catalogs/types";
import { noteToMidi } from "@/lib/notes";


export function TimelineRibbon({ exercise }: { exercise: Exercise }) {
  const playhead = useAtomValue(playheadMsAtom);
  const status = useAtomValue(practiceStatusAtom);
  const notes = exercise.targetPattern.notes ?? [];
  const onsets = exercise.targetPattern.onsets ?? [];

  const maxMs = notes.length
    ? Math.max(...notes.map((n) => n.startMs + n.durationMs))
    : (onsets[onsets.length - 1] ?? 4000) + 500;

  const pxPerMs = 0.18; // 180 px/sec — comfortable reading speed
  const width = maxMs * pxPerMs;

  // Vertical span follows the exercise's own register (any octave, flats too).
  const midis = notes.map((n) => noteToMidi(n.pitch)).filter((m): m is number => m != null);
  const lowNote = (midis.length ? Math.min(...midis) : 60) - 2;
  const highNote = Math.max((midis.length ? Math.max(...midis) : 72) + 2, lowNote + 12);

  return (
    <div className="panel p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs uppercase tracking-widest text-white/50">
          Timeline · {exercise.title}
        </div>
        <div className="text-[11px] font-mono text-white/40">
          {exercise.tempo.bpm} bpm · {exercise.tempo.meter[0]}/{exercise.tempo.meter[1]}
        </div>
      </div>

      <div className="relative h-36 rounded-2xl bg-black/40 overflow-hidden border border-white/5">
        {/* Staff-style horizontal lines */}
        {[0.25, 0.4, 0.55, 0.7, 0.85].map((y) => (
          <div key={y} className="absolute left-0 right-0 h-px bg-white/10" style={{ top: `${y * 100}%` }} />
        ))}

        {/* Scrolling content — translates left as playhead moves */}
        <div
          className="absolute top-0 left-0 h-full transition-transform duration-75 ease-linear"
          style={{
            width: `${width + 200}px`,
            transform: `translateX(${-playhead * pxPerMs + 120}px)`,
          }}
        >
          {notes.map((n, i) => {
            const semi = noteToMidi(n.pitch) ?? lowNote;
            const yPct = 1 - (semi - lowNote) / (highNote - lowNote);
            const left = n.startMs * pxPerMs;
            const w = n.durationMs * pxPerMs;
            const passed = status === "recording" && playhead > n.startMs + n.durationMs;
            const active = status === "recording" && playhead >= n.startMs && playhead < n.startMs + n.durationMs;
            return (
              <div
                key={i}
                className={`absolute rounded-full transition-all
                  ${passed ? "bg-emerald-400/70" : active ? "bg-amber-400 shadow-glow animate-pulse-soft" : "bg-indigo-300/70"}`}
                style={{
                  left: `${left}px`, width: `${Math.max(w, 12)}px`, height: "10px",
                  top: `calc(${yPct * 100}% - 5px)`,
                }}
                title={`${n.pitch} · ${n.startMs}ms`}
              >
                <span className="absolute -top-4 left-0 text-[9px] font-mono text-white/60 whitespace-nowrap">
                  {n.pitch}
                </span>
              </div>
            );
          })}

          {onsets.map((ms, i) => (
            <div
              key={`o${i}`}
              className="absolute rounded-full bg-amber-300/70"
              style={{ left: `${ms * pxPerMs}px`, width: "10px", height: "10px", top: "calc(50% - 5px)" }}
            />
          ))}

          {/* Bar lines every second */}
          {Array.from({ length: Math.ceil(maxMs / 1000) + 1 }).map((_, i) => (
            <div
              key={`b${i}`}
              className="absolute top-1 bottom-1 w-px bg-white/10"
              style={{ left: `${i * 1000 * pxPerMs}px` }}
            />
          ))}
        </div>

        {/* Fixed playhead (at x=120 inside the scroll container, so the screen position is left:120px) */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-glow" style={{ left: "120px" }}>
          <div className="absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white shadow-glow" />
        </div>
      </div>
    </div>
  );
}
