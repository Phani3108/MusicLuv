import { useState } from "react";
import type { Exam } from "@catalogs/types";
import { MCQQuestion } from "./exam/MCQQuestion";
import { ListeningQuestion } from "./exam/ListeningQuestion";
import { StubbedQuestion } from "./exam/StubbedQuestion";

export function ExamEngine({ exam, onComplete }: { exam: Exam; onComplete: (passed: boolean, score: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(exam.questions.map(() => null));
  const [revealed, setRevealed] = useState<boolean[]>(exam.questions.map(() => false));

  const q = exam.questions[idx];
  const total = exam.questions.length;

  const correctCount: number = answers.reduce<number>((acc, a, i) => {
    const qi = exam.questions[i];
    if (!("correctIndex" in qi)) return acc + (revealed[i] ? 1 : 0); // stubbed types — treat as passed once engaged
    return a === qi.correctIndex ? acc + 1 : acc;
  }, 0);

  const allAnswered = answers.every((a, i) => a !== null || revealed[i]);
  const scoreFraction = total > 0 ? correctCount / total : 0;
  const passed = allAnswered && scoreFraction >= exam.passThreshold;

  const pick = (i: number) => {
    const next = [...answers];
    next[idx] = i;
    setAnswers(next);
    const nextR = [...revealed];
    nextR[idx] = true;
    setRevealed(nextR);
  };

  const passStub = () => {
    const next = [...answers];
    next[idx] = 0;
    setAnswers(next);
    const nextR = [...revealed];
    nextR[idx] = true;
    setRevealed(nextR);
  };

  const canAdvance = revealed[idx];

  const advance = () => {
    if (idx < total - 1) setIdx(idx + 1);
    else onComplete(passed, scoreFraction);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[11px] uppercase tracking-widest text-white/40">
          {exam.scope === "lesson" ? "Lesson quiz" : exam.scope === "level" ? "Level exam" : "Grade certificate"} · Q{idx + 1}/{total}
        </div>
        <div className="text-[11px] font-mono text-white/50">
          {correctCount}/{total} right · pass at {Math.round(exam.passThreshold * 100)}%
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {Array.from({ length: total }).map((_, i) => {
          const isCurrent = i === idx;
          const answered = revealed[i];
          const qi = exam.questions[i];
          const correct = "correctIndex" in qi ? answers[i] === qi.correctIndex : answered;
          return (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full transition-colors
                ${!answered ? (isCurrent ? "bg-indigo-400/60" : "bg-white/10")
                  : correct ? "bg-emerald-400" : "bg-rose-400"}`}
            />
          );
        })}
      </div>

      <div className="panel p-5 bg-white/[0.02]">
        {q.type === "mcq" && (
          <MCQQuestion q={q} chosenIndex={answers[idx]} revealed={revealed[idx]} onPick={pick} />
        )}
        {q.type === "listening" && (
          <ListeningQuestion q={q} chosenIndex={answers[idx]} revealed={revealed[idx]} onPick={pick} />
        )}
        {(q.type === "notation" || q.type === "tap_rhythm" || q.type === "free_text" || q.type === "practical") && (
          <StubbedQuestion type={q.type} prompt={q.prompt} onPass={passStub} />
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-white/50">
          {allAnswered && idx === total - 1
            ? (passed ? `✓ ${Math.round(scoreFraction * 100)}% — passed`
                     : `${Math.round(scoreFraction * 100)}% — pass threshold ${Math.round(exam.passThreshold * 100)}%`)
            : ""}
        </div>
        <button className="btn-primary text-sm" onClick={advance} disabled={!canAdvance}>
          {idx < total - 1 ? "Next question →" : passed ? "Finish exam 🏅" : "Review answers"}
        </button>
      </div>
    </div>
  );
}
