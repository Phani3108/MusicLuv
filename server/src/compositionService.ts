/**
 * Composition review service. Learners (Genius tier) submit original
 * compositions as audio + optional sheet-music image + written notes.
 * The server persists them in a review queue; human reviewers (or the
 * LLM auto-reviewer in compositionReview.ts) mark them approved /
 * needs_revision / rejected with structured feedback.
 *
 * Storage routes through the kvStore abstraction so PERSISTENCE_DRIVER
 * controls whether reads + writes go to flatfile JSON or Postgres
 * (kv_store table). All accessor functions are async because the
 * Postgres path requires awaiting the pg pool.
 */
import { kvStore } from "./persistence/driver.js";

export interface Composition {
  id: string;
  userId: string;
  title: string;
  description?: string;
  audioUrl?: string;        // server-side URL after upload
  sheetMusicUrl?: string;
  lyrics?: string;
  instrumentId?: string;
  status: "submitted" | "in_review" | "approved" | "needs_revision" | "rejected";
  createdAt: string;
  reviewedAt?: string;
  reviewerId?: string;
  reviewerNotes?: string;
  rubric?: {
    melody: number;       // 0..5
    harmony: number;
    rhythm: number;
    originality: number;
    craft: number;
  };
}

const store = kvStore<Composition[]>("compositions", []);

async function load(): Promise<Composition[]> {
  const v = await store.get();
  return Array.isArray(v) ? v : [];
}

async function save(list: Composition[]): Promise<void> {
  await store.set(list);
}

export async function listCompositionsForUser(userId: string): Promise<Composition[]> {
  return (await load()).filter((c) => c.userId === userId);
}

export async function listReviewQueue(): Promise<Composition[]> {
  return (await load()).filter((c) => c.status === "submitted" || c.status === "in_review");
}

export async function submitComposition(c: Composition): Promise<Composition> {
  const list = await load();
  const record: Composition = {
    ...c,
    status: "submitted",
    createdAt: c.createdAt || new Date().toISOString(),
  };
  list.push(record);
  await save(list);
  return record;
}

export async function reviewComposition(
  id: string,
  reviewerId: string,
  status: "approved" | "needs_revision" | "rejected",
  notes: string,
  rubric?: Composition["rubric"],
): Promise<Composition | null> {
  const list = await load();
  const target = list.find((c) => c.id === id);
  if (!target) return null;
  target.status = status;
  target.reviewedAt = new Date().toISOString();
  target.reviewerId = reviewerId;
  target.reviewerNotes = notes;
  if (rubric) target.rubric = rubric;
  await save(list);
  return target;
}

/** Fetch a single composition by id. Used by the LLM review endpoint. */
export async function getComposition(id: string): Promise<Composition | null> {
  const list = await load();
  return list.find((c) => c.id === id) ?? null;
}
