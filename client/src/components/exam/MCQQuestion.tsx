import type { ExamQuestion } from "@catalogs/types";

export function MCQQuestion({
  q, chosenIndex, revealed, onPick,
}: {
  q: Extract<ExamQuestion, { type: "mcq" }>;
  chosenIndex: number | null;
  revealed: boolean;
  onPick: (i: number) => void;
}) {
  return (
    <div>
      <div className="font-semibold text-base mb-4">{q.prompt}</div>
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const chosen = chosenIndex === i;
          const isCorrect = i === q.correctIndex;
          return (
            <button
              key={i}
              disabled={revealed}
              onClick={() => onPick(i)}
              className={`w-full text-left p-3 rounded-xl border text-sm transition-colors
                ${revealed
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
      {revealed && (
        <div className="text-xs text-white/65 mt-4 p-3 rounded-lg bg-white/5 leading-relaxed">
          {q.explanation}
        </div>
      )}
    </div>
  );
}
