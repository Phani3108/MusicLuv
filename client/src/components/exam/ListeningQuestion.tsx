import { useRef, useState } from "react";
import type { ExamQuestion } from "@catalogs/types";
import { playPianoNote, unlockAudio, ensurePianoReady } from "@/audio/pianoSampler";

export function ListeningQuestion({
  q, chosenIndex, revealed, onPick,
}: {
  q: Extract<ExamQuestion, { type: "listening" }>;
  chosenIndex: number | null;
  revealed: boolean;
  onPick: (i: number) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const play = async () => {
    if (playing) return;
    await unlockAudio();
    await ensurePianoReady();
    setPlaying(true);
    const notes = q.audioRef.notes;
    timeoutsRef.current = notes.map((n) =>
      setTimeout(() => playPianoNote(n.pitch, n.durationMs / 1000), n.startMs)
    );
    const total = Math.max(...notes.map((n) => n.startMs + n.durationMs), 500);
    timeoutsRef.current.push(setTimeout(() => {
      setPlaying(false);
      setPlayed(true);
    }, total + 200));
  };

  return (
    <div>
      <div className="font-semibold text-base mb-4">{q.prompt}</div>

      <button
        onClick={play}
        disabled={playing}
        className="panel w-full p-4 flex items-center gap-3 hover:bg-white/5 mb-4 border-indigo-400/30"
      >
        <span className={`w-10 h-10 rounded-full flex items-center justify-center text-lg
          ${playing ? "bg-indigo-500 text-white animate-pulse-soft" : "bg-indigo-400/20 text-indigo-200"}`}>
          {playing ? "▶" : played ? "↺" : "▶"}
        </span>
        <div className="flex-1 text-left">
          <div className="text-sm font-semibold">
            {playing ? "Playing…" : played ? "Tap to replay" : "Tap to listen"}
          </div>
          <div className="text-[11px] text-white/50">{q.audioRef.notes.length} notes</div>
        </div>
      </button>

      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const chosen = chosenIndex === i;
          const isCorrect = i === q.correctIndex;
          return (
            <button
              key={i}
              disabled={revealed || !played}
              onClick={() => onPick(i)}
              className={`w-full text-left p-3 rounded-xl border text-sm transition-colors
                ${!played ? "bg-white/5 border-white/10 text-white/40"
                  : revealed
                    ? (isCorrect
                        ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-100"
                        : chosen
                          ? "bg-rose-500/15 border-rose-400/40 text-rose-100"
                          : "bg-white/5 border-white/10 text-white/50 opacity-70")
                    : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"}
              `}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {!played && <div className="text-center text-[11px] text-white/40 mt-3">Listen first, then pick.</div>}
      {revealed && (
        <div className="text-xs text-white/65 mt-4 p-3 rounded-lg bg-white/5 leading-relaxed">
          {q.explanation}
        </div>
      )}
    </div>
  );
}
