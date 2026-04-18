/**
 * Placeholder UI for question types not yet fully implemented.
 * Gives a Next button that always records the chosen-correct answer so the
 * exam flow can be fully test-run end-to-end. Real UIs land in later wedges.
 */
export function StubbedQuestion({
  type, prompt, onPass,
}: {
  type: "notation" | "tap_rhythm" | "free_text" | "practical";
  prompt: string;
  onPass: () => void;
}) {
  const label = {
    notation: "🎼 Notation (coming soon)",
    tap_rhythm: "🥁 Tap rhythm (coming soon)",
    free_text: "✍️ Free-text (AI-graded — coming soon)",
    practical: "🎙️ Practical spot-check (coming soon)",
  }[type];

  return (
    <div>
      <div className="font-semibold text-base mb-4">{prompt}</div>
      <div className="panel p-6 text-center bg-amber-400/5 border-amber-400/20">
        <div className="text-3xl mb-2">🚧</div>
        <div className="font-semibold text-sm mb-1">{label}</div>
        <div className="text-xs text-white/60 max-w-sm mx-auto">
          The full UI for this question type is landing in a later wedge. For now, click below to record a pass and keep the exam flow going.
        </div>
        <button className="btn-primary mt-4 text-sm" onClick={onPass}>
          Mark as passed
        </button>
      </div>
    </div>
  );
}
