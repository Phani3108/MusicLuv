import type { Lesson } from "@catalogs/types";
import { examForLesson } from "@catalogs/examCatalog";
import { ExamEngine } from "../ExamEngine";

export function PhaseMastery({ lesson, onEngage }: { lesson: Lesson; onEngage: () => void }) {
  const exam = examForLesson(lesson.id);

  if (!exam) {
    return (
      <div className="max-w-xl mx-auto panel p-6 text-center">
        <div className="text-3xl mb-2">📝</div>
        <div className="font-semibold text-sm mb-1">No mastery quiz yet for this lesson</div>
        <div className="text-xs text-white/60 max-w-sm mx-auto">
          This lesson's quiz is being authored — skipping this phase for now.
        </div>
        <button className="btn-primary mt-4 text-sm" onClick={onEngage}>
          Continue anyway →
        </button>
      </div>
    );
  }

  return (
    <ExamEngine
      exam={exam}
      onComplete={(passed) => {
        if (passed) onEngage();
      }}
    />
  );
}
