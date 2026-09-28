import type { GradeIssue, GradeResult } from "@/atoms/practice";

const DIM_LABELS: Record<string, string> = {
  pitch: "Pitch", rhythm: "Rhythm", tone: "Tone", dynamics: "Dynamics", consistency: "Consistency",
};

const at = (ms: number) => `${(ms / 1000).toFixed(1)}s`;

/** One line per issue, in plain words. */
export function describeIssue(iss: GradeIssue): string | null {
  switch (iss.kind) {
    case "missed":
      return `${at(iss.at)} — ${iss.expected ?? "a note"} wasn't heard`;
    case "extra":
      return `${at(iss.at)} — extra ${iss.detected ?? "note"} not in the exercise`;
    case "tempo":
      return iss.tempoRatio && iss.tempoRatio > 1
        ? `Whole take ${Math.round((iss.tempoRatio - 1) * 100)}% slower than the target tempo`
        : `Whole take ${Math.round((1 - (iss.tempoRatio ?? 1)) * 100)}% faster than the target tempo`;
    case "early":
    case "late":
      return `${at(iss.at)} — ${iss.msOff}ms ${iss.kind}`;
  }
  if (iss.centsOff != null) {
    const wrongNote = iss.detected && iss.expected && iss.detected !== iss.expected && Math.abs(iss.centsOff) >= 50;
    return wrongNote
      ? `${at(iss.at)} — played ${iss.detected}, expected ${iss.expected}`
      : `${at(iss.at)} — ${iss.expected} ${Math.abs(iss.centsOff)}¢ ${iss.centsOff > 0 ? "sharp" : "flat"}`;
  }
  return null;
}

export function SimulatedBanner({ grade }: { grade: GradeResult }) {
  if (grade.source !== "simulated") return null;
  return (
    <div className="panel p-2.5 text-[11px] text-white/70 bg-white/[0.03] border-white/10">
      Simulated score — no grader is connected, so nothing was listened to and this doesn't count toward progress.
    </div>
  );
}

export function GradeDimensionBars({ grade }: { grade: GradeResult }) {
  const entries = Object.entries(grade.dimensions).filter(([, v]) => v != null) as Array<[string, number]>;
  const notGraded = grade.notGraded ?? [];
  return (
    <div className="space-y-2.5">
      {entries.map(([dim, v]) => (
        <div key={dim}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-white/70">{DIM_LABELS[dim] ?? dim}</span>
            <span className="font-mono text-white/50">{Math.round(v * 100)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${v * 100}%`,
                background: v >= 0.85 ? "#34d399" : v >= 0.7 ? "#fbbf24" : "#fb7185",
              }}
            />
          </div>
        </div>
      ))}
      {notGraded.length > 0 && (
        <div className="text-[10px] text-white/40">
          {notGraded.map((d) => DIM_LABELS[d] ?? d).join(" · ")}: not graded yet
        </div>
      )}
    </div>
  );
}

export function GradeIssueList({ grade, limit, boxed = false }: { grade: GradeResult; limit?: number; boxed?: boolean }) {
  const lines: Array<{ text: string; severity: GradeIssue["severity"] }> = [];
  if (grade.warning === "no_notes_detected") {
    lines.push({ text: "We couldn't hear any notes — check the mic is on and close enough.", severity: "major" });
  }
  for (const iss of grade.issues) {
    const text = describeIssue(iss);
    if (text) lines.push({ text, severity: iss.severity });
  }
  if (lines.length === 0) return null;
  return (
    <div className="space-y-1.5">
      {lines.slice(0, limit).map((line, i) => (
        <div key={i} className={`text-xs flex items-start gap-2 ${boxed ? "panel p-2.5" : ""}`}>
          <span className={line.severity === "major" ? "text-rose-400" : "text-amber-300"}>●</span>
          <span className="flex-1 text-white/70">{line.text}</span>
        </div>
      ))}
    </div>
  );
}
