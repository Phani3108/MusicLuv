/**
 * Thin wrapper over /api/v1/{recitals,profiles,teacher,proctored,live,creator}
 * endpoints on the MusicLuv server. Every call degrades gracefully if the
 * server is unreachable — the AsyncBoundary on each panel shows an error
 * state rather than crashing the app.
 */
import type {
  RecitalSubmission, RecitalComment, PublicProfile,
  TeacherAssignment, ProctoredExamSession, LiveSlot,
} from "@catalogs/communityTypes";
import { MUSICLUV_SERVER_URL, serverAuthHeaders, getDeviceUserId } from "./api";

function base(): string {
  if (!MUSICLUV_SERVER_URL) throw new Error("server_unavailable");
  return MUSICLUV_SERVER_URL;
}

function authHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    ...serverAuthHeaders(),
  };
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${base()}${path}`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "request_failed");
  return data as T;
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${base()}${path}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body ?? {}),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "request_failed");
  return data as T;
}

// ── Recitals ──────────────────────────────────────────────────────────
export async function fetchRecitalFeed(): Promise<RecitalSubmission[]> {
  const { recitals } = await getJson<{ recitals: RecitalSubmission[] }>("/api/v1/recitals");
  return recitals;
}
export async function fetchRecitalsForUser(userId: string): Promise<RecitalSubmission[]> {
  const { recitals } = await getJson<{ recitals: RecitalSubmission[] }>(`/api/v1/recitals?userId=${encodeURIComponent(userId)}`);
  return recitals;
}
export async function submitRecital(record: Omit<RecitalSubmission, "id" | "createdAt">): Promise<RecitalSubmission> {
  const full: RecitalSubmission = {
    ...record,
    id: `r_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  const { recital } = await postJson<{ recital: RecitalSubmission }>("/api/v1/recitals", full);
  return recital;
}
export async function likeRecital(id: string): Promise<RecitalSubmission> {
  const { recital } = await postJson<{ recital: RecitalSubmission }>(`/api/v1/recitals/${id}/like`, {});
  return recital;
}
export async function fetchComments(recitalId: string): Promise<RecitalComment[]> {
  const { comments } = await getJson<{ comments: RecitalComment[] }>(`/api/v1/recitals/${recitalId}/comments`);
  return comments;
}
export async function postComment(recitalId: string, text: string, displayName: string): Promise<RecitalComment> {
  const comment = {
    id: `c_${Date.now()}`,
    recitalId,
    userId: getDeviceUserId(),
    displayName,
    text,
    createdAt: new Date().toISOString(),
  };
  const { comment: saved } = await postJson<{ comment: RecitalComment }>(`/api/v1/recitals/${recitalId}/comments`, comment);
  return saved;
}

// ── Profiles ──────────────────────────────────────────────────────────
export async function fetchProfile(userId: string): Promise<PublicProfile> {
  const { profile } = await getJson<{ profile: PublicProfile }>(`/api/v1/profiles/${userId}`);
  return profile;
}
export async function upsertProfile(profile: PublicProfile): Promise<PublicProfile> {
  const res = await fetch(`${base()}/api/v1/profiles/${profile.userId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const { profile: saved } = (await res.json()) as { profile: PublicProfile };
  return saved;
}

// ── Teacher ───────────────────────────────────────────────────────────
export async function fetchTeacherAssignments(teacherId: string): Promise<TeacherAssignment[]> {
  const { assignments } = await getJson<{ assignments: TeacherAssignment[] }>(`/api/v1/teacher/${teacherId}/assignments`);
  return assignments;
}
export async function createAssignment(a: Omit<TeacherAssignment, "id" | "createdAt">): Promise<TeacherAssignment> {
  const full: TeacherAssignment = {
    ...a,
    id: `a_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const { assignment } = await postJson<{ assignment: TeacherAssignment }>("/api/v1/teacher/assignments", full);
  return assignment;
}

// ── Proctored exams (read-only for coming-soon card) ──────────────────
export async function fetchProctoredForUser(userId: string): Promise<ProctoredExamSession[]> {
  const { sessions } = await getJson<{ sessions: ProctoredExamSession[] }>(`/api/v1/proctored/${userId}`);
  return sessions;
}

// ── Live slots ────────────────────────────────────────────────────────
export async function fetchAvailableLiveSlots(): Promise<LiveSlot[]> {
  const { slots } = await getJson<{ slots: LiveSlot[] }>(`/api/v1/live/available`);
  return slots;
}
