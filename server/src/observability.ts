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
    html: shell(
      `<h1>Exam confirmed 🏆</h1>
       <p><strong>${escapeHtml(details.instrument)} · ${escapeHtml(details.tier)}</strong></p>
       <p>Scheduled for <strong>${escapeHtml(details.scheduledAt)}</strong>.</p>
       <p>Join the proctor room 5 minutes early:</p>
       <p>${cta(details.meetingUrl, "Join proctor room")}</p>
       <p style="color:#666;font-size:12px">Cancel up to 24 hours in advance for a full refund.</p>`,
    ),
  });
}

/** Cert earned. Triggered on successful tier-cert exam pass. */
export async function sendCertEarnedEmail(
  to: string,
  details: { displayName: string; instrument: string; tier: string; certificateUrl: string; xpAwarded: number },
): Promise<void> {
  await sendEmail({
    to,
    subject: `🏆 You earned your ${details.tier} certificate on ${details.instrument}`,
    html: shell(
      `<h1>Certificate earned, ${escapeHtml(details.displayName)}.</h1>
       <p>You just passed the <strong>${escapeHtml(details.tier)}</strong> tier on
          <strong>${escapeHtml(details.instrument)}</strong>. That's not nothing.</p>
       <p><strong>+${details.xpAwarded} XP</strong> applied to your profile.</p>
       <p>${cta(details.certificateUrl, "View certificate")}</p>
       <p style="color:#666;font-size:13px;margin-top:24px">
         Share it on LinkedIn — recruiters and music schools recognise MusicLuv certs as
         a real proxy for graded performance.
       </p>`,
    ),
    text: `You earned your ${details.tier} certificate on ${details.instrument}. View: ${details.certificateUrl}`,
  });
}

/** Weekly progress digest. Triggered Sunday 9am local for active learners. */
export async function sendWeeklyProgressEmail(
  to: string,
  details: {
    displayName: string;
    minutesPracticed: number;
    lessonsCompleted: number;
    streakDays: number;
    topInstrument: string;
    nextLessonTitle: string;
    nextLessonUrl: string;
  },
): Promise<void> {
  await sendEmail({
    to,
    subject: `Your week in MusicLuv · ${details.minutesPracticed} min · ${details.streakDays}-day streak`,
    html: shell(
      `<h1>Hi ${escapeHtml(details.displayName)} — here's your week.</h1>
       <table style="width:100%;border-collapse:collapse;margin:16px 0">
         <tr><td style="padding:8px 0;color:#666">Minutes practised</td>
             <td style="padding:8px 0;text-align:right"><strong>${details.minutesPracticed}</strong></td></tr>
         <tr><td style="padding:8px 0;color:#666">Lessons completed</td>
             <td style="padding:8px 0;text-align:right"><strong>${details.lessonsCompleted}</strong></td></tr>
         <tr><td style="padding:8px 0;color:#666">Current streak</td>
             <td style="padding:8px 0;text-align:right"><strong>${details.streakDays} days 🔥</strong></td></tr>
         <tr><td style="padding:8px 0;color:#666">Top instrument</td>
             <td style="padding:8px 0;text-align:right"><strong>${escapeHtml(details.topInstrument)}</strong></td></tr>
       </table>
       <p>Next up: <strong>${escapeHtml(details.nextLessonTitle)}</strong></p>
       <p>${cta(details.nextLessonUrl, "Start the next lesson")}</p>`,
    ),
    text:
      `Your week: ${details.minutesPracticed} min, ${details.lessonsCompleted} lessons, ` +
      `${details.streakDays}-day streak. Next: ${details.nextLessonTitle} ${details.nextLessonUrl}`,
  });
}

/** Community reply notification. Triggered when someone replies to user's recital comment. */
export async function sendCommunityReplyEmail(
  to: string,
  details: { recipientName: string; replierName: string; recitalTitle: string; replyExcerpt: string; threadUrl: string },
): Promise<void> {
  const excerpt = details.replyExcerpt.slice(0, 240);
  await sendEmail({
    to,
    subject: `${details.replierName} replied on ${details.recitalTitle}`,
    html: shell(
      `<h1>New reply on your recital comment</h1>
       <p>${escapeHtml(details.replierName)} replied on
          <strong>${escapeHtml(details.recitalTitle)}</strong>:</p>
       <blockquote style="border-left:3px solid #6366f1;padding:8px 16px;margin:16px 0;color:#444;background:#f8f8ff">
         ${escapeHtml(excerpt)}${details.replyExcerpt.length > 240 ? "…" : ""}
       </blockquote>
       <p>${cta(details.threadUrl, "View the thread")}</p>`,
    ),
    text: `${details.replierName} replied on "${details.recitalTitle}": ${excerpt}\n\nView: ${details.threadUrl}`,
  });
}

/** Billing receipt. Triggered after a successful Stripe payment. */
export async function sendBillingReceiptEmail(
  to: string,
  details: { displayName: string; planName: string; amountUsd: number; nextBillingDate: string; manageBillingUrl: string },
): Promise<void> {
  await sendEmail({
    to,
    subject: `Receipt · MusicLuv ${details.planName}`,
    html: shell(
      `<h1>Thanks, ${escapeHtml(details.displayName)}.</h1>
       <p>Your <strong>${escapeHtml(details.planName)}</strong> subscription is active.</p>
       <table style="width:100%;border-collapse:collapse;margin:16px 0">
         <tr><td style="padding:6px 0;color:#666">Charged</td>
             <td style="padding:6px 0;text-align:right">$${details.amountUsd.toFixed(2)} USD</td></tr>
         <tr><td style="padding:6px 0;color:#666">Next billing</td>
             <td style="padding:6px 0;text-align:right">${escapeHtml(details.nextBillingDate)}</td></tr>
       </table>
       <p>${cta(details.manageBillingUrl, "Manage billing")}</p>
       <p style="color:#666;font-size:12px">Cancel any time. Pro-rated refunds within 14 days of upgrade.</p>`,
    ),
  });
}

/** Password reset link. */
export async function sendPasswordResetEmail(
  to: string,
  details: { resetUrl: string; expiresMinutes: number },
): Promise<void> {
  await sendEmail({
    to,
    subject: "Reset your MusicLuv password",
    html: shell(
      `<h1>Reset your password</h1>
       <p>Click below to set a new password. Link expires in
          <strong>${details.expiresMinutes} minutes</strong>.</p>
       <p>${cta(details.resetUrl, "Reset password")}</p>
       <p style="color:#666;font-size:12px">Didn't request this? Ignore — your password stays the same.</p>`,
    ),
    text: `Reset your password (expires in ${details.expiresMinutes} min): ${details.resetUrl}`,
  });
}

/** Common shell — same chrome on every email so they feel like one product. */
function shell(inner: string): string {
  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1a1a1a;line-height:1.55">
      <div style="font-size:13px;color:#6366f1;letter-spacing:1px;margin-bottom:24px">MUSICLUV</div>
      ${inner}
      <hr style="border:none;border-top:1px solid #eee;margin:32px 0 16px" />
      <p style="color:#999;font-size:11px">
        You're receiving this because you have an account at musicluv.app.
        <a href="https://musicluv.app/settings" style="color:#999">Manage email preferences</a>.
      </p>
    </div>`;
}

function cta(url: string, label: string): string {
  return `<a href="${url}" style="background:#6366f1;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;display:inline-block;font-weight:500">${escapeHtml(label)} →</a>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } as any)[c],
  );
}
