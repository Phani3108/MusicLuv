import { useCallback, useEffect, useRef, useState } from "react";
import type { AsyncStatus } from "@/components/common/AsyncBoundary";

/**
 * Small async-fetch hook. Pairs with <AsyncBoundary/> — the status value
 * it returns maps 1:1 to the AsyncStatus union.
 *
 * Usage:
 *   const { status, data, error, refetch } = useAsync(
 *     () => fetch("/api/v1/recitals").then((r) => r.json()),
 *     [],
 *   );
 */
export function useAsync<T>(
  fetcher: () => Promise<T>,
  deps: unknown[],
  opts: { isEmpty?: (data: T) => boolean } = {},
) {
  const [status, setStatus] = useState<AsyncStatus>("idle");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const run = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const result = await fetcherRef.current();
      setData(result);
      const empty = opts.isEmpty ? opts.isEmpty(result) : false;
      setStatus(empty ? "empty" : "ready");
    } catch (e) {
      setError((e as Error).message || "Unknown error");
      setStatus("error");
    }
  }, [opts]);

  useEffect(() => {
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { status, data, error, refetch: run };
}
