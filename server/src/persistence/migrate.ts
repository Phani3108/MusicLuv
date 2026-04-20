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
      -- Future: materialized user lookup for faster profile fetch.
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
];

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL not set; nothing to migrate.");
    process.exit(1);
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
  for (const m of MIGRATIONS) {
    if (appliedSet.has(m.id)) continue;
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

  console.log(`[migrate] ${count} migration(s) applied.`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
