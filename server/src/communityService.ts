/**
 * Phase 6 community service. Flat-file persistence now; Postgres later.
 * Endpoints: recital feed, profiles, assignments, creator lessons,
 * proctored-exam scheduling, live-lessons marketplace.
 */
import type {
  PublicProfile, RecitalSubmission, RecitalComment,
  TeacherAssignment, CreatorLesson, ProctoredExamSession, LiveSlot,
} from "@catalogs/communityTypes";
import { atomicWriteJson, readJsonSafe, dataPath, pushCapped } from "./persistence.js";

const RECITALS_FILE = dataPath("recitals.json");
const COMMENTS_FILE = dataPath("comments.json");
const PROFILES_FILE = dataPath("profiles.json");
const ASSIGNMENTS_FILE = dataPath("assignments.json");
const CREATOR_LESSONS_FILE = dataPath("creatorLessons.json");
const PROCTORED_FILE = dataPath("proctoredExams.json");
const LIVE_SLOTS_FILE = dataPath("liveSlots.json");

const loadRecitals = () => readJsonSafe<RecitalSubmission[]>(RECITALS_FILE, []);
const saveRecitals = (v: RecitalSubmission[]) => atomicWriteJson(RECITALS_FILE, v);

const loadComments = () => readJsonSafe<Record<string, RecitalComment[]>>(COMMENTS_FILE, {});
const saveComments = (v: Record<string, RecitalComment[]>) => atomicWriteJson(COMMENTS_FILE, v);

const loadProfiles = () => readJsonSafe<Record<string, PublicProfile>>(PROFILES_FILE, {});
const saveProfiles = (v: Record<string, PublicProfile>) => atomicWriteJson(PROFILES_FILE, v);

const loadAssignments = () => readJsonSafe<TeacherAssignment[]>(ASSIGNMENTS_FILE, []);
const saveAssignments = (v: TeacherAssignment[]) => atomicWriteJson(ASSIGNMENTS_FILE, v);

const loadCreatorLessons = () => readJsonSafe<CreatorLesson[]>(CREATOR_LESSONS_FILE, []);
const saveCreatorLessons = (v: CreatorLesson[]) => atomicWriteJson(CREATOR_LESSONS_FILE, v);

const loadProctored = () => readJsonSafe<ProctoredExamSession[]>(PROCTORED_FILE, []);
const saveProctored = (v: ProctoredExamSession[]) => atomicWriteJson(PROCTORED_FILE, v);

const loadLiveSlots = () => readJsonSafe<LiveSlot[]>(LIVE_SLOTS_FILE, []);
const saveLiveSlots = (v: LiveSlot[]) => atomicWriteJson(LIVE_SLOTS_FILE, v);

// ── Recitals ───────────────────────────────────────────────────────────
export function listPublicRecitals(limit = 50): RecitalSubmission[] {
  return loadRecitals().filter((r) => r.isPublic).slice(0, limit);
}

export function listRecitalsForUser(userId: string): RecitalSubmission[] {
  return loadRecitals().filter((r) => r.userId === userId);
}

export function createRecital(record: RecitalSubmission): RecitalSubmission {
  const all = loadRecitals();
  pushCapped(all, record, 10000);
  saveRecitals(all);
  return record;
}

export function likeRecital(recitalId: string): RecitalSubmission | null {
  const all = loadRecitals();
  const target = all.find((r) => r.id === recitalId);
  if (!target) return null;
  target.likes += 1;
  saveRecitals(all);
  return target;
}

// ── Comments ───────────────────────────────────────────────────────────
export function listComments(recitalId: string): RecitalComment[] {
  return loadComments()[recitalId] ?? [];
}

export function addComment(comment: RecitalComment): RecitalComment {
  const all = loadComments();
  all[comment.recitalId] = [...(all[comment.recitalId] ?? []), comment];
  saveComments(all);
  // Increment parent recital's comment count
  const recitals = loadRecitals();
  const target = recitals.find((r) => r.id === comment.recitalId);
  if (target) { target.commentCount += 1; saveRecitals(recitals); }
  return comment;
}

// ── Profiles ───────────────────────────────────────────────────────────
export function getProfile(userId: string): PublicProfile | null {
  return loadProfiles()[userId] ?? null;
}

export function upsertProfile(profile: PublicProfile): PublicProfile {
  const all = loadProfiles();
  all[profile.userId] = profile;
  saveProfiles(all);
  return profile;
}

// ── Teacher assignments ────────────────────────────────────────────────
export function listAssignmentsForTeacher(teacherId: string): TeacherAssignment[] {
  return loadAssignments().filter((a) => a.teacherId === teacherId);
}
export function listAssignmentsForStudent(studentId: string): TeacherAssignment[] {
  return loadAssignments().filter((a) => a.studentId === studentId);
}
export function createAssignment(a: TeacherAssignment): TeacherAssignment {
  const all = loadAssignments();
  all.push(a);
  saveAssignments(all);
  return a;
}
export function updateAssignmentStatus(id: string, status: TeacherAssignment["status"]): TeacherAssignment | null {
  const all = loadAssignments();
  const target = all.find((a) => a.id === id);
  if (!target) return null;
  target.status = status;
  saveAssignments(all);
  return target;
}

// ── Creator lessons ────────────────────────────────────────────────────
export function listCreatorLessonsFor(creatorId: string): CreatorLesson[] {
  return loadCreatorLessons().filter((l) => l.creatorId === creatorId);
}
export function submitCreatorLesson(lesson: CreatorLesson): CreatorLesson {
  const all = loadCreatorLessons();
  all.push({ ...lesson, status: "submitted" });
  saveCreatorLessons(all);
  return lesson;
}
export function reviewCreatorLesson(id: string, status: CreatorLesson["status"]): CreatorLesson | null {
  const all = loadCreatorLessons();
  const target = all.find((l) => l.id === id);
  if (!target) return null;
  target.status = status;
  if (status === "published") target.publishedAt = new Date().toISOString();
  saveCreatorLessons(all);
  return target;
}

// ── Proctored exams ────────────────────────────────────────────────────
export function listProctoredForUser(userId: string): ProctoredExamSession[] {
  return loadProctored().filter((s) => s.userId === userId);
}
export function scheduleProctored(session: ProctoredExamSession): ProctoredExamSession {
  const all = loadProctored();
  all.push(session);
  saveProctored(all);
  return session;
}
export function completeProctored(id: string, status: "passed" | "failed", proctorNotes?: string): ProctoredExamSession | null {
  const all = loadProctored();
  const target = all.find((s) => s.id === id);
  if (!target) return null;
  target.status = status;
  target.completedAt = new Date().toISOString();
  if (proctorNotes) target.proctorNotes = proctorNotes;
  saveProctored(all);
  return target;
}

// ── Live lessons ───────────────────────────────────────────────────────
export function listLiveSlotsForTeacher(teacherId: string): LiveSlot[] {
  return loadLiveSlots().filter((s) => s.teacherId === teacherId);
}
export function listAvailableLiveSlots(): LiveSlot[] {
  return loadLiveSlots().filter((s) => s.status === "available");
}
export function bookLiveSlot(slotId: string, studentId: string, meetingUrl: string): LiveSlot | null {
  const all = loadLiveSlots();
  const target = all.find((s) => s.id === slotId);
  if (!target || target.status !== "available") return null;
  target.status = "booked";
  target.studentId = studentId;
  target.meetingUrl = meetingUrl;
  saveLiveSlots(all);
  return target;
}
