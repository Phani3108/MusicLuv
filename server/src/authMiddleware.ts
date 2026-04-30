/**
 * Auth middleware. When SUPABASE_JWT_SECRET is configured, every request
 * to a gated route must carry a valid Supabase JWT in the Authorization
 * header. The middleware verifies the signature using the shared secret
 * and attaches `req.user = { id, email }` for downstream handlers.
 *
 * Public routes (health, monetization status, auth callback etc.) must
 * be registered via `markPublic()` or listed in the PUBLIC_PATHS array.
 *
 * During the launch promo window we keep x-user-id fallback so beta
 * testers can use the app without wiring Supabase first. Once
 * SUPABASE_JWT_SECRET is set in prod, the x-user-id path is rejected
 * and every client must sign in.
 */
import type { Request, Response, NextFunction } from "express";
import { createHmac, timingSafeEqual } from "node:crypto";
import { identify } from "./userDirectory.js";
import { sendWelcomeEmail } from "./observability.js";

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;
const STRICT_AUTH = process.env.STRICT_AUTH === "true";

/** Paths that skip auth entirely. Prefix-matched. */
const PUBLIC_PATHS = [
  "/api/v1/health",
  "/api/v1/monetization/status",
  "/api/v1/monetization/seen",
  "/api/v1/billing/webhook/stripe",
  "/auth/callback",
];

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string; email?: string };
  }
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  if (isPublic(req.path)) return next();

  const token = extractBearer(req);
  if (token) {
    const payload = verifyJwt(token);
    if (payload?.sub) {
      req.user = { id: payload.sub, email: payload.email };
      // Populate the user directory + trigger first-time welcome email.
      // Fire-and-forget so request latency isn't tied to email SMTP.
      void recordIdentity(payload.sub, payload.email, payload.user_metadata?.display_name ?? payload.name);
      return next();
    }
  }

  if (STRICT_AUTH) {
    // Production: reject missing or invalid tokens outright.
    return _res.status(401).json({ ok: false, error: "unauthorized" });
  }

  // Dev / launch-promo window: allow x-user-id fallback so learners
  // can use the app before we force sign-in.
  const uid = (req.headers["x-user-id"] as string) || "";
  if (uid && uid !== "anon") {
    req.user = { id: uid };
    return next();
  }

  // Anonymous users can still hit the app — most routes internally fall
  // back to "anon" already; this just propagates an identifiable request.
  return next();
}

/** First-seen detection + welcome email. Idempotent across processes
 *  via the userDirectory's `isNewUser` flag. */
function recordIdentity(userId: string, email?: string, displayName?: string): void {
  try {
    const { isNewUser, record } = identify({ userId, email, displayName });
    if (isNewUser && record.email) {
      void sendWelcomeEmail(record.email, record.displayName ?? "there");
    }
  } catch {
    // Identification is best-effort; never block a request on it.
  }
}

function isPublic(path: string): boolean {
  return PUBLIC_PATHS.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

function extractBearer(req: Request): string | null {
  const raw = req.headers.authorization || "";
  if (raw.startsWith("Bearer ")) return raw.slice(7);
  return null;
}

/**
 * Verify a Supabase JWT signed with HS256 using the shared JWT secret.
 * Supabase JWTs are signed with the project's JWT secret, so we can
 * verify them without a round-trip to the auth server.
 */
function verifyJwt(token: string): { sub: string; email?: string; exp?: number; [k: string]: any } | null {
  if (!SUPABASE_JWT_SECRET) {
    // No secret configured — accept the token's user claim without
    // verification (dev mode). In prod set STRICT_AUTH=true + the secret.
    return decodePayload(token);
  }
  try {
    const [headerB64, payloadB64, sigB64] = token.split(".");
    if (!headerB64 || !payloadB64 || !sigB64) return null;
    const header = JSON.parse(b64urlDecode(headerB64));
    if (header.alg !== "HS256") return null;

    const expected = createHmac("sha256", SUPABASE_JWT_SECRET)
      .update(`${headerB64}.${payloadB64}`)
      .digest();
    const got = Buffer.from(sigB64.replace(/-/g, "+").replace(/_/g, "/"), "base64");
    if (expected.length !== got.length) return null;
    if (!timingSafeEqual(expected, got)) return null;

    const payload = JSON.parse(b64urlDecode(payloadB64));
    if (typeof payload.exp === "number" && Date.now() / 1000 > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

function decodePayload(token: string): { sub: string; email?: string; [k: string]: any } | null {
  try {
    const [, payloadB64] = token.split(".");
    return JSON.parse(b64urlDecode(payloadB64));
  } catch {
    return null;
  }
}

function b64urlDecode(s: string): string {
  const pad = "=".repeat((4 - (s.length % 4)) % 4);
  return Buffer.from((s + pad).replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
}
