/**
 * Postgres-backed KV store. Uses the `pg` driver + a single `kv_store`
 * table keyed by name. The per-name rows carry a JSONB `value` column
 * so any service can swap from flat-file to PG by selecting
 * PERSISTENCE_DRIVER=postgres + DATABASE_URL.
 *
 * Schema:
 *   CREATE TABLE kv_store (
 *     name TEXT PRIMARY KEY,
 *     value JSONB NOT NULL,
 *     updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
 *   );
 *
 * Migration lives in src/persistence/migrate.ts.
 *
 * The API is intentionally narrow (get/set) so we don't leak PG-specific
 * semantics into service code. Services that need real SQL queries
 * (joins, aggregates) should graduate to dedicated Postgres modules
 * with their own schema once kv becomes a bottleneck.
 */

import type { KvStore } from "./driver.js";

let poolPromise: Promise<any> | null = null;

async function getPool() {
  if (poolPromise) return poolPromise;
  poolPromise = (async () => {
    // Lazy-import pg so the flatfile driver path doesn't require the dep.
    const { Pool } = await import("pg");
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL required for PERSISTENCE_DRIVER=postgres");
    }
    const pool = new Pool({
      connectionString,
      ssl: connectionString.includes("supabase.co") ? { rejectUnauthorized: false } : undefined,
      max: Number(process.env.PG_POOL_MAX ?? 10),
    });
    // Smoke test connection.
    await pool.query("SELECT 1");
    return pool;
  })();
  return poolPromise;
}

export function postgresKvStore<T>(name: string, initial: T): KvStore<T> {
  return {
    get: async () => {
      const pool = await getPool();
      const res = await pool.query("SELECT value FROM kv_store WHERE name = $1", [name]);
      if (res.rowCount === 0) return initial;
      return res.rows[0].value as T;
    },
    set: async (value: T) => {
      const pool = await getPool();
      await pool.query(
        `INSERT INTO kv_store (name, value, updated_at)
         VALUES ($1, $2::jsonb, now())
         ON CONFLICT (name)
         DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
        [name, JSON.stringify(value)],
      );
    },
  };
}
