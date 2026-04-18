/**
 * LLM conversation memory — per-(mentorId, userId) rolling 10-turn window.
 * Ported from 3DWorld/server/llm/memoryStore.js.
 * Debounce-persists to disk so a restart doesn't wipe fresh context.
 */
import { atomicWriteJson, readJsonSafe, dataPath } from "../persistence.js";
import type { HistoryTurn } from "./providerCatalog.js";

const MEM_FILE = dataPath("mentorMemory.json");
const MAX_TURNS_PER_PAIR = 10;

interface MemoryEntry {
  turns: HistoryTurn[];
  updatedAt: number;
}

let memory: Map<string, MemoryEntry> = new Map();

const loadInitial = () => {
  try {
    const raw = readJsonSafe<Record<string, MemoryEntry> | null>(MEM_FILE, null);
    if (raw && typeof raw === "object") {
      memory = new Map(Object.entries(raw));
    }
  } catch (e) {
    console.warn("[mentorMemory] initial load failed:", (e as Error).message);
  }
};
loadInitial();

const persistState = { timer: null as ReturnType<typeof setTimeout> | null };
const persistSoon = () => {
  if (persistState.timer) return;
  persistState.timer = setTimeout(() => {
    persistState.timer = null;
    try {
      const obj = Object.fromEntries(memory.entries());
      atomicWriteJson(MEM_FILE, obj);
    } catch (e) {
      console.error("[mentorMemory] persist failed:", (e as Error).message);
    }
  }, 2500);
  persistState.timer.unref?.();
};

const keyOf = (mentorId: string, userId: string) => `${mentorId}::${userId}`;

export const getMemory = (mentorId: string, userId: string): HistoryTurn[] => {
  const entry = memory.get(keyOf(mentorId, userId));
  return entry?.turns ?? [];
};

export const recordTurn = (
  mentorId: string,
  userId: string,
  { userText, mentorText }: { userText?: string; mentorText?: string }
): void => {
  if (!mentorId || !userId) return;
  const k = keyOf(mentorId, userId);
  const entry = memory.get(k) ?? { turns: [], updatedAt: 0 };
  const at = Date.now();
  if (userText) entry.turns.push({ role: "user", text: String(userText).slice(0, 800), at });
  if (mentorText) entry.turns.push({ role: "mentor", text: String(mentorText).slice(0, 1200), at });
  while (entry.turns.length > MAX_TURNS_PER_PAIR) entry.turns.shift();
  entry.updatedAt = at;
  memory.set(k, entry);
  persistSoon();
};

export const clearMemory = (mentorId: string, userId: string): void => {
  memory.delete(keyOf(mentorId, userId));
  persistSoon();
};

export const memoryStats = () => {
  const now = Date.now();
  return {
    pairs: memory.size,
    oldestAgeMs: memory.size
      ? now - Math.min(...Array.from(memory.values()).map((e) => e.updatedAt))
      : 0,
  };
};

export const MAX_MEMORY_TURNS = MAX_TURNS_PER_PAIR;
