import express from "express";
import cors from "cors";
import { registerRoutes } from "./httpRoutes.js";
import { authMiddleware } from "./authMiddleware.js";
import { captureError } from "./observability.js";
import { applyMigrations } from "./persistence/migrate.js";
import { startDigestScheduler } from "./digestScheduler.js";

const app = express();

// Global error safety net — don't crash the process on unhandled errors;
// log them via the observability pipe instead so we see them in prod.
process.on("unhandledRejection", (reason) => {
  captureError(reason instanceof Error ? reason : new Error(String(reason)), { source: "unhandledRejection" });
});
process.on("uncaughtException", (err) => {
  captureError(err, { source: "uncaughtException" });
});

app.use(
  cors({
    origin: (process.env.CORS_ORIGINS || "http://localhost:5173").split(","),
    credentials: false,
  })
);

// Stripe webhook must see the raw body so constructEvent can verify
// the HMAC signature against the exact byte stream. Mount raw-body
// middleware scoped ONLY to the webhook path — everything else uses
// JSON parsing below.
app.use("/api/v1/billing/webhook/stripe", express.raw({ type: "application/json" }));

app.use(express.json({ limit: "4mb" }));

// Auth gate before any route. Respects PUBLIC_PATHS whitelist + in
// dev/promo mode falls back to x-user-id. When STRICT_AUTH=true in
// prod, every non-public route requires a valid Supabase JWT.
app.use(authMiddleware);

registerRoutes(app);

// 404 fallthrough
app.use((req, res) => res.status(404).json({ ok: false, error: "not_found", path: req.path }));

const PORT = Number(process.env.PORT || 8000);

// Boot sequence: run migrations (Postgres only), start digest scheduler,
// then bind the listener. Migrations are awaited so the server doesn't
// accept traffic against a stale schema. Digest scheduler is fire-and-
// forget — it won't block boot if Resend or the in-memory user
// directory aren't ready yet.
async function boot(): Promise<void> {
  if ((process.env.PERSISTENCE_DRIVER || "").toLowerCase() === "postgres") {
    try {
      const result = await applyMigrations();
      console.log(`[migrate] applied ${result.applied} migration(s); ${result.skipped} skipped`);
    } catch (err) {
      // Don't crash the process — we'd rather serve traffic against
      // existing schema than refuse to start. Sentry catches it.
      captureError(err as Error, { where: "boot.applyMigrations" });
      console.error("[migrate] failed at boot:", (err as Error).message);
    }
  }

  startDigestScheduler();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[musicluv-server] listening on http://0.0.0.0:${PORT}`);
  });
}

void boot();
