/**
 * Offline attempts queue — IndexedDB wrapper.
 *
 * Why: learners practice on trains, planes, and in rooms with flaky wifi.
 * Recording shouldn't require a network round-trip at the moment of play.
 * We stash the WAV blob + meta locally, and drain the queue when we're
 * back online (and the audio-engine responds to /health).
 *
 * Shape: each record = { id, createdAt, lessonId, exerciseId, audio (Blob),
 *                         meta (JSON string for /grade), status, grade? }
 */

const DB_NAME = "musicluv";
const DB_VERSION = 1;
const STORE = "offlineAttempts";

export type OfflineAttemptStatus = "pending" | "uploading" | "graded" | "failed";

export interface OfflineAttempt {
  id: string;
  createdAt: number;
  lessonId: string;
  exerciseId: string;
  audio: Blob;
  meta: string;             // JSON for /grade
  status: OfflineAttemptStatus;
  lastError?: string;
  grade?: unknown;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("status", "status");
        store.createIndex("createdAt", "createdAt");
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => Promise<T> | T): Promise<T> {
  const db = await openDb();
  return new Promise<T>((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const store = t.objectStore(STORE);
    Promise.resolve(fn(store)).then(
      (result) => { t.oncomplete = () => resolve(result); },
      (err) => reject(err)
    );
    t.onerror = () => reject(t.error);
  });
}

export async function enqueueAttempt(attempt: Omit<OfflineAttempt, "id" | "createdAt" | "status">): Promise<string> {
  const id = "att_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  const record: OfflineAttempt = {
    ...attempt,
    id,
    createdAt: Date.now(),
    status: "pending",
  };
  await tx("readwrite", (store) => { store.add(record); });
  return id;
}

export async function listAttempts(status?: OfflineAttemptStatus): Promise<OfflineAttempt[]> {
  return tx("readonly", (store) =>
    new Promise<OfflineAttempt[]>((resolve, reject) => {
      const out: OfflineAttempt[] = [];
      const req = status
        ? store.index("status").openCursor(IDBKeyRange.only(status))
        : store.openCursor();
      req.onsuccess = () => {
        const c = req.result;
        if (c) { out.push(c.value as OfflineAttempt); c.continue(); }
        else resolve(out.sort((a, b) => b.createdAt - a.createdAt));
      };
      req.onerror = () => reject(req.error);
    })
  );
}

export async function updateAttempt(id: string, patch: Partial<OfflineAttempt>): Promise<void> {
  await tx("readwrite", (store) =>
    new Promise<void>((resolve, reject) => {
      const g = store.get(id);
      g.onsuccess = () => {
        const cur = g.result as OfflineAttempt | undefined;
        if (!cur) return resolve();
        const p = store.put({ ...cur, ...patch });
        p.onsuccess = () => resolve();
        p.onerror = () => reject(p.error);
      };
      g.onerror = () => reject(g.error);
    })
  );
}

export async function deleteAttempt(id: string): Promise<void> {
  await tx("readwrite", (store) => { store.delete(id); });
}

export async function pendingCount(): Promise<number> {
  return tx("readonly", (store) =>
    new Promise<number>((resolve, reject) => {
      const req = store.index("status").count(IDBKeyRange.only("pending"));
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    })
  );
}

/**
 * Drain the pending queue by POSTing each attempt to /grade.
 * Caller provides the grade function so this module doesn't depend on network details.
 */
export async function drainQueue(
  graderUrl: string,
  onEach?: (attempt: OfflineAttempt, result: "graded" | "failed") => void
): Promise<{ graded: number; failed: number }> {
  const pending = await listAttempts("pending");
  let graded = 0;
  let failed = 0;

  for (const att of pending) {
    await updateAttempt(att.id, { status: "uploading" });
    try {
      const form = new FormData();
      form.append("audio", att.audio, "attempt.wav");
      form.append("meta", att.meta);
      const r = await fetch(`${graderUrl}/grade`, { method: "POST", body: form });
      if (r.ok) {
        const body = await r.json();
        await updateAttempt(att.id, { status: "graded", grade: body });
        graded++;
        onEach?.(att, "graded");
      } else {
        await updateAttempt(att.id, { status: "failed", lastError: `HTTP ${r.status}` });
        failed++;
        onEach?.(att, "failed");
      }
    } catch (e) {
      await updateAttempt(att.id, { status: "pending", lastError: (e as Error).message });
      failed++;
      onEach?.(att, "failed");
    }
  }
  return { graded, failed };
}
