import { useAtom } from "jotai";
import { teacherDashboardPanelAtom, teacherAssignmentsAtom } from "@/atoms/community";
import { SidePanel } from "./SidePanel";
import { getLesson } from "@catalogs/lessonCatalog";
import type { TeacherAssignment } from "@catalogs/communityTypes";

/**
 * Teacher dashboard — list your students, see their progress, assign lessons.
 * MVP scope: list assignments + status. Production: student-selector,
 * bulk lesson assign, progress charts, send feedback notes.
 */
export function TeacherDashboardPanel() {
  const [open, setOpen] = useAtom(teacherDashboardPanelAtom);
  const [assignments] = useAtom(teacherAssignmentsAtom);
  const items = assignments.length > 0 ? assignments : MOCK_ASSIGNMENTS;

  return (
    <SidePanel title="Teacher dashboard" subtitle="Your students + assignments" open={open} onClose={() => setOpen(false)} width="w-full md:w-[32rem]">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <SummaryCard label="Students" value={new Set(items.map((a) => a.studentId)).size} />
          <SummaryCard label="Assigned" value={items.filter((a) => a.status === "assigned").length} />
          <SummaryCard label="Reviewed" value={items.filter((a) => a.status === "reviewed").length} />
        </div>

        <section>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Active assignments</div>
          <div className="space-y-2">
            {items.map((a) => <AssignmentRow key={a.id} assignment={a} />)}
          </div>
        </section>

        <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 font-semibold text-sm">
          + Assign lesson to a student
        </button>
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
        <span className={`text-[10px] uppercase tracking-widest ${statusColor[assignment.status]}`}>{assignment.status.replace("_", " ")}</span>
      </div>
      <div className="text-xs text-white/60">{lesson?.title ?? assignment.lessonId}</div>
      {assignment.dueAt && <div className="text-[10px] text-white/40 mt-1">Due {new Date(assignment.dueAt).toLocaleDateString()}</div>}
    </div>
  );
}

const MOCK_ASSIGNMENTS: TeacherAssignment[] = [
  { id: "a1", teacherId: "me", studentId: "priya_m", lessonId: "sitar_l4_01_yaman_alap", status: "submitted", createdAt: new Date().toISOString(), dueAt: new Date(Date.now() + 3 * 86400e3).toISOString() },
  { id: "a2", teacherId: "me", studentId: "marcus_g", lessonId: "guitar_l2_01_em_chord", status: "in_progress", createdAt: new Date().toISOString() },
  { id: "a3", teacherId: "me", studentId: "sofia_v", lessonId: "vocals_l7_01_aria_advanced", status: "reviewed", createdAt: new Date().toISOString() },
];
