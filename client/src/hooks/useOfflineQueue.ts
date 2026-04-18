import { useCallback, useEffect, useState } from "react";
import { drainQueue, listAttempts, pendingCount, type OfflineAttempt } from "@/lib/offlineQueue";
import { AUDIO_ENGINE_URL } from "@/lib/api";

/**
 * React hook: exposes pending count, full attempt list, and a manual drain
 * trigger. Automatically attempts a drain when the browser transitions back
 * online.
 */
export function useOfflineQueue() {
  const [pending, setPending] = useState(0);
  const [all, setAll] = useState<OfflineAttempt[]>([]);
  const [draining, setDraining] = useState(false);

  const refresh = useCallback(async () => {
    setPending(await pendingCount());
    setAll(await listAttempts());
  }, []);

  const drain = useCallback(async () => {
    if (!AUDIO_ENGINE_URL || draining) return;
    setDraining(true);
    try {
      await drainQueue(AUDIO_ENGINE_URL);
    } finally {
      setDraining(false);
      refresh();
    }
  }, [draining, refresh]);

  useEffect(() => {
    refresh();
    const onOnline = () => { drain(); };
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [refresh, drain]);

  return { pending, all, draining, drain, refresh };
}
