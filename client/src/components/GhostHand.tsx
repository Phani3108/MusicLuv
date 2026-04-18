/** A tiny hand icon that floats above the piano pointing at the target finger. */
export function GhostHand({ targetFinger, visible }: { targetFinger?: number; visible: boolean }) {
  if (!visible || !targetFinger) return null;

  return (
    <div className="absolute -top-6 left-0 right-0 flex items-center justify-center pointer-events-none">
      <div className="panel px-3 py-1.5 text-xs font-semibold text-white/90 flex items-center gap-2 animate-pulse-soft">
        <span className="text-base">👉</span>
        <span>Use finger <span className="font-mono text-amber-300">{targetFinger}</span></span>
      </div>
    </div>
  );
}
