/**
 * Quest engine — tracks per-user quest progress and emits rewards
 * (XP, badges, hearts) when goals complete.
 *
 * Quests are catalog-defined (shared/catalogs/questCatalog.ts). Per-user
 * state is stored here as a flat Record<userId, Record<questId, state>>
 * with the same atomic write + Postgres dual-write pattern used in
 * progressStore.
 *
 * The engine is event-driven: callers (the lesson runner, the recital
 * service, the composition service) call recordEvent() when something
 * quest-relevant happens. The engine matches the event against active
 * quest goals, advances progress, and triggers rewards on completion.
 */

import { atomicWriteJson, readJsonSafe, dataPath } from "./persistence.js";
import type { Quest } from "@catalogs/types";
import { updateProgress, getProgress } from "./progressStore.js";
import { track } from "./observability.js";

/** Quest catalog accessor.
 *
 *  The catalog is loaded lazily via dynamic import. Top-level
 *  `import { QUESTS } from "@catalogs/questCatalog"` triggers a known
 *  named-export visibility bug in tsx's --test runner when the module
 *  is reached transitively through the test entrypoint. Dynamic import
 *  bypasses that path entirely.
 *
 *  Tests inject their own catalog via __setQuestsForTest() to keep the
 *  test universe small + deterministic.
 */
let questsRef: Record<string, Quest> = {};
let questsLoaded = false;

async function ensureQuestsLoaded(): Promise<void> {
  if (questsLoaded) return;
  questsLoaded = true;
  try {
    const mod = (await import("@catalogs/questCatalog")) as { QUESTS: Record<string, Quest> };
    questsRef = mod.QUESTS;
  } catch (err) {
    console.warn("[questEngine] failed to load quest catalog; running with empty set:", (err as Error).message);
    questsRef = {};
  }
}

// Kick off the load eagerly at module-eval time so production code
// paths (which call recordEvent / getUserQuests synchronously) have
// the catalog ready by the time the first event fires.
void ensureQuestsLoaded();

/** Events that arrived before the catalog finished loading. Drained
 *  once `questsLoaded === true`. */
const pendingEvents: QuestEvent[] = [];

async function drainPendingEvents(): Promise<void> {
  await ensureQuestsLoaded();
  // Catalog is now ready. Replay everything queued.
  while (pendingEvents.length > 0) {
    const ev = pendingEvents.shift()!;
    try {
      // Direct call into the ledger logic — avoid recursive recordEvent
      // (which would re-queue if questsRef is still empty for some
      // reason). This is the same path recordEvent takes when the
      // catalog is loaded.
      processEvent(ev);
    } catch (err) {
      console.error("[questEngine] failed to drain queued event:", (err as Error).message);
    }
  }
}

/** Internal — same logic as recordEvent's hot path, factored out so
 *  the drain replay can use it without re-queueing. */
function processEvent(ev: QuestEvent): string[] {
  const userMap = ensureUser(ev.userId);
  const justCompleted: string[] = [];
  const amount = ev.amount ?? 1;
  for (const quest of Object.values(questsRef)) {
    const state = userMap[quest.id];
    if (state.completed) continue;
    if (quest.goal.type !== ev.type) continue;
    if (quest.goal.target && ev.target && quest.goal.target !== ev.target) continue;
    state.progress = Math.min(state.goalCount, state.progress + amount);
    if (state.progress >= state.goalCount) {
      state.completed = true;
      state.completedAt = new Date().toISOString();
      justCompleted.push(quest.id);
      applyReward(ev.userId, quest.id, quest.reward);
      state.rewardClaimed = true;
      void track(ev.userId, "quest_completed", { questId: quest.id, ...ev.meta });
    }
  }
  if (justCompleted.length > 0) persist();
  return justCompleted;
}

export function __setQuestsForTest(quests: Record<string, Quest>): void {
  questsRef = quests;
  questsLoaded = true; // suppress the lazy load
  store = {};
}

const QUEST_FILE = dataPath("userQuests.json");

export type QuestEventType =
  | "play_minutes"
  | "pass_exercise"
  | "complete_lesson"
  | "perfect_run"
  | "record_recital"
  | "compose_bars";

export interface QuestEvent {
  userId: string;
  type: QuestEventType;
  /** Lesson id, exercise id, recital id — matched against goal.target. */
  target?: string;
  /** Default 1 — how much to advance progress (e.g. 10 for 10 minutes). */
  amount?: number;
  /** Optional context for analytics. */
  meta?: Record<string, unknown>;
}

export interface UserQuestState {
  questId: string;
  progress: number;
  goalCount: number;
  completed: boolean;
  completedAt?: string;
  rewardClaimed: boolean;
}

type Store = Record<string, Record<string, UserQuestState>>;

let store: Store = readJsonSafe<Store>(QUEST_FILE, {});

const persist = (() => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      try {
        atomicWriteJson(QUEST_FILE, store);
      } catch (e) {
        console.error("[questEngine] persist failed:", (e as Error).message);
      }
    }, 1500);
    timer.unref?.();
  };
})();

/** Return the quest states for a user — initializes missing entries. */
export function getUserQuests(userId: string): UserQuestState[] {
  const userMap = ensureUser(userId);
  return Object.values(userMap);
}

function ensureUser(userId: string): Record<string, UserQuestState> {
  if (!store[userId]) {
    store[userId] = {};
    for (const quest of Object.values(questsRef)) {
      store[userId][quest.id] = {
        questId: quest.id,
        progress: 0,
        goalCount: quest.goal.count,
        completed: false,
        rewardClaimed: false,
      };
    }
    persist();
  }
  return store[userId];
}

/**
 * Record a quest-relevant event. Returns the list of quests that *just*
 * completed (so callers can show celebration UI). Rewards are auto-
 * applied to user progress (XP, hearts, badges) before this returns.
 *
 * If the catalog hasn't loaded yet (only possible in the first ~10ms
 * after server boot), the event is *queued* and replayed once the
 * catalog finishes loading. This closes the race where a fast HTTP
 * request fires recordEvent before the dynamic catalog import resolves.
 */
export function recordEvent(ev: QuestEvent): string[] {
  if (!questsLoaded || Object.keys(questsRef).length === 0) {
    // Catalog not ready yet — queue the event and replay after load.
    pendingEvents.push(ev);
    if (pendingEvents.length === 1) {
      // Only kick off the drain on first queued event.
      void drainPendingEvents();
    }
    return [];
  }

  const userMap = ensureUser(ev.userId);
  const justCompleted: string[] = [];
  const amount = ev.amount ?? 1;

  for (const quest of Object.values(questsRef)) {
    const state = userMap[quest.id];
    if (state.completed) continue;
    if (quest.goal.type !== ev.type) continue;
    // If goal has a specific target, the event must match it. Otherwise
    // any event of the right type counts.
    if (quest.goal.target && ev.target && quest.goal.target !== ev.target) continue;

    state.progress = Math.min(state.goalCount, state.progress + amount);
    if (state.progress >= state.goalCount) {
      state.completed = true;
      state.completedAt = new Date().toISOString();
      justCompleted.push(quest.id);
      applyReward(ev.userId, quest.id, quest.reward);
      state.rewardClaimed = true;
      void track(ev.userId, "quest_completed", { questId: quest.id, ...ev.meta });
    }
  }

  if (justCompleted.length > 0) persist();
  return justCompleted;
}

function applyReward(
  userId: string,
  questId: string,
  reward: { xp: number; coins?: number; hearts?: number; badgeId?: string },
): void {
  const cur = getProgress(userId);
  updateProgress(userId, {
    totalXp: cur.totalXp + reward.xp,
    heartsToday: Math.min(cur.heartsMax, cur.heartsToday + (reward.hearts ?? 0)),
  });
  // Badges are ephemeral right now — recorded only via analytics. When
  // we add a badges store, mirror the badgeId award here.
  void track(userId, "quest_reward_applied", {
    questId,
    xp: reward.xp,
    hearts: reward.hearts ?? 0,
    badgeId: reward.badgeId,
  });
}

/** Reset a user's quest progress (admin / dev only). */
export function resetUserQuests(userId: string): void {
  delete store[userId];
  persist();
}
