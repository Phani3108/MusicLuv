import { useEffect, useState } from "react";
import { playDrum, unlockAudio, type DrumPart } from "@/audio/drumSynth";

interface Zone {
  id: DrumPart;
  label: string;
  x: number;  // percent left-right
  y: number;  // percent top-bottom
  size: number; // px
  color: string;
  key: string; // keyboard shortcut
}

const ZONES: Zone[] = [
  { id: "crash",        label: "Crash",   x: 18,  y: 22, size: 80,  color: "#fbbf24", key: "q" },
  { id: "hihat_open",   label: "HH open", x: 28,  y: 42, size: 58,  color: "#facc15", key: "w" },
  { id: "hihat_closed", label: "HH",      x: 28,  y: 58, size: 52,  color: "#eab308", key: "a" },
  { id: "tom1",         label: "Tom 1",   x: 42,  y: 30, size: 66,  color: "#60a5fa", key: "e" },
  { id: "tom2",         label: "Tom 2",   x: 55,  y: 26, size: 70,  color: "#3b82f6", key: "r" },
  { id: "tom3",         label: "Tom 3",   x: 70,  y: 32, size: 74,  color: "#2563eb", key: "t" },
  { id: "ride",         label: "Ride",    x: 85,  y: 26, size: 86,  color: "#f59e0b", key: "y" },
  { id: "snare",        label: "Snare",   x: 42,  y: 60, size: 76,  color: "#ef4444", key: "s" },
  { id: "kick",         label: "Kick",    x: 60,  y: 72, size: 110, color: "#a855f7", key: " " },
];

export function VirtualDrums({ showHints = true }: { showHints?: boolean }) {
  const [hit, setHit] = useState<DrumPart | null>(null);

  const triggerDrum = async (part: DrumPart) => {
    await unlockAudio();
    playDrum(part);
    setHit(part);
    setTimeout(() => setHit((cur) => (cur === part ? null : cur)), 180);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const zone = ZONES.find((z) => z.key === e.key.toLowerCase() || (z.key === " " && e.code === "Space"));
      if (!zone) return;
      if (e.code === "Space") e.preventDefault();
      triggerDrum(zone.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative select-none" data-piano-root>
      <div className="rounded-[28px] bg-gradient-to-b from-slate-800 via-slate-900 to-black p-4 pb-5 border border-slate-700/40 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="flex justify-between items-center mb-3 px-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-300/80 font-mono">
            Full kit · Top-down
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">
            MusicLuv · Drums
          </div>
        </div>

        <div className="relative h-80 rounded-2xl bg-gradient-radial from-slate-800 via-slate-900 to-black border border-slate-700/30 overflow-hidden">
          {/* subtle wood-floor hint */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(148,163,184,0.08),transparent_70%)] pointer-events-none" />

          {ZONES.map((z) => {
            const isHit = hit === z.id;
            return (
              <button
                key={z.id}
                onMouseDown={() => triggerDrum(z.id)}
                onTouchStart={(e) => { e.preventDefault(); triggerDrum(z.id); }}
                style={{
                  left: `${z.x}%`, top: `${z.y}%`,
                  width: `${z.size}px`, height: `${z.size}px`,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute rounded-full flex items-center justify-center transition-transform duration-100 shadow-2xl"
              >
                <span
                  className="absolute inset-0 rounded-full transition-all"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${z.color}55, ${z.color}22 60%, ${z.color}08)`,
                    border: `1px solid ${z.color}55`,
                    boxShadow: isHit
                      ? `0 0 30px ${z.color}, inset 0 0 20px ${z.color}99`
                      : `inset 0 4px 16px rgba(0,0,0,0.5)`,
                    transform: isHit ? "scale(0.94)" : "scale(1)",
                  }}
                />
                <span className="relative text-[10px] font-semibold text-white/85 font-mono">
                  {z.label}
                </span>
              </button>
            );
          })}
        </div>

        {showHints && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-mono text-white/50 px-2">
            <span>⌨️ Q crash · W hi-hat open · A hi-hat · E R T toms · Y ride · S snare · <span className="text-white/70">Space kick</span></span>
          </div>
        )}
      </div>
    </div>
  );
}
