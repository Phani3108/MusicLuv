import { useState } from "react";
import type { Lesson } from "@catalogs/types";

/**
 * Placeholder mastery phase — 3 quick MCQ questions. Real exam engine with all
 * 6 question types lands in a later wedge (examCatalog + ExamEngine).
 */
const DUMMY_QS: Array<{ q: string; options: string[]; correct: number; explain: string }> = [
  {
    q: "Which key is Middle C?",
    options: [
      "The white key to the right of the 3-black-key group",
      "The white key to the left of the 2-black-key group near the middle of the keyboard",
      "The very first white key on the left",
      "Any black key",
    ],
    correct: 1,
    explain: "Middle C sits to the left of the two-black-key group closest to the piano's name.",
  },
  {
    q: "How many beats does a half note get in 4/4 time?",
    options: ["1", "2", "4", "Half a beat"],
    correct: 1,
    explain: "A half note equals two quarter notes = 2 beats.",
  },
  {
    q: "What does proper hand shape look like?",
    options: [
      "Flat fingers, straight wrist",
      "Curved fingers as if gently holding a peach",
      "Tense fingers, locked knuckles",
      "It doesn't matter",
    ],
    correct: 1,
    explain: "Curved, relaxed fingers protect your tendons and give you control.",
  },
];

export function PhaseMastery({ lesson, onEngage }: { lesson: Lesson; onEngage: () => void }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false]);

  const q = DUMMY_QS[idx];
  const total = DUMMY_QS.length;
  const correctCount = answers.filter((a, i) => a === DUMMY_QS[i].correct).length;
  const allAnswered = answers.every((a) => a !== null);
  const passed = allAnswered && correctCount / total >= 0.67;

  const pick = (i: number) => {
    const next = [...answers];
    next[idx] = i;
    setAnswers(next);
    const nextR = [...revealed];
    nextR[idx] = true;
    setRevealed(nextR);
  };

  const advance = () => {
    if (idx < total - 1) setIdx(idx + 1);
    else if (passed) onEngage();
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-colors
              ${answers[i] === null ? "bg-white/10"
                : answers[i] === DUMMY_QS[i].correct ? "bg-emerald-400" : "bg-rose-400"}
            `}
          />
        ))}
      </div>

      <div className="panel p-5 bg-white/[0.02]">
        <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">
          Question {idx + 1} of {total}
        </div>
        <div className="font-semibold text-base mb-4">{q.q}</div>

        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const chosen = answers[idx] === i;
            const isCorrect = i === q.correct;
            const show = revealed[idx];
            return (
              <button
                key={i}
                disabled={show}
                onClick={() => pick(i)}
                className={`w-full text-left p-3 rounded-xl border text-sm transition-colors
                  ${show
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

        {revealed[idx] && (
          <div className="text-xs text-white/65 mt-4 p-3 rounded-lg bg-white/5 leading-relaxed">
            {q.explain}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-white/50">
          {allAnswered ? `Score: ${correctCount}/${total}` : "Answer to see the explanation"}
        </div>
        <button
          className="btn-primary text-sm"
          onClick={advance}
          disabled={!revealed[idx]}
        >
          {idx < total - 1 ? "Next question →" : passed ? "Finish lesson 🏅" : "Not quite — retry"}
        </button>
      </div>

      {allAnswered && !passed && (
        <div className="text-center text-amber-300/80 text-xs mt-3">
          Need 2 of 3 right to pass. Scroll back and re-read the Teach section.
        </div>
      )}
      {allAnswered && passed && (
        <div className="text-center text-emerald-300/80 text-xs mt-3">
          ✓ Mastery check passed for <span className="font-mono">{lesson.id}</span>
        </div>
      )}
    </div>
  );
}
