/**
 * Shared Postgres pool accessor. Services that want real SQL (not just
 * JSONB blobs via kvStore) import `getPgPool()` and use `pool.query()`
 * directly.
 *
 * Respects PERSISTENCE_DRIVER=postgres. Returns `null` when unconfigured
 * or when the `pg` dep isn't installed (graceful flatfile fallback).
 *
 * The pool is shared with postgres.ts's kvStore — same connection
 * pool, same SSL config.
 */

import { captureError } from "../observability.js";

const DRIVER = (process.env.PERSISTENCE_DRIVER || "flatfile").toLowerCase();

let poolPromise: Promise<any> | null = null;

export async function getPgPool(): Promise<any | null> {
  if (DRIVER !== "postgres") return null;
  if (poolPromise) return poolPromise;
  poolPromise = (async () => {
    try {
      const { Pool } = await import("pg");
      const connectionString = process.env.DATABASE_URL;
      if (!connectionString) {
        console.warn("[pg] DATABASE_URL not set; falling back to flatfile.");
        return null;
      }
      const pool = new Pool({
        connectionString,
        ssl: connectionString.includes("supabase.co") || connectionString.includes("sslmode=require")
          ? { rejectUnauthorized: false }
          : undefined,
        max: Number(process.env.PG_POOL_MAX ?? 10),
      });
      await pool.query("SELECT 1");
      return pool;
    } catch (err) {
      captureError(err as Error, { where: "pgClient.init" });
      return null;
    }
  })();
  return poolPromise;
}
