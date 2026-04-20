import { useAtom } from "jotai";
import { teacherDashboardPanelAtom } from "@/atoms/community";
import { authUserAtom } from "@/atoms/billing";
import { SidePanel } from "./SidePanel";
import { AsyncBoundary, LoadingSpinner, EmptyState, ErrorState } from "./common/AsyncBoundary";
import { useAsync } from "@/hooks/useAsync";
import { fetchTeacherAssignments } from "@/lib/communityApi";
import { MUSICLUV_SERVER_URL, getDeviceUserId } from "@/lib/api";
import { getLesson } from "@catalogs/lessonCatalog";
import type { TeacherAssignment } from "@catalogs/communityTypes";

/**
 * Teacher dashboard — list your students' assignments + statuses.
 * Reads /api/v1/teacher/:teacherId/assignments via useAsync.
 *
 * MVP scope: list + status. Assignment creation + grading UI are explicitly
 * deferred to post-monetization phase 6.5 (stub CTA surfaces the roadmap).
 */
export function TeacherDashboardPanel() {
  const [open, setOpen] = useAtom(teacherDashboardPanelAtom);
  const [authUser] = useAtom(authUserAtom);
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
      subtitle="Your students + assignments"
      open={open}
      onClose={() => setOpen(false)}
      width="w-full md:w-[32rem]"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <SummaryCard label="Students" value={students.size} />
          <SummaryCard label="Assigned" value={assigned} />
          <SummaryCard label="Reviewed" value={reviewed} />
        </div>

        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Active assignments</div>
          <AsyncBoundary
            status={open ? status : "idle"}
            loading={<LoadingSpinner label="Loading assignments…" />}
            empty={
              <EmptyState
                glyph="🎓"
                title="No students yet"
                body="Assign a lesson to a learner once you've connected with one, and the assignment will appear here."
              />
            }
            error={<ErrorState message={error ?? "Unable to load assignments."} onRetry={refetch} />}
          >
            <div className="space-y-2">
              {items.map((a) => (
                <AssignmentRow key={a.id} assignment={a} />
              ))}
            </div>
          </AsyncBoundary>
        </section>

        <div className="rounded-xl p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-400/20">
          <div className="text-[10px] uppercase tracking-widest text-emerald-300 mb-1">Coming soon</div>
          <div className="text-sm font-semibold mb-1">Assignment builder + grading queue</div>
          <div className="text-xs text-white/60">
            Full lesson-assign flow, bulk ops, and rubric-based grading ship after the launch promo window.
            For now this view is read-only.
          </div>
        </div>
      </div>
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

function AssignmentRow({ assignment }: { assignment: TeacherAssignment }) {
  const lesson = getLesson(assignment.lessonId);
  const statusColor: Record<typeof assignment.status, string> = {
    assigned: "text-white/50",
    in_progress: "text-indigo-300",
    submitted: "text-amber-300",
    reviewed: "text-emerald-300",
  };
  return (
    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-medium">{assignment.studentId}</div>
        <span className={`text-[10px] uppercase tracking-widest ${statusColor[assignment.status]}`}>
          {assignment.status.replace("_", " ")}
        </span>
      </div>
      <div className="text-xs text-white/60">{lesson?.title ?? assignment.lessonId}</div>
      {assignment.dueAt && (
        <div className="text-[10px] text-white/40 mt-1">
          Due {new Date(assignment.dueAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
