/**
 * Server-side observability. Thin wrapper around Sentry + PostHog + a
 * simple Resend email client so service modules don't need to know
 * whether each provider is configured.
 *
 * All three are optional — if env vars are missing, the helpers are
 * no-ops and log to stdout instead. That keeps local dev friction-free
 * while letting prod flip them on by setting:
 *   SENTRY_DSN=...
 *   POSTHOG_API_KEY=...    (+ optional POSTHOG_HOST)
 *   RESEND_API_KEY=...     (+ RESEND_FROM="MusicLuv <noreply@…>")
 */

const SENTRY_DSN = process.env.SENTRY_DSN;
const POSTHOG_KEY = process.env.POSTHOG_API_KEY;
const POSTHOG_HOST = process.env.POSTHOG_HOST || "https://us.i.posthog.com";
const RESEND_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM || "MusicLuv <noreply@musicluv.app>";

// ── Error tracking ────────────────────────────────────────────────────

/**
 * Capture an error for Sentry. Accepts either an Error or a string.
 * The real Sentry SDK isn't yet a dep — until it is, this pushes to
 * an in-memory buffer + logs. Swap the implementation here when the
 * SDK ships.
 */
export function captureError(err: Error | string, ctx?: Record<string, unknown>): void {
  const message = typeof err === "string" ? err : `${err.name}: ${err.message}`;
  const stack = typeof err === "string" ? undefined : err.stack;
  if (!SENTRY_DSN) {
    console.error("[error]", message, ctx ?? "", stack ?? "");
    return;
  }
  // Production: Sentry.captureException(err, { extra: ctx });
  console.error("[sentry-pending]", message, ctx ?? "", stack ?? "");
}

// ── Product analytics ─────────────────────────────────────────────────

/** Track an anonymous / identified product event to PostHog. */
export async function track(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>,
): Promise<void> {
  if (!POSTHOG_KEY) {
    // Dev mode — just log.
    console.log("[analytics]", distinctId, event, properties ?? "");
    return;
  }
  try {
    await fetch(`${POSTHOG_HOST}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: POSTHOG_KEY,
        event,
        distinct_id: distinctId,
        properties,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (err) {
    captureError(err as Error, { where: "posthog.track", event });
  }
}

// ── Transactional email ───────────────────────────────────────────────

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send a transactional email via Resend. No-ops (just logs) when the
 * API key isn't configured. Used by: welcome, grade-review-ready,
 * payment-receipt flows.
 */
export async function sendEmail(msg: EmailMessage): Promise<void> {
  if (!RESEND_KEY) {
    console.log("[email]", msg.to, "·", msg.subject);
    return;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: msg.to,
        subject: msg.subject,
        html: msg.html,
        text: msg.text,
      }),
    });
    if (!res.ok) throw new Error(`Resend returned HTTP ${res.status}`);
  } catch (err) {
    captureError(err as Error, { where: "resend.send", to: msg.to });
  }
}
