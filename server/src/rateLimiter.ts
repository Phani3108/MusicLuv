/**
 * Rate limiter — ported from 3DWorld/server/rateLimiter.js (hits-per-window per key).
 * Returns true when the caller has exceeded the limit (i.e. should be rejected).
 */
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const hits = new Map<string, { count: number; resetTime: number }>();
  const interval = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) {
      if (now > entry.resetTime) hits.delete(key);
    }
  }, 60_000);
  interval.unref?.();

  return (key: string): boolean => {
    const now = Date.now();
    let entry = hits.get(key);
    if (!entry || now > entry.resetTime) {
      entry = { count: 0, resetTime: now + windowMs };
      hits.set(key, entry);
    }
    entry.count++;
    return entry.count > maxRequests;
  };
};
