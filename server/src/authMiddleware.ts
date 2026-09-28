/**
 * Authentication middleware — establishes *who* is calling. It never decides
 * what they may do; routes do that with the helpers in authz.ts.
 *
 * - SUPABASE_JWT_SECRET set: identity comes only from a verified Supabase JWT
 *   (HS256). The `x-user-id` header is ignored — it is trivially spoofable.
 * - No secret (local dev only): an unverified JWT or `x-user-id` is accepted
 *   so the app works without Supabase; req.user.verified is false.
 * - NODE_ENV=production without a secret refuses to boot (assertAuthConfig).
 * - STRICT_AUTH=true additionally rejects every non-public request without a
 *   verified identity (for deployments with no anonymous use at all).
 */
import type { Request, Response, NextFunction } from "express";
import { createHmac, timingSafeEqual } from "node:crypto";
import { identify } from "./userDirectory.js";
import { sendWelcomeEmail } from "./observability.js";

/** Paths that skip auth entirely. Prefix-matched. */
const PUBLIC_PATHS = [
  "/api/v1/health",
  "/api/v1/monetization/status",
  "/api/v1/billing/webhook/stripe",
  "/auth/callback",
];

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string; email?: string; verified: boolean };
  }
}

/** Refuse to serve production traffic without a way to verify identity. */
export function assertAuthConfig(): void {
  if (process.env.NODE_ENV === "production" && !process.env.SUPABASE_JWT_SECRET) {
    throw new Error(
      "SUPABASE_JWT_SECRET must be set when NODE_ENV=production — without it the server cannot verify who is calling.",
    );
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (isPublic(req.path)) return next();
  const secret = process.env.SUPABASE_JWT_SECRET;
  const strict = process.env.STRICT_AUTH === "true";

  const token = extractBearer(req);
  if (token) {
    const payload = secret ? verifyJwt(token, secret) : decodePayload(token);
    if (payload?.sub) {
      req.user = { id: payload.sub, email: payload.email, verified: Boolean(secret) };
      // Populate the user directory + trigger first-time welcome email.
      // Fire-and-forget so request latency isn't tied to email SMTP.
      if (secret) void recordIdentity(payload.sub, payload.email, payload.user_metadata?.display_name ?? payload.name);
      return next();
    }
  }

  if (strict) return res.status(401).json({ ok: false, error: "unauthorized" });

  // Local dev without Supabase: trust the device id the client sends.
  if (!secret) {
    const uid = (req.headers["x-user-id"] as string) || "";
    if (uid && uid !== "anon") req.user = { id: uid, verified: false };
  }

  // Anonymous callers continue; routes that need a user return 401.
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
 * (Projects on asymmetric signing keys need JWKS verification — Phase 3.)
 */
function verifyJwt(token: string, secret: string): { sub: string; email?: string; exp?: number; [k: string]: any } | null {
  try {
    const [headerB64, payloadB64, sigB64] = token.split(".");
    if (!headerB64 || !payloadB64 || !sigB64) return null;
    const header = JSON.parse(b64urlDecode(headerB64));
    if (header.alg !== "HS256") return null;

    const expected = createHmac("sha256", secret)
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
