/**
 * Lightweight user directory. Maps userId → { email, displayName }.
 *
 * Populated by:
 *   1. Auth middleware on every authenticated request (caches the JWT
 *      identity so background jobs + non-authenticated routes can email
 *      the user later).
 *   2. /api/v1/users/identify route the client calls on login /
 *      onboarding completion to pin the displayName.
 *
 * Not the source of truth — Supabase auth is. This is a denormalized
 * read-only cache so the email-trigger layer doesn't have to hit
 * Supabase every time it wants to send a transactional message.
 *
 * Postgres dual-write to `users` table when PERSISTENCE_DRIVER=postgres,
 * mirrored fire-and-forget so notification latency stays low.
 */
import { atomicWriteJson, readJsonSafe, dataPath } from "./persistence.js";
import { getPgPool } from "./persistence/pgClient.js";
import { captureError } from "./observability.js";

export interface UserRecord {
  userId: string;
  email?: string;
  displayName?: string;
  firstSeenAt: string;
  lastSeenAt: string;
}

const USERS_FILE = dataPath("users.json");

let cache: Record<string, UserRecord> = readJsonSafe<Record<string, UserRecord>>(USERS_FILE, {});

const persist = (() => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      try { atomicWriteJson(USERS_FILE, cache); }
      catch (e) { captureError(e as Error, { where: "userDirectory.persist" }); }
    }, 1500);
    timer.unref?.();
  };
})();

/** Idempotent identify — returns { isNewUser, record }. Call on every
 *  authenticated request + on /api/v1/users/identify. */
export function identify(args: {
  userId: string;
  email?: string;
  displayName?: string;
}): { isNewUser: boolean; record: UserRecord } {
  const now = new Date().toISOString();
  const existing = cache[args.userId];
  if (!existing) {
    const record: UserRecord = {
      userId: args.userId,
      email: args.email,
      displayName: args.displayName,
      firstSeenAt: now,
      lastSeenAt: now,
    };
    cache[args.userId] = record;
    persist();
    void mirrorToPg(record);
    return { isNewUser: true, record };
  }
  // Update fields if newer info is available; never clobber with undefined.
  const merged: UserRecord = {
    ...existing,
    email: args.email ?? existing.email,
    displayName: args.displayName ?? existing.displayName,
    lastSeenAt: now,
  };
  cache[args.userId] = merged;
  persist();
  void mirrorToPg(merged);
  return { isNewUser: false, record: merged };
}

export function getUser(userId: string): UserRecord | null {
  return cache[userId] ?? null;
}

/** All users seen in the last N days. Used by the weekly-digest scheduler. */
export function activeUsersSince(daysAgo: number): UserRecord[] {
  const cutoff = Date.now() - daysAgo * 24 * 3600 * 1000;
  return Object.values(cache).filter(
    (u) => u.email && Date.parse(u.lastSeenAt) >= cutoff,
  );
}

async function mirrorToPg(record: UserRecord): Promise<void> {
  const pool = await getPgPool();
  if (!pool) return;
  try {
    await pool.query(
      `INSERT INTO users (user_id, email, display_name, first_seen_at, last_seen_at)
       VALUES ($1, $2, $3, $4, now())
       ON CONFLICT (user_id) DO UPDATE SET
         email = COALESCE(EXCLUDED.email, users.email),
         display_name = COALESCE(EXCLUDED.display_name, users.display_name),
         last_seen_at = now()`,
      [record.userId, record.email ?? null, record.displayName ?? null, record.firstSeenAt],
    );
  } catch (err) {
    captureError(err as Error, { where: "userDirectory.mirrorToPg", userId: record.userId });
  }
}
