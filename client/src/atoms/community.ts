import { atom } from "jotai";
import type {
  PublicProfile, RecitalSubmission, RecitalComment,
  WeeklyChallenge, TeacherAssignment, CreatorLesson, ProctoredExamSession, LiveSlot,
} from "@catalogs/communityTypes";

// Panel toggles
export const profilePanelAtom = atom<string | null>(null);         // userId or null
export const recitalFeedPanelAtom = atom<boolean>(false);
export const teacherDashboardPanelAtom = atom<boolean>(false);
export const creatorPortalPanelAtom = atom<boolean>(false);
export const proctoredExamPanelAtom = atom<boolean>(false);
export const livelessonsPanelAtom = atom<boolean>(false);

// Cached data
export const recitalsFeedCacheAtom = atom<RecitalSubmission[]>([]);
export const commentsCacheAtom = atom<Record<string, RecitalComment[]>>({});
export const profileCacheAtom = atom<Record<string, PublicProfile>>({});
export const weeklyChallengeAtom = atom<WeeklyChallenge | null>(null);
export const teacherAssignmentsAtom = atom<TeacherAssignment[]>([]);
export const creatorLessonsAtom = atom<CreatorLesson[]>([]);
export const proctoredSessionsAtom = atom<ProctoredExamSession[]>([]);
export const liveSlotsAtom = atom<LiveSlot[]>([]);
