import express from "express";
import cors from "cors";
import { registerRoutes } from "./httpRoutes.js";
import { authMiddleware } from "./authMiddleware.js";
import { captureError } from "./observability.js";

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
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[musicluv-server] listening on http://0.0.0.0:${PORT}`);
});
