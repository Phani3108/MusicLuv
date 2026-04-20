/**
 * Monetization kill-switch. Keeps billing OFF during the launch window and
 * flips it ON automatically when EITHER condition is met:
 *   1. User count reaches 200 (from distinct user IDs seen by the server)
 *   2. 90 days have elapsed since the first recorded signup
 *
 * Once activated, the flip is permanent (persists `monetizationActivatedAt`
 * so the flag never flops back if a user is deleted or time goes backwards).
 *
 * State is persisted atomically via `persistence.ts` to
 * `data/launchState.json`.
 *
 * Consumers:
 *   - server: `billingService.ts` paywall middleware wraps feature checks.
 *   - client: `GET /api/v1/monetization/status` → caches in `launchStateAtom`
 *     → `lib/paywall.ts` treats everyone as Genius-equivalent when promo active.
 */
import { atomicWriteJson, readJsonSafe, dataPath } from "./persistence.js";

const STATE_FILE = dataPath("launchState.json");
const MAX_FREE_USERS = 200;
const MAX_FREE_DAYS = 90;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export interface LaunchState {
  firstUserAt?: string;              // ISO of first recorded user
  userCount: number;                  // distinct user ids seen
  knownUserIds: string[];             // capped at MAX_FREE_USERS+20 to avoid runaway memory
  monetizationActivatedAt?: string;   // set once; permanent
  activationReason?: "user_cap_reached" | "days_elapsed" | "manual";
}

function load(): LaunchState {
  return readJsonSafe<LaunchState>(STATE_FILE, {
    userCount: 0,
    knownUserIds: [],
  });
}

function save(state: LaunchState): void {
  atomicWriteJson(STATE_FILE, state);
}

/**
 * Record that we've seen a user. Idempotent — duplicate calls for the same
 * user don't inflate the count. Also flips the activation flag if
 * user-count condition crosses.
 */
export function recordUserSeen(userId: string): LaunchState {
  const state = load();

  if (!state.firstUserAt) {
    state.firstUserAt = new Date().toISOString();
  }

  if (!state.knownUserIds.includes(userId)) {
    state.knownUserIds.push(userId);
    state.userCount = state.knownUserIds.length;

    // Cap the id list to avoid unbounded growth after the gate flips.
    if (state.knownUserIds.length > MAX_FREE_USERS + 50) {
      state.knownUserIds = state.knownUserIds.slice(-200);
    }
  }

  // Check activation conditions.
  if (!state.monetizationActivatedAt) {
    if (state.userCount >= MAX_FREE_USERS) {
      state.monetizationActivatedAt = new Date().toISOString();
      state.activationReason = "user_cap_reached";
    } else if (state.firstUserAt && daysElapsed(state.firstUserAt) >= MAX_FREE_DAYS) {
      state.monetizationActivatedAt = new Date().toISOString();
      state.activationReason = "days_elapsed";
    }
  }

  save(state);
  return state;
}

/** True once monetization has been flipped on. */
export function isMonetizationActive(): boolean {
  const state = load();
  if (state.monetizationActivatedAt) return true;

  // Defensive re-check on read — covers the case where the server was
  // offline when the 90-day mark passed.
  if (state.firstUserAt && daysElapsed(state.firstUserAt) >= MAX_FREE_DAYS) {
    state.monetizationActivatedAt = new Date().toISOString();
    state.activationReason = "days_elapsed";
    save(state);
    return true;
  }

  return false;
}

/** Explicit manual override, e.g. admin endpoint. */
export function manuallyActivateMonetization(): LaunchState {
  const state = load();
  if (!state.monetizationActivatedAt) {
    state.monetizationActivatedAt = new Date().toISOString();
    state.activationReason = "manual";
    save(state);
  }
  return state;
}

/** Public status payload for the client paywall UI. */
export function getPublicStatus() {
  const state = load();
  const active = isMonetizationActive();
  return {
    active,
    firstUserAt: state.firstUserAt ?? null,
    userCount: state.userCount,
    seatsRemaining: Math.max(0, MAX_FREE_USERS - state.userCount),
    maxFreeUsers: MAX_FREE_USERS,
    maxFreeDays: MAX_FREE_DAYS,
    daysElapsed: state.firstUserAt ? Math.floor(daysElapsed(state.firstUserAt)) : 0,
    daysRemaining: state.firstUserAt
      ? Math.max(0, MAX_FREE_DAYS - Math.floor(daysElapsed(state.firstUserAt)))
      : MAX_FREE_DAYS,
    monetizationActivatedAt: state.monetizationActivatedAt ?? null,
    activationReason: state.activationReason ?? null,
  };
}

function daysElapsed(isoDate: string): number {
  return (Date.now() - new Date(isoDate).getTime()) / MS_PER_DAY;
}
