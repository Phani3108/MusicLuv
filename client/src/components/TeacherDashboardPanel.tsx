import { useAtom } from "jotai";
import { useState } from "react";
import { teacherDashboardPanelAtom } from "@/atoms/community";
import { authUserAtom } from "@/atoms/billing";
import { SidePanel } from "./SidePanel";
import { AsyncBoundary, LoadingSpinner, EmptyState, ErrorState } from "./common/AsyncBoundary";
import { useAsync } from "@/hooks/useAsync";
import { fetchTeacherAssignments, createAssignment } from "@/lib/communityApi";
import { MUSICLUV_SERVER_URL, getDeviceUserId, serverAuthHeaders } from "@/lib/api";
import { LESSONS } from "@catalogs/lessonCatalog";
import { getLesson, listLessonsForInstrument } from "@catalogs/lessonCatalog";
import { listInstruments } from "@catalogs/instrumentCatalog";
import type { TeacherAssignment } from "@catalogs/communityTypes";

/**
 * Teacher dashboard — full flow.
 *
 *   1. Summary cards: students + assigned + reviewed counts
 *   2. Assignments list with inline status pills; tap to expand into
 *      a grading panel (reviewer notes + mark reviewed)
 *   3. "New assignment" dialog: student email/ID + instrument + lesson
 *      picker + optional due date → POST /api/v1/teacher/assignments
 *   4. Grading an assignment → PATCH /api/v1/teacher/assignments/:id
 *      sets status: "reviewed" + attaches notes
 */
export function TeacherDashboardPanel() {
  const [open, setOpen] = useAtom(teacherDashboardPanelAtom);
  const [authUser] = useAtom(authUserAtom);
  const [showBuilder, setShowBuilder] = useState(false);
  const [grading, setGrading] = useState<TeacherAssignment | null>(null);
  const teacherId = authUser?.id ?? getDeviceUserId();

  const { status, data, error, refetch } = useAsync<TeacherAssignment[]>(
    async () => {
      if (!MUSICLUV_SERVER_URL) throw new Error("Server not configured");
      return fetchTeacherAssignments(teacherId);
    },
    [open, teacherId],
    { isEmpty: (list) => list.length === 0 },
  );

  const items = data ?? [];
  const students = new Set(items.map((a) => a.studentId));
  const assigned = items.filter((a) => a.status === "assigned").length;
  const reviewed = items.filter((a) => a.status === "reviewed").length;

  return (
    <SidePanel
      title="Teacher dashboard"
      subtitle="Your students · assignments · grading"
      open={open}
      onClose={() => setOpen(false)}
      width="w-full md:w-[34rem]"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <SummaryCard label="Students" value={students.size} />
          <SummaryCard label="Assigned" value={assigned} />
          <SummaryCard label="Reviewed" value={reviewed} />
        </div>

        <section>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] uppercase tracking-widest text-white/40">
              Active assignments
            </div>
            <button
              onClick={() => setShowBuilder(true)}
              className="text-[11px] font-semibold px-3 py-1 rounded-md bg-gradient-to-r from-emerald-500 to-teal-500"
            >
              + Assign lesson
            </button>
          </div>

          <AsyncBoundary
            status={open ? status : "idle"}
            loading={<LoadingSpinner label="Loading assignments…" />}
            empty={
              <EmptyState
                glyph="🎓"
                title="No assignments yet"
                body="Assign your first lesson to a student. They'll see it in their Quests panel next time they open the app."
                cta={{ label: "+ Assign lesson", onClick: () => setShowBuilder(true) }}
              />
            }
            error={<ErrorState message={error ?? "Unable to load assignments."} onRetry={refetch} />}
          >
            <div className="space-y-2">
              {items.map((a) => (
                <AssignmentRow key={a.id} assignment={a} onGrade={() => setGrading(a)} />
              ))}
            </div>
          </AsyncBoundary>
        </section>
      </div>

      {showBuilder && (
        <AssignmentBuilder
          teacherId={teacherId}
          onClose={() => setShowBuilder(false)}
          onCreated={() => { setShowBuilder(false); void refetch(); }}
        />
      )}

      {grading && (
        <GradingDialog
          assignment={grading}
          onClose={() => setGrading(null)}
          onGraded={() => { setGrading(null); void refetch(); }}
        />
      )}
    </SidePanel>
  );
}

function SummaryCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
      <div className="font-mono text-lg font-semibold">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/40">{label}</div>
    </div>
  );
}

function AssignmentRow({ assignment, onGrade }: { assignment: TeacherAssignment; onGrade: () => void }) {
  const lesson = getLesson(assignment.lessonId);
  const statusColor: Record<typeof assignment.status, string> = {
    assigned: "text-white/50",
    in_progress: "text-indigo-300",
    submitted: "text-amber-300",
    reviewed: "text-emerald-300",
  };
  const canGrade = assignment.status === "submitted" || assignment.status === "in_progress";
  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-medium">{assignment.studentId}</div>
        <span className={`text-[10px] uppercase tracking-widest ${statusColor[assignment.status]}`}>
          {assignment.status.replace("_", " ")}
        </span>
      </div>
      <div className="text-xs text-white/60 mb-2">{lesson?.title ?? assignment.lessonId}</div>
      <div className="flex items-center justify-between">
        <div className="text-[10px] text-white/40">
          {assignment.dueAt ? `Due ${new Date(assignment.dueAt).toLocaleDateString()}` : "No due date"}
        </div>
        {canGrade && (
          <button
            onClick={onGrade}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-indigo-500/20 border border-indigo-400/40 hover:bg-indigo-500/30"
          >
            Review →
          </button>
        )}
      </div>
    </div>
  );
}

function AssignmentBuilder({
  teacherId,
  onClose,
  onCreated,
}: {
  teacherId: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [studentId, setStudentId] = useState("");
  const [instrumentId, setInstrumentId] = useState("piano");
  const [lessonId, setLessonId] = useState<string>("");
  const [dueAt, setDueAt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const instruments = listInstruments();
  const lessons = listLessonsForInstrument(instrumentId);

  const submit = async () => {
    if (!studentId.trim() || !lessonId) {
      setErr("Student ID and lesson are both required");
      return;
    }
    setSubmitting(true);
    setErr(null);
    try {
      await createAssignment({
        teacherId,
        studentId: studentId.trim(),
        lessonId,
        status: "assigned",
        dueAt: dueAt || undefined,
      });
      onCreated();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="panel max-w-md w-full p-0 overflow-hidden bg-ink-800" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h3 className="display text-lg font-semibold">New assignment</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white/70 text-lg">
            ×
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40">Student ID or email</label>
            <input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="student@example.com or device id"
              className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40">Instrument</label>
            <select
              value={instrumentId}
              onChange={(e) => { setInstrumentId(e.target.value); setLessonId(""); }}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
            >
              {instruments.map((i) => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40">Lesson</label>
            <select
              value={lessonId}
              onChange={(e) => setLessonId(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
            >
              <option value="">— pick a lesson —</option>
              {lessons.map((l) => (
                <option key={l.id} value={l.id}>L{l.level} · {l.title}</option>
              ))}
            </select>
            <div className="text-[10px] text-white/40 mt-1">{lessons.length} lessons available</div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40">Due date (optional)</label>
            <input
              type="date"
              value={dueAt}
              onChange={(e) => setDueAt(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
            />
          </div>

          {err && <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-md p-2">{err}</div>}

          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm">Cancel</button>
            <button
              onClick={submit}
              disabled={submitting}
              className="flex-1 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-semibold disabled:opacity-50"
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GradingDialog({
  assignment,
  onClose,
  onGraded,
}: {
  assignment: TeacherAssignment;
  onClose: () => void;
  onGraded: () => void;
}) {
  const lesson = LESSONS[assignment.lessonId];
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const markReviewed = async (status: "reviewed") => {
    setSubmitting(true);
    setErr(null);
    try {
      const res = await fetch(
        `${MUSICLUV_SERVER_URL}/api/v1/teacher/assignments/${assignment.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...serverAuthHeaders() },
          body: JSON.stringify({ status, notes }),
        },
      );
      const body = await res.json();
      if (!res.ok || !body.ok) throw new Error(body.error || `HTTP ${res.status}`);
      onGraded();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="panel max-w-md w-full p-0 overflow-hidden bg-ink-800" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-indigo-300">Grade submission</div>
            <h3 className="display text-lg font-semibold mt-0.5">{assignment.studentId}</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white/70 text-lg">
            ×
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="rounded-lg bg-white/[0.02] border border-white/5 p-3">
            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Lesson</div>
            <div className="text-sm font-medium">{lesson?.title ?? assignment.lessonId}</div>
            <div className="text-[11px] text-white/60">
              L{lesson?.level ?? "?"} · {lesson?.tier ?? "?"}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40">
              Reviewer notes (shown to student)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              placeholder="What went well? What to focus on next? Be specific."
              className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm resize-none"
            />
          </div>

          {err && <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-md p-2">{err}</div>}

          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm">
              Cancel
            </button>
            <button
              onClick={() => markReviewed("reviewed")}
              disabled={submitting}
              className="flex-1 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-semibold disabled:opacity-50"
            >
              Mark reviewed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
