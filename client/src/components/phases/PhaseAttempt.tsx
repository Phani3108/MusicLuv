import { PracticeStudio } from "../PracticeStudio";

/**
 * Delegates to the existing PracticeStudio which already implements mic capture,
 * grading, and the timeline / pitch meter. When the grade lands, the runner
 * auto-engages this phase and advances to Feedback.
 */
export function PhaseAttempt() {
  return (
    <div className="-mx-5 md:-mx-7 -my-6">
      <PracticeStudio />
    </div>
  );
}
