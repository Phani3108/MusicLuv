import { useSetAtom } from "jotai";
import { expertNotesForLesson, masterclassesForLesson } from "@catalogs/expertCatalog";
import { expertLibraryPanelAtom, focusedExpertAtom, focusedMasterclassAtom } from "@/atoms/experts";

/**
 * Inline expert annotations for a lesson phase. Renders any ExpertNotes
 * attached to the lesson + a compact "Watch expert masterclass" CTA
 * when the lesson has linked masterclasses. Consumed by PhaseTeach,
 * PhaseDemo, PhaseDissect.
 *
 * Collapses cleanly when no notes exist — returns null so the phase
 * layout doesn't shift.
 */
export function ExpertNotesInline({
  lessonId,
  phase,
}: {
  lessonId: string;
  phase?: "concept" | "teach" | "demo" | "dissect" | "virtual_try" | "guided" | "attempt" | "feedback" | "mastery";
}) {
  const setExpertLibrary = useSetAtom(expertLibraryPanelAtom);
  const setFocusedExpert = useSetAtom(focusedExpertAtom);
  const setFocusedMasterclass = useSetAtom(focusedMasterclassAtom);

  const notes = expertNotesForLesson(lessonId, phase);
  const masterclasses = masterclassesForLesson(lessonId);

  if (notes.length === 0 && masterclasses.length === 0) return null;

  return (
    <div className="space-y-2 my-4">
      {notes.map(({ expert, note }) => (
        <article
          key={note.id}
          className="panel p-3 bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-400/20"
        >
          <div className="flex items-start gap-3">
            <button
              onClick={() => {
                setFocusedExpert(expert.id);
                setExpertLibrary(true);
              }}
              className="text-2xl shrink-0"
              title={`View ${expert.name}'s profile`}
            >
              {expert.photoGlyph}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-widest text-amber-300">
                  Expert note
                </span>
                <button
                  onClick={() => { setFocusedExpert(expert.id); setExpertLibrary(true); }}
                  className="text-[11px] font-semibold text-white/85 hover:text-white"
                >
                  {expert.name}
                </button>
                {expert.verified && (
                  <span className="text-[10px] text-emerald-400" title="Verified expert">✓</span>
                )}
              </div>
              <div className="text-sm font-semibold mb-1">{note.heading}</div>
              <div className="text-xs text-white/75 leading-relaxed whitespace-pre-line">
                {note.body}
              </div>
            </div>
          </div>
        </article>
      ))}

      {masterclasses.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {masterclasses.map(({ expert, masterclass }) => (
            <button
              key={masterclass.id}
              onClick={() => setFocusedMasterclass(masterclass.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] bg-indigo-500/10 border border-indigo-400/30 text-indigo-100 hover:bg-indigo-500/20"
              title={`${expert.name} · ${masterclass.durationMin} min`}
            >
              <span>🎬</span>
              <span className="font-semibold">{masterclass.title}</span>
              <span className="opacity-60">· {expert.name.split(" ").slice(-1)[0]}</span>
              <span className="opacity-40">{masterclass.durationMin}m</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
