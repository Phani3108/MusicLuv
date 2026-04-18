import { useOfflineQueue } from "@/hooks/useOfflineQueue";
import { AUDIO_ENGINE_URL } from "@/lib/api";

/** Compact top-bar chip showing pending offline attempts + one-tap drain. */
export function OfflineQueueChip() {
  const { pending, draining, drain } = useOfflineQueue();
  if (pending === 0 && !draining) return null;

  const canDrain = Boolean(AUDIO_ENGINE_URL);

  return (
    <button
      onClick={drain}
      disabled={!canDrain || draining}
      title={canDrain ? "Tap to upload pending offline attempts" : "Audio engine offline — can't drain yet"}
      className={`chip text-[10px] transition-colors
        ${draining
          ? "bg-indigo-400/20 text-indigo-200 border border-indigo-400/40 animate-pulse-soft"
          : "bg-amber-500/15 text-amber-200 border border-amber-400/30 hover:bg-amber-400/25"}`}
    >
      {draining ? `⏳ grading ${pending}…` : `📥 ${pending} offline`}
    </button>
  );
}
