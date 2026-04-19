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

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

// Generous rate limits for dev; tighten in prod.
const gradeLimiter = createRateLimiter(60, 60_000);    // 60/min/user
const mentorLimiter = createRateLimiter(30, 60_000);   // 30/min/user

export function registerRoutes(app: Express): void {
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
}
