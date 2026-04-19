/**
 * Phase 6 community types. Shared by client + server so the payload
 * shapes stay aligned as new surfaces (feed, teacher dashboard,
 * creator portal, proctored exams) ship.
 */

export interface PublicProfile {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  joinedAt: string;
  instruments: Array<{ id: string; level: number; tier: "standard" | "pro" | "genius"; xp: number }>;
  certificates: Array<{ instrumentId: string; tier: "standard" | "pro" | "genius"; earnedAt: string }>;
  totalXp: number;
  currentStreak: number;
  featuredRecitalId?: string;
  isTeacher?: boolean;
  isCreator?: boolean;
}

export interface RecitalSubmission {
  id: string;
  userId: string;
  instrumentId: string;
  lessonId?: string;
  title: string;
  description?: string;
  durationSec: number;
  audioUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
  tier: "standard" | "pro" | "genius";
  // Human review (Genius only)
  reviewStatus?: "pending" | "approved" | "needs_revision" | "rejected";
  reviewerId?: string;
  reviewerNotes?: string;
  reviewedAt?: string;
  // Social
  likes: number;
  commentCount: number;
  isPublic: boolean;
}

export interface RecitalComment {
  id: string;
  recitalId: string;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  text: string;
  createdAt: string;
  isTeacherComment?: boolean;
}

export interface WeeklyChallenge {
  id: string;
  weekStart: string;        // ISO Monday
  title: string;
  description: string;
  exerciseId: string;
  xpReward: number;
  submissionCount: number;
}

export interface TeacherAssignment {
  id: string;
  teacherId: string;
  studentId: string;
  lessonId: string;
  dueAt?: string;
  status: "assigned" | "in_progress" | "submitted" | "reviewed";
  createdAt: string;
}

export interface CreatorLesson {
  id: string;
  creatorId: string;
  instrumentId: string;
  title: string;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  status: "draft" | "submitted" | "approved" | "published" | "rejected";
  revenueShare: number;     // e.g. 0.70 = 70% to creator
  sales: number;
  totalRevenueUsd: number;
  createdAt: string;
  publishedAt?: string;
}

export interface ProctoredExamSession {
  id: string;
  userId: string;
  examId: string;
  instrumentId: string;
  tier: "standard" | "pro" | "genius";
  scheduledAt: string;
  completedAt?: string;
  proctorId?: string;
  status: "scheduled" | "in_progress" | "passed" | "failed" | "cancelled";
  videoUrl?: string;
  proctorNotes?: string;
  feeUsd: number;           // $29 / $49 / $99 per tier
}

export interface LiveSlot {
  id: string;
  teacherId: string;
  startAt: string;
  durationMin: number;
  priceUsd: number;
  status: "available" | "booked" | "completed";
  studentId?: string;
  meetingUrl?: string;
}
