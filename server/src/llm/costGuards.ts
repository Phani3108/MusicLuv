/**
 * LLM cost guards — per-user tokens/day + per-user reqs/min + per-mentor concurrency.
 * Ported from 3DWorld/server/llm/costGuards.js. In-memory; restart resets.
 */
const PER_USER_TOKENS_PER_DAY = 50_000;
const PER_USER_REQS_PER_MIN = 20;
const PER_MENTOR_CONCURRENT = 2;

interface UserEntry {
  day: string;
  tokens: number;
  reqs: number[];
}

const userState = new Map<string, UserEntry>();
const mentorInflight = new Map<string, number>();

const todayKey = () => new Date().toISOString().slice(0, 10);

export const estimateTokens = (text: string): number => {
  if (typeof text !== "string") return 0;
  return Math.max(1, Math.ceil(text.length / 3.5));
};

const getUserEntry = (userId: string): UserEntry => {
  let s = userState.get(userId);
  const day = todayKey();
  if (!s || s.day !== day) {
    s = { day, tokens: 0, reqs: [] };
    userState.set(userId, s);
  }
  return s;
};

export type SpendCheck =
  | { ok: true }
  | { ok: false; reason: string; retryAfterMs?: number };

export const canSpend = (userId: string, mentorId: string): SpendCheck => {
  if (!userId) return { ok: false, reason: "no_user" };
  const s = getUserEntry(userId);

  if (s.tokens >= PER_USER_TOKENS_PER_DAY) {
    const msToMidnight = 24 * 3600 * 1000 - (Date.now() % (24 * 3600 * 1000));
    return { ok: false, reason: "daily_tokens", retryAfterMs: msToMidnight };
  }

  const now = Date.now();
  s.reqs = s.reqs.filter((t) => now - t < 60_000);
  if (s.reqs.length >= PER_USER_REQS_PER_MIN) {
    const oldest = s.reqs[0];
    return { ok: false, reason: "per_minute", retryAfterMs: 60_000 - (now - oldest) };
  }

  if ((mentorInflight.get(mentorId) || 0) >= PER_MENTOR_CONCURRENT) {
    return { ok: false, reason: "mentor_busy" };
  }

  return { ok: true };
};

export const beginRequest = (userId: string, mentorId: string) => {
  const s = getUserEntry(userId);
  s.reqs.push(Date.now());
  mentorInflight.set(mentorId, (mentorInflight.get(mentorId) || 0) + 1);
  return (tokensSpent?: number) => {
    const n = mentorInflight.get(mentorId) || 1;
    if (n <= 1) mentorInflight.delete(mentorId);
    else mentorInflight.set(mentorId, n - 1);
    if (typeof tokensSpent === "number" && tokensSpent > 0) {
      s.tokens += tokensSpent;
    }
  };
};

export const guardStats = () => ({
  perUserTokensDaily: PER_USER_TOKENS_PER_DAY,
  perUserReqsPerMin: PER_USER_REQS_PER_MIN,
  perMentorConcurrent: PER_MENTOR_CONCURRENT,
  trackedUsers: userState.size,
  trackedMentors: mentorInflight.size,
});
