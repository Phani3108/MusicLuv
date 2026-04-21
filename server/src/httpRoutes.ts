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
  createConnectAccountLink,
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
import {
  listCompositionsForUser, listReviewQueue, submitComposition, reviewComposition,
} from "./compositionService.js";
import { scoreStyleMatch, type AttemptFeatures } from "./styleFingerprint.js";
import { ARTISTS } from "@catalogs/artistCatalog";
import {
  listExperts, getExpert, expertsForInstrument,
  expertNotesForLesson, masterclassesForLesson, upcomingLiveSessions,
} from "@catalogs/expertCatalog";

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

  app.post("/api/v1/billing/cancel", async (req, res) => {
    const userId = (req.headers["x-user-id"] as string) || "anon";
    const record = await cancelSubscription(userId);
    res.json({ ok: true, subscription: record });
  });

  // NOTE: webhook raw-body middleware is mounted in server/src/index.ts
  // *before* express.json so stripe.webhooks.constructEvent can verify
  // the signature against the exact byte stream. Do not add JSON
  // parsing here.
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
  app.post("/api/v1/creator/stripe-connect", async (req, res) => {
    const userId = req.user?.id ?? (req.headers["x-user-id"] as string) ?? "anon";
    const email = (req.body?.email as string) || req.user?.email;
    try {
      const result = await createConnectAccountLink(userId, email);
      res.json({ ok: true, ...result });
    } catch (e) {
      res.status(500).json({ ok: false, error: (e as Error).message });
    }
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

  // ── Compositions (Genius tier human review) ───────────────────────
  app.get("/api/v1/compositions/:userId", (req, res) => {
    res.json({ ok: true, compositions: listCompositionsForUser(req.params.userId) });
  });
  app.post("/api/v1/compositions", (req, res) => {
    res.json({ ok: true, composition: submitComposition(req.body) });
  });
  app.get("/api/v1/compositions/admin/queue", (req, res) => {
    const adminToken = (req.headers["x-admin-token"] as string) || "";
    if (!process.env.ADMIN_TOKEN || adminToken !== process.env.ADMIN_TOKEN) {
      return res.status(403).json({ ok: false, error: "forbidden" });
    }
    res.json({ ok: true, compositions: listReviewQueue() });
  });
  app.patch("/api/v1/compositions/:id/review", (req, res) => {
    const { reviewerId, status, notes, rubric } = req.body ?? {};
    const updated = reviewComposition(req.params.id, reviewerId, status, notes, rubric);
    if (!updated) return res.status(404).json({ ok: false });
    res.json({ ok: true, composition: updated });
  });

  // ── Style fingerprint match ───────────────────────────────────────
  app.post("/api/v1/style/match", (req, res) => {
    const { artistId, features } = req.body as { artistId: string; features: AttemptFeatures };
    const artist = ARTISTS[artistId];
    if (!artist) return res.status(404).json({ ok: false, error: "unknown_artist" });
    const result = scoreStyleMatch(artist, features);
    res.json({ ok: true, artistId, ...result });
  });

  // ── Experts ───────────────────────────────────────────────────────
  app.get("/api/v1/experts", (req, res) => {
    const instrument = (req.query.instrument as string) || undefined;
    const list = instrument ? expertsForInstrument(instrument) : listExperts();
    res.json({ ok: true, experts: list });
  });
  app.get("/api/v1/experts/:id", (req, res) => {
    const expert = getExpert(req.params.id);
    if (!expert) return res.status(404).json({ ok: false, error: "not_found" });
    res.json({ ok: true, expert });
  });
  app.get("/api/v1/experts/notes/:lessonId", (req, res) => {
    const phase = (req.query.phase as any) || undefined;
    res.json({ ok: true, notes: expertNotesForLesson(req.params.lessonId, phase) });
  });
  app.get("/api/v1/experts/masterclasses/:lessonId", (req, res) => {
    res.json({ ok: true, masterclasses: masterclassesForLesson(req.params.lessonId) });
  });
  app.get("/api/v1/experts/live-sessions", (req, res) => {
    const instrument = (req.query.instrument as string) || undefined;
    res.json({ ok: true, sessions: upcomingLiveSessions(instrument) });
  });

  // ── URL ingest (yt-dlp stub) ──────────────────────────────────────
  app.post("/api/v1/uploads/from-url", async (req, res) => {
    const { url, instrumentId, level } = req.body as { url: string; instrumentId: string; level: number };
    if (!url || !instrumentId) return res.status(400).json({ ok: false, error: "missing_fields" });

    // Production: spawn yt-dlp, download audio, forward to audio-engine /transcribe.
    // For now: stub response so the UX flow works end-to-end while we wire yt-dlp.
    if (process.env.YT_DLP_ENABLED !== "true") {
      return res.status(501).json({
        ok: false,
        error: "url_ingest_pending",
        message:
          "URL ingest (yt-dlp) is not enabled on this server. Set YT_DLP_ENABLED=true + install " +
          "yt-dlp to enable. In the meantime, download the audio locally and upload via the file picker.",
      });
    }

    try {
      // TODO: real yt-dlp invocation + stream to audio-engine:
      //   const tmp = await ytDlp.download(url);
      //   const form = new FormData(); form.append("audio", tmp); ...
      //   const r = await fetch(`${AUDIO_ENGINE}/transcribe`, { method: "POST", body: form });
      res.json({ ok: true, jobId: `yt_${Date.now()}`, level, instrumentId, url });
    } catch (e) {
      res.status(500).json({ ok: false, error: (e as Error).message });
    }
  });
}
