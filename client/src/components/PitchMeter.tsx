import { useAtomValue } from "jotai";
import { livePitchCentsAtom, livePitchNoteAtom, practiceStatusAtom } from "@/atoms/practice";

export function PitchMeter() {
  const cents = useAtomValue(livePitchCentsAtom);
  const note = useAtomValue(livePitchNoteAtom);
  const status = useAtomValue(practiceStatusAtom);

  const active = status === "recording";
  const clamped = Math.max(-60, Math.min(60, cents));
  const pct = 50 + (clamped / 60) * 50;

  const color =
    Math.abs(cents) < 15 ? "bg-emerald-400" :
    Math.abs(cents) < 35 ? "bg-amber-400" :
    "bg-rose-400";

  return (
    <div className="panel p-3 flex items-center gap-3 min-w-[260px]" data-pitch-meter>
      <div className="w-14 text-center">
        <div className={`text-xs uppercase tracking-widest ${active ? "text-emerald-300" : "text-white/40"}`}>
          {active ? "live" : "idle"}
        </div>
        <div className="font-mono text-2xl font-bold">{note ?? "—"}</div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-[10px] font-mono text-white/40 mb-1">
          <span>-50¢</span><span>0</span><span>+50¢</span>
        </div>
        <div className="relative h-3 rounded-full bg-white/5 overflow-hidden">
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/30" />
          <div
            className={`absolute top-0 bottom-0 w-2 rounded-full ${active ? color : "bg-white/20"} transition-all duration-100`}
            style={{ left: `calc(${pct}% - 4px)` }}
          />
        </div>
        <div className="text-[10px] font-mono mt-1 text-right text-white/50">
          {active ? (cents >= 0 ? `+${cents}¢` : `${cents}¢`) : ""}
        </div>
      </div>
    </div>
  );
}
