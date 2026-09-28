/**
 * Route-level authorization. `authMiddleware` only establishes *who* is
 * calling (req.user); these helpers decide whether they may do *this*.
 * Every helper sends the 401/403 itself and returns a falsy value, so a
 * handler reads: `const userId = requireUser(req, res); if (!userId) return;`
 */
import type { Request, Response } from "express";
import { timingSafeEqual } from "node:crypto";

/** The caller's user id, or null after responding 401. */
export function requireUser(req: Request, res: Response): string | null {
  const id = req.user?.id;
  if (!id) {
    res.status(401).json({ ok: false, error: "unauthorized" });
    return null;
  }
  return id;
}

/** True when the request carries the operator's ADMIN_TOKEN. */
export function isAdmin(req: Request): boolean {
  const expected = process.env.ADMIN_TOKEN;
  const given = (req.headers["x-admin-token"] as string) || "";
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function requireAdmin(req: Request, res: Response): boolean {
  if (isAdmin(req)) return true;
  res.status(403).json({ ok: false, error: "forbidden" });
  return false;
}

/** Caller must be `userId` (or an admin). Sends 401/403 otherwise. */
export function requireSelfOrAdmin(req: Request, res: Response, userId: string): boolean {
  if (isAdmin(req)) return true;
  const callerId = requireUser(req, res);
  if (!callerId) return false;
  if (callerId !== userId) {
    res.status(403).json({ ok: false, error: "forbidden" });
    return false;
  }
  return true;
}
