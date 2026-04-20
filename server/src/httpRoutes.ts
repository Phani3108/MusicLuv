import type { Express, Request, Response } from "express";
import multer from "multer";
import { proxyGrade, audioEngineHealth } from "./gradingClient.js";
import { answerAsMentor, cannedMentorLine } from "./llm/mentorService.js";
import { getProgress, recordAttempt, updateProgress } from "./progressStore.js";
import { listProviders } from "./llm/providerCatalog.js";
import { guardStats } from "./llm/costGuards.js";
import { memoryStats } from "./llm/memoryStore.js";
import { createRateLimiter } from "./rateLimiter.js";
import {
  getSubscription, setSubscription, createCheckoutSession,
  handleStripeWebhook, verifyIapReceipt, cancelSubscription,
} from "./billingService.js";
import type { PlanTier } from "@catalogs/planCatalog";
import {
  listPublicRecitals, listRecitalsForUser, createRecital, likeRecital,
  listComments, addComment, getProfile, upsertProfile,
  listAssignmentsForTeacher, listAssignmentsForStudent, createAssignment, updateAssignmentStatus,
  listCreatorLessonsFor, submitCreatorLesson, reviewCreatorLesson,
  listProctoredForUser, scheduleProctored, completeProctored,
  listAvailableLiveSlots, listLiveSlotsForTeacher, bookLiveSlot,
} from "./communityService.js";
import {
  getPublicStatus as getMonetizationStatus,
  isMonetizationActive,
  manuallyActivateMonetization,
  recordUserSeen,
} from "./monetizationGate.js";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

// Generous rate limits for dev; tighten in prod.
const gradeLimiter = createRateLimiter(60, 60_000);    // 60/min/user
const mentorLimiter = createRateLimiter(30, 60_000);   // 30/min/user

export function registerRoutes(app: Express): void {
  // ── Monetization gate ──────────────────────────────────────────────
  // Public — the client queries this at boot to render the launch promo
  // ($5 Pro with $7 strikethrough + "Free for first 200 users" badge).
  app.get("/api/v1/monetization/status", (_req, res) => {
    res.json({ ok: true, ...getMonetizationStatus() });
  });

  app.post("/api/v1/monetization/admin/activate", (req, res) => {
    const adminToken = (req.headers["x-admin-token"] as string) || "";
    if (!process.env.ADMIN_TOKEN || adminToken !== process.env.ADMIN_TOKEN) {
      return res.status(403).json({ ok: false, error: "forbidden" });
    }
    const state = manuallyActivateMonetization();
    res.json({ ok: true, state });
  });

  // Convenience: every authenticated request can register the user via this
  // POST (called by the client on login / onboarding completion). Safe to
  // call multiple times — idempotent.
  app.post("/api/v1/monetization/seen", (req, res) => {
    const userId = (req.headers["x-user-id"] as string) || "anon";
    if (userId === "anon") return res.json({ ok: false, error: "no_user" });
    const state = recordUserSeen(userId);
    res.json({ ok: true, userCount: state.userCount, active: isMonetizationActive() });
  });

  // ── Health ─────────────────────────────────────────────────────────
  app.get("/api/v1/health", async (_req, res) => {
    const engine = await audioEngineHealth();
    res.json({
      ok: true,
      service: "musicluv-server",
      version: "0.1.0",
      audioEngine: engine,
      llm: {
        providers: listProviders(),
        active: listProviders().find((p) => p.id === (process.env.LLM_PROVIDER || "auto")) || listProviders()[0],
      },
      guards: guardStats(),
      memory: memoryStats(),
    });
  });

  // ── Grade proxy ────────────────────────────────────────────────────
  app.post("/api/v1/grade", upload.single("audio"), async (req: Request, res: Response) => {
    const userId = (req.headers["x-user-id"] as string) || "anon";
    if (gradeLimiter(userId)) return res.status(429).json({ ok: false, error: "rate_limited" });
    if (userId !== "anon") recordUserSeen(userId);
    if (!req.file) return res.status(400).json({ ok: false, error: "no_audio" });
    if (!req.body?.meta) return res.status(400).json({ ok: false, error: "no_meta" });

    try {
      const { status, body } = await proxyGrade(req.file.buffer, req.file.originalname || "attempt.wav", req.body.meta);

      // Side-effect: persist the attempt against the user + instrument.
      if (status === 200 && body.composite != null && body.dimensions && body.passed != null) {
        try {
          const meta = JSON.parse(req.body.meta);
          const instrumentId = meta.instrumentId || "piano";
          const lessonId = meta.lessonId || meta.exerciseId;
          recordAttempt(userId, instrumentId, lessonId, {
            composite: body.composite,
            passed: body.passed,
            dimensions: body.dimensions,
            xpAwarded: body.xpAwarded ?? 0,
          });
        } catch {
          // meta parse failure shouldn't break grading response
        }
      }

      res.status(status).json(body);
    } catch (e) {
      console.error("[grade] proxy failed:", (e as Error).message);
      res.status(502).json({ ok: false, error: "engine_unavailable", detail: (e as Error).message });
    }
  });

  // ── Mentor chat ────────────────────────────────────────────────────
  // Client sends the mentor persona + optional lesson context; we wrap LLM
  // calls with cost guards + per-(mentor,user) memory.
  app.post("/api/v1/mentor/message", async (req: Request, res: Response) => {
    const userId = (req.headers["x-user-id"] as string) || "anon";
    if (mentorLimiter(userId)) return res.status(429).json({ ok: false, error: "rate_limited" });
    if (userId !== "anon") recordUserSeen(userId);

    const { mentor, userName, lesson, recent, message } = req.body ?? {};
    if (!mentor?.id || !message) return res.status(400).json({ ok: false, error: "missing_fields" });

    const reply = await answerAsMentor({ mentor, userId, userName, lesson, recent, message });
    if (reply.ok) {
      res.json(reply);
    } else {
      res.json({
        ok: true,
        text: cannedMentorLine(mentor.defaultLines),
        channel: "fallback",
        reason: reply.reason,
      });
    }
  });

  // ── Progress ───────────────────────────────────────────────────────
  app.get("/api/v1/progress", (req: Request, res: Response) => {
    const userId = (req.headers["x-user-id"] as string) || "anon";
    res.json({ ok: true, progress: getProgress(userId) });
  });

  app.post("/api/v1/progress", (req: Request, res: Response) => {
    const userId = (req.headers["x-user-id"] as string) || "anon";
    const next = updateProgress(userId, req.body ?? {});
    res.json({ ok: true, progress: next });
  });

  // ── Billing ────────────────────────────────────────────────────────
  app.get("/api/v1/billing/subscription", (req, res) => {
    const userId = (req.headers["x-user-id"] as string) || "anon";
    res.json({ ok: true, subscription: getSubscription(userId) });
  });

  app.post("/api/v1/billing/checkout", async (req, res) => {
    const userId = (req.headers["x-user-id"] as string) || "anon";
    const { planId, cycle } = req.body as { planId: PlanTier; cycle: "monthly" | "yearly" };
    try {
      const session = await createCheckoutSession(userId, planId, cycle);
      res.json({ ok: true, ...session });
    } catch (e) {
      res.status(400).json({ ok: false, error: (e as Error).message });
    }
  });

  app.post("/api/v1/billing/iap/verify", async (req, res) => {
    const userId = (req.headers["x-user-id"] as string) || "anon";
    const { provider, receipt, planId } = req.body as { provider: "appstore" | "playstore"; receipt: string; planId: PlanTier };
    try {
      const record = await verifyIapReceipt(userId, provider, receipt, planId);
      res.json({ ok: true, subscription: record });
    } catch (e) {
      res.status(400).json({ ok: false, error: (e as Error).message });
    }
  });

  app.post("/api/v1/billing/cancel", (req, res) => {
    const userId = (req.headers["x-user-id"] as string) || "anon";
    const record = cancelSubscription(userId);
    res.json({ ok: true, subscription: record });
  });

  app.post("/api/v1/billing/webhook/stripe", (req, res) => {
    void handleStripeWebhook(req, res);
  });

  // ── Community · Recitals + comments ───────────────────────────────
  app.get("/api/v1/recitals", (req, res) => {
    const { userId } = req.query as { userId?: string };
    res.json({ ok: true, recitals: userId ? listRecitalsForUser(userId) : listPublicRecitals() });
  });
  app.post("/api/v1/recitals", (req, res) => {
    const record = req.body;
    res.json({ ok: true, recital: createRecital(record) });
  });
  app.post("/api/v1/recitals/:id/like", (req, res) => {
    const r = likeRecital(req.params.id);
    if (!r) return res.status(404).json({ ok: false });
    res.json({ ok: true, recital: r });
  });
  app.get("/api/v1/recitals/:id/comments", (req, res) => {
    res.json({ ok: true, comments: listComments(req.params.id) });
  });
  app.post("/api/v1/recitals/:id/comments", (req, res) => {
    const comment = { ...req.body, recitalId: req.params.id };
    res.json({ ok: true, comment: addComment(comment) });
  });

  // ── Community · Profiles ──────────────────────────────────────────
  app.get("/api/v1/profiles/:userId", (req, res) => {
    const p = getProfile(req.params.userId);
    if (!p) return res.status(404).json({ ok: false });
    res.json({ ok: true, profile: p });
  });
  app.put("/api/v1/profiles/:userId", (req, res) => {
    res.json({ ok: true, profile: upsertProfile({ ...req.body, userId: req.params.userId }) });
  });

  // ── Community · Teacher assignments ───────────────────────────────
  app.get("/api/v1/teacher/:teacherId/assignments", (req, res) => {
    res.json({ ok: true, assignments: listAssignmentsForTeacher(req.params.teacherId) });
  });
  app.get("/api/v1/student/:studentId/assignments", (req, res) => {
    res.json({ ok: true, assignments: listAssignmentsForStudent(req.params.studentId) });
  });
  app.post("/api/v1/teacher/assignments", (req, res) => {
    res.json({ ok: true, assignment: createAssignment(req.body) });
  });
  app.patch("/api/v1/teacher/assignments/:id", (req, res) => {
    const updated = updateAssignmentStatus(req.params.id, req.body.status);
    if (!updated) return res.status(404).json({ ok: false });
    res.json({ ok: true, assignment: updated });
  });

  // ── Community · Creator portal ────────────────────────────────────
  app.get("/api/v1/creator/:creatorId/lessons", (req, res) => {
    res.json({ ok: true, lessons: listCreatorLessonsFor(req.params.creatorId) });
  });
  app.post("/api/v1/creator/lessons", (req, res) => {
    res.json({ ok: true, lesson: submitCreatorLesson(req.body) });
  });
  app.patch("/api/v1/creator/lessons/:id/review", (req, res) => {
    const updated = reviewCreatorLesson(req.params.id, req.body.status);
    if (!updated) return res.status(404).json({ ok: false });
    res.json({ ok: true, lesson: updated });
  });

  // ── Community · Proctored exams ───────────────────────────────────
  app.get("/api/v1/proctored/:userId", (req, res) => {
    res.json({ ok: true, sessions: listProctoredForUser(req.params.userId) });
  });
  app.post("/api/v1/proctored/schedule", (req, res) => {
    res.json({ ok: true, session: scheduleProctored(req.body) });
  });
  app.patch("/api/v1/proctored/:id/complete", (req, res) => {
    const updated = completeProctored(req.params.id, req.body.status, req.body.proctorNotes);
    if (!updated) return res.status(404).json({ ok: false });
    res.json({ ok: true, session: updated });
  });

  // ── Community · Live lessons marketplace ──────────────────────────
  app.get("/api/v1/live/available", (_req, res) => {
    res.json({ ok: true, slots: listAvailableLiveSlots() });
  });
  app.get("/api/v1/live/teacher/:teacherId", (req, res) => {
    res.json({ ok: true, slots: listLiveSlotsForTeacher(req.params.teacherId) });
  });
  app.post("/api/v1/live/:slotId/book", (req, res) => {
    const { studentId, meetingUrl } = req.body as { studentId: string; meetingUrl: string };
    const slot = bookLiveSlot(req.params.slotId, studentId, meetingUrl);
    if (!slot) return res.status(409).json({ ok: false, error: "unavailable" });
    res.json({ ok: true, slot });
  });
}
