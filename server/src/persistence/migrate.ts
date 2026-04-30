/**
 * Postgres migration runner. Run with `npm run db:migrate` after
 * setting DATABASE_URL.
 *
 * Schema versioning is deliberately tiny — a single
 * `schema_migrations` table tracks which migration IDs have applied.
 * When a new MIGRATION entry is added to MIGRATIONS[], running this
 * script applies only the new ones in order.
 */

/* eslint-disable no-console */
import process from "node:process";

const MIGRATIONS: Array<{ id: string; sql: string }> = [
  {
    id: "0001_kv_store",
    sql: `
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS kv_store (
        name TEXT PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS kv_store_updated_at ON kv_store (updated_at);
    `,
  },
  {
    id: "0002_users_index",
    sql: `
      -- Materialized user lookup for faster profile fetch + email index.
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT,
        display_name TEXT,
        auth_provider TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS users_email ON users (email);
    `,
  },
  {
    id: "0003_progress",
    sql: `
      -- Per-user totals + per-instrument progress rows.
      CREATE TABLE IF NOT EXISTS user_progress (
        user_id TEXT PRIMARY KEY,
        total_xp INTEGER NOT NULL DEFAULT 0,
        current_streak INTEGER NOT NULL DEFAULT 0,
        hearts_today INTEGER NOT NULL DEFAULT 5,
        hearts_max INTEGER NOT NULL DEFAULT 5,
        last_practice_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS instrument_progress (
        user_id TEXT NOT NULL REFERENCES user_progress(user_id) ON DELETE CASCADE,
        instrument_id TEXT NOT NULL,
        xp INTEGER NOT NULL DEFAULT 0,
        level SMALLINT NOT NULL DEFAULT 1 CHECK (level BETWEEN 1 AND 9),
        lessons_completed TEXT[] NOT NULL DEFAULT '{}',
        exams_passed TEXT[] NOT NULL DEFAULT '{}',
        last_grade JSONB,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        PRIMARY KEY (user_id, instrument_id)
      );
      CREATE INDEX IF NOT EXISTS instrument_progress_instrument
        ON instrument_progress (instrument_id);
    `,
  },
  {
    id: "0004_attempts",
    sql: `
      -- Every graded attempt. Append-only audit log; powers the
      -- overlay playback history + analytics.
      CREATE TABLE IF NOT EXISTS attempts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        instrument_id TEXT NOT NULL,
        lesson_id TEXT NOT NULL,
        composite NUMERIC(5,4) NOT NULL,
        passed BOOLEAN NOT NULL,
        dimensions JSONB NOT NULL,
        xp_awarded INTEGER NOT NULL DEFAULT 0,
        audio_url TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS attempts_user_time
        ON attempts (user_id, created_at DESC);
      CREATE INDEX IF NOT EXISTS attempts_lesson
        ON attempts (lesson_id);
    `,
  },
  {
    id: "0005_recitals",
    sql: `
      -- Public recital feed + comments.
      CREATE TABLE IF NOT EXISTS recitals (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        instrument_id TEXT NOT NULL,
        lesson_id TEXT,
        title TEXT NOT NULL,
        description TEXT,
        duration_sec INTEGER NOT NULL,
        audio_url TEXT NOT NULL,
        thumbnail_url TEXT,
        tier TEXT NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
        comment_count INTEGER NOT NULL DEFAULT 0,
        is_public BOOLEAN NOT NULL DEFAULT TRUE,
        review_status TEXT,
        reviewer_id TEXT,
        reviewer_notes TEXT,
        reviewed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS recitals_user ON recitals (user_id);
      CREATE INDEX IF NOT EXISTS recitals_public_recent
        ON recitals (is_public, created_at DESC);

      CREATE TABLE IF NOT EXISTS recital_comments (
        id TEXT PRIMARY KEY,
        recital_id TEXT NOT NULL REFERENCES recitals(id) ON DELETE CASCADE,
        user_id TEXT NOT NULL,
        display_name TEXT,
        avatar_url TEXT,
        text TEXT NOT NULL,
        is_teacher_comment BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS recital_comments_recital
        ON recital_comments (recital_id, created_at);
    `,
  },
  {
    id: "0006_compositions",
    sql: `
      -- Genius-tier original compositions + reviewer rubric.
      CREATE TABLE IF NOT EXISTS compositions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        instrument_id TEXT,
        audio_url TEXT,
        sheet_music_url TEXT,
        lyrics TEXT,
        status TEXT NOT NULL DEFAULT 'submitted',
        rubric JSONB,
        reviewer_id TEXT,
        reviewer_notes TEXT,
        reviewed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS compositions_user ON compositions (user_id);
      CREATE INDEX IF NOT EXISTS compositions_status ON compositions (status);
    `,
  },
  {
    id: "0007_subscriptions",
    sql: `
      -- Billing subscription records. Mirrors SubscriptionRecord shape.
      CREATE TABLE IF NOT EXISTS subscriptions (
        user_id TEXT PRIMARY KEY,
        plan TEXT NOT NULL,
        status TEXT NOT NULL,
        provider TEXT,
        stripe_customer_id TEXT,
        stripe_subscription_id TEXT,
        started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        renews_at TIMESTAMPTZ,
        canceled_at TIMESTAMPTZ,
        region TEXT
      );
      CREATE INDEX IF NOT EXISTS subscriptions_stripe_customer
        ON subscriptions (stripe_customer_id);
    `,
  },
  {
    id: "0008_expert_content",
    sql: `
      -- Expert live-session reservations (mirror of LiveSlot).
      -- Expert catalog itself lives in code (shared/catalogs/expertCatalog.ts);
      -- this table tracks the dynamic booking state.
      CREATE TABLE IF NOT EXISTS live_reservations (
        id TEXT PRIMARY KEY,
        slot_id TEXT NOT NULL,
        student_id TEXT NOT NULL,
        teacher_id TEXT NOT NULL,
        meeting_url TEXT,
        price_usd NUMERIC(10,2),
        status TEXT NOT NULL DEFAULT 'booked',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (slot_id, student_id)
      );
      CREATE INDEX IF NOT EXISTS live_reservations_student
        ON live_reservations (student_id);
    `,
  },
  {
    id: "0009_user_directory",
    sql: `
      -- userDirectory.ts mirrors here. Adds the columns we need that
      -- 0002_users_index didn't include. Original 0002 used 'id' as
      -- primary key; this migration adds first_seen_at + last_seen_at
      -- + an alias view via user_id (which our app code uses).
      ALTER TABLE users ADD COLUMN IF NOT EXISTS user_id TEXT;
      UPDATE users SET user_id = id WHERE user_id IS NULL;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS first_seen_at TIMESTAMPTZ NOT NULL DEFAULT now();
      ALTER TABLE users ADD COLUMN IF NOT EXISTS last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now();
      CREATE UNIQUE INDEX IF NOT EXISTS users_user_id_unique ON users (user_id);
      CREATE INDEX IF NOT EXISTS users_email_lower ON users (LOWER(email));
    `,
  },
];

/** Apply all pending migrations. Exported so the server boot path can
 *  invoke this on startup when PERSISTENCE_DRIVER=postgres. Idempotent
 *  via the schema_migrations table. */
export async function applyMigrations(): Promise<{ applied: number; skipped: number }> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL not set; cannot apply migrations.");
  }

  const { Pool } = await import("pg");
  const pool = new Pool({
    connectionString,
    ssl: connectionString.includes("supabase.co") ? { rejectUnauthorized: false } : undefined,
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  const applied = (await pool.query("SELECT id FROM schema_migrations")).rows.map((r: any) => r.id);
  const appliedSet = new Set<string>(applied);

  let count = 0;
  let skipped = 0;
  for (const m of MIGRATIONS) {
    if (appliedSet.has(m.id)) { skipped++; continue; }
    console.log(`[migrate] applying ${m.id}…`);
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(m.sql);
      await client.query("INSERT INTO schema_migrations (id) VALUES ($1)", [m.id]);
      await client.query("COMMIT");
      count += 1;
    } catch (err) {
      await client.query("ROLLBACK");
      console.error(`[migrate] ${m.id} failed:`, err);
      throw err;
    } finally {
      client.release();
    }
  }

  await pool.end();
  return { applied: count, skipped };
}

// Standalone CLI mode — `npm run db:migrate` invokes this file directly
// via tsx. When loaded as a module (via boot's `applyMigrations`
// import), this block is skipped because import.meta.url won't match
// the executed file's URL.
const isMainScript = import.meta.url === `file://${process.argv[1]}`;
if (isMainScript) {
  applyMigrations()
    .then((r) => {
      console.log(`[migrate] done · applied=${r.applied} skipped=${r.skipped}`);
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
