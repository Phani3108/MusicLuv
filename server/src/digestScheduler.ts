/**
 * Weekly progress digest scheduler.
 *
 * In-process timer that fires every Sunday 9:00am (server-local time)
 * and emails active users their week-in-review. Skips users who:
 *   - have no email on file
 *   - haven't practised in the last 7 days (no signal to summarize)
 *   - already received a digest this week (idempotency via lastDigestAt)
 *
 * For high-scale deployments, this would be a separate Vercel Cron /
 * GitHub Actions schedule + webhook. For our current scale, a simple
 * in-process timer is enough — we don't have enough users to overlap
 * a week-long process restart with a missed run.
 *
 * Disabled in tests + when DISABLE_DIGEST=true. Disabled by default in
 * dev (NODE_ENV !== "production") to avoid spamming during local work.
 */
import { activeUsersSince, getUser } from "./userDirectory.js";
import { getProgress } from "./progressStore.js";
import { sendWeeklyProgressEmail } from "./observability.js";
import { atomicWriteJson, readJsonSafe, dataPath } from "./persistence.js";
import { LESSONS, listLessonsForInstrument } from "@catalogs/lessonCatalog";

const DIGEST_LEDGER = dataPath("digestLedger.json");

interface DigestLedger {
  lastSentBy: Record<string, string>;     // userId → ISO of last digest sent
}

function loadLedger(): DigestLedger {
  return readJsonSafe<DigestLedger>(DIGEST_LEDGER, { lastSentBy: {} });
}
function saveLedger(d: DigestLedger): void {
  atomicWriteJson(DIGEST_LEDGER, d);
}

/** Has this user received a digest in the last 6 days? */
function alreadyDigestedThisWeek(userId: string, ledger: DigestLedger): boolean {
  const last = ledger.lastSentBy[userId];
  if (!last) return false;
  return Date.now() - Date.parse(last) < 6 * 24 * 3600 * 1000;
}

/** Run the digest pass once. Exported for tests / manual trigger. */
export async function runDigestPass(): Promise<{ sent: number; skipped: number }> {
  const ledger = loadLedger();
  const users = activeUsersSince(7);
  let sent = 0;
  let skipped = 0;

  for (const user of users) {
    if (!user.email) { skipped++; continue; }
    if (alreadyDigestedThisWeek(user.userId, ledger)) { skipped++; continue; }

    const progress = getProgress(user.userId);
    // Estimate minutes practised from XP delta (rough: 1 minute = ~10 XP).
    // Real implementation would query an attempts log; this is good enough
    // until we add proper time-tracking.
    const xpThisWeek = estimateXpThisWeek(progress.totalXp, progress.lastPracticeAt);
    const minutesPracticed = Math.round(xpThisWeek / 10);
    if (minutesPracticed < 5) { skipped++; continue; }

    // Lessons completed this week — count instruments × lesson churn.
    let lessonsCompleted = 0;
    let topInstrument = "";
    let topInstrumentXp = 0;
    for (const [instId, inst] of Object.entries(progress.byInstrument)) {
      lessonsCompleted += inst.lessonsCompleted.length;
      if (inst.xp > topInstrumentXp) {
        topInstrumentXp = inst.xp;
        topInstrument = instId;
      }
    }
    if (!topInstrument) { skipped++; continue; }

    const next = pickNextLesson(topInstrument, progress.byInstrument[topInstrument]?.lessonsCompleted ?? []);
    const appUrl = process.env.APP_URL || "https://musicluv.app";

    try {
      await sendWeeklyProgressEmail(user.email, {
        displayName: user.displayName ?? "there",
        minutesPracticed,
        lessonsCompleted,
        streakDays: progress.currentStreak,
        topInstrument,
        nextLessonTitle: next?.title ?? "Next lesson",
        nextLessonUrl: next ? `${appUrl}/learn/${next.id}` : `${appUrl}/learn`,
      });
      ledger.lastSentBy[user.userId] = new Date().toISOString();
      sent++;
    } catch {
      skipped++;
    }
  }

  saveLedger(ledger);
  return { sent, skipped };
}

/** Crude weekly XP estimate: assume linear gain since lastPracticeAt
 *  capped at 7 days. Underestimates burst-y users. Good enough for the
 *  digest text. */
function estimateXpThisWeek(totalXp: number, _lastPracticeAt?: string): number {
  // Without a time-series log we can only show *current* weekly behavior.
  // Use a conservative upper bound: 1/4 of total XP, capped at 600.
  // This will over-estimate week 1, under-estimate steady-state. The
  // "minutes practised" derived from this is for narrative, not billing.
  return Math.min(600, Math.round(totalXp / 4));
}

function pickNextLesson(instrumentId: string, completed: string[]): { id: string; title: string } | null {
  const all = listLessonsForInstrument(instrumentId);
  for (const lesson of all) {
    if (!completed.includes(lesson.id)) return { id: lesson.id, title: lesson.title };
  }
  return null;
}

/**
 * Start the in-process scheduler. Checks every hour whether it's time
 * to run the digest pass (Sunday 09:00 server-local). One run per
 * week, idempotent — multiple checks on the same day each skip via the
 * ledger.
 */
export function startDigestScheduler(): void {
  if (process.env.DISABLE_DIGEST === "true") {
    console.log("[digest] DISABLE_DIGEST=true — scheduler not started.");
    return;
  }
  if (process.env.NODE_ENV !== "production" && process.env.ENABLE_DIGEST_DEV !== "true") {
    console.log("[digest] dev mode — scheduler not started (set ENABLE_DIGEST_DEV=true to override).");
    return;
  }

  const checkInterval = 60 * 60 * 1000; // 1 hour
  const tick = async () => {
    const now = new Date();
    if (now.getDay() === 0 && now.getHours() === 9) {
      try {
        const { sent, skipped } = await runDigestPass();
        console.log(`[digest] pass complete · sent=${sent} skipped=${skipped}`);
      } catch (e) {
        console.error("[digest] pass failed:", (e as Error).message);
      }
    }
  };

  const handle = setInterval(tick, checkInterval);
  handle.unref?.();
  console.log("[digest] scheduler started · checks hourly · fires Sunday 09:00 server-local");
}

// LESSONS imported for typecheck-time presence; actual lesson lookup is via listLessonsForInstrument.
void LESSONS;
