/**
 * Composition review service. Learners (Genius tier) submit original
 * compositions as audio + optional sheet-music image + written notes.
 * The server persists them in a review queue; human reviewers mark them
 * approved / needs_revision / rejected with structured feedback.
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

function load(): Composition[] {
  const v = store.get();
  return Array.isArray(v) ? v : [];
}
function save(list: Composition[]): void { store.set(list); }

export function listCompositionsForUser(userId: string): Composition[] {
  return load().filter((c) => c.userId === userId);
}

export function listReviewQueue(): Composition[] {
  return load().filter((c) => c.status === "submitted" || c.status === "in_review");
}

export function submitComposition(c: Composition): Composition {
  const list = load();
  list.push({ ...c, status: "submitted", createdAt: c.createdAt || new Date().toISOString() });
  save(list);
  return c;
}

export function reviewComposition(
  id: string,
  reviewerId: string,
  status: "approved" | "needs_revision" | "rejected",
  notes: string,
  rubric?: Composition["rubric"],
): Composition | null {
  const list = load();
  const target = list.find((c) => c.id === id);
  if (!target) return null;
  target.status = status;
  target.reviewedAt = new Date().toISOString();
  target.reviewerId = reviewerId;
  target.reviewerNotes = notes;
  if (rubric) target.rubric = rubric;
  save(list);
  return target;
}
