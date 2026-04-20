/**
 * Server-side observability. Wraps Sentry (error tracking), PostHog
 * (product analytics), and Resend (transactional email) behind a clean
 * interface so service modules don't care whether each is configured.
 *
 * All three are optional. Missing env vars → no-op + stdout log. Real
 * SDKs are loaded lazily on first use so flatfile/dev deployments stay
 * friction-free.
 *
 *   SENTRY_DSN=...
 *   POSTHOG_API_KEY=... (+ optional POSTHOG_HOST)
 *   RESEND_API_KEY=... (+ RESEND_FROM="MusicLuv <noreply@…>")
 */

const SENTRY_DSN = process.env.SENTRY_DSN;
const POSTHOG_KEY = process.env.POSTHOG_API_KEY;
const POSTHOG_HOST = process.env.POSTHOG_HOST || "https://us.i.posthog.com";
const RESEND_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM || "MusicLuv <noreply@musicluv.app>";

// ── Sentry (error tracking) ───────────────────────────────────────────

let sentryReady: Promise<any> | null = null;

async function getSentry() {
  if (!SENTRY_DSN) return null;
  if (sentryReady) return sentryReady;
  sentryReady = (async () => {
    try {
      const Sentry = await import("@sentry/node");
      Sentry.init({
        dsn: SENTRY_DSN,
        tracesSampleRate: 0.1,
        environment: process.env.NODE_ENV ?? "development",
      });
      return Sentry;
    } catch (err) {
      console.warn("[sentry] @sentry/node not installed; capture will log to stdout", err);
      return null;
    }
  })();
  return sentryReady;
}

/** Capture an error for Sentry. Accepts either Error or string. */
export function captureError(err: Error | string, ctx?: Record<string, unknown>): void {
  const message = typeof err === "string" ? err : `${err.name}: ${err.message}`;
  const stack = typeof err === "string" ? undefined : err.stack;
  console.error("[error]", message, ctx ?? "", stack ?? "");
  void getSentry().then((Sentry) => {
    if (!Sentry) return;
    if (typeof err === "string") {
      Sentry.captureMessage(err, { extra: ctx });
    } else {
      Sentry.captureException(err, { extra: ctx });
    }
  });
}

// ── PostHog (product analytics) ───────────────────────────────────────

let posthogClient: any = null;
let posthogReady: Promise<any> | null = null;

async function getPostHog() {
  if (!POSTHOG_KEY) return null;
  if (posthogClient) return posthogClient;
  if (posthogReady) return posthogReady;
  posthogReady = (async () => {
    try {
      const { PostHog } = await import("posthog-node");
      posthogClient = new PostHog(POSTHOG_KEY!, { host: POSTHOG_HOST });
      return posthogClient;
    } catch (err) {
      console.warn("[posthog] posthog-node not installed; tracking will log to stdout", err);
      return null;
    }
  })();
  return posthogReady;
}

/** Track an anonymous / identified product event. */
export async function track(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>,
): Promise<void> {
  console.log("[analytics]", distinctId, event, properties ?? "");
  const ph = await getPostHog();
  if (!ph) return;
  try {
    ph.capture({ distinctId, event, properties });
  } catch (err) {
    captureError(err as Error, { where: "posthog.track", event });
  }
}

// ── Resend (transactional email) ──────────────────────────────────────

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

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

// ── Welcome email + proctor-confirmation templates ────────────────────

export async function sendWelcomeEmail(to: string, displayName: string): Promise<void> {
  await sendEmail({
    to,
    subject: "Welcome to MusicLuv 🎵",
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
        <h1 style="margin-bottom:8px">Welcome, ${escapeHtml(displayName)}.</h1>
        <p>You're in. MusicLuv takes you from novice to genius across 22 instruments — nine levels, one clean arc.</p>
        <p>During our launch promo you've got <strong>Genius-equivalent access</strong>, free. No card needed.</p>
        <p style="margin-top:24px">
          <a href="https://musicluv.app/studio" style="background:#6366f1;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;display:inline-block">Open the studio →</a>
        </p>
        <p style="color:#666;font-size:12px;margin-top:32px">You're receiving this because you signed up. Manage preferences in Settings.</p>
      </div>
    `,
    text: `Welcome to MusicLuv, ${displayName}. Open the studio: https://musicluv.app/studio`,
  });
}

export async function sendProctorConfirmationEmail(
  to: string,
  details: { instrument: string; tier: string; scheduledAt: string; meetingUrl: string },
): Promise<void> {
  await sendEmail({
    to,
    subject: `Your ${details.tier} certificate exam is confirmed`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
        <h1>Exam confirmed 🏆</h1>
        <p><strong>${details.instrument} · ${details.tier}</strong></p>
        <p>Scheduled for <strong>${details.scheduledAt}</strong>.</p>
        <p>Join the proctor room 5 minutes early:</p>
        <p><a href="${details.meetingUrl}" style="background:#6366f1;color:white;padding:10px 20px;border-radius:8px;text-decoration:none">Join proctor room →</a></p>
        <p style="color:#666;font-size:12px">Cancel up to 24 hours in advance for a full refund.</p>
      </div>
    `,
  });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } as any)[c],
  );
}
