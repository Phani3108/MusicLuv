/**
 * Persistence driver abstraction. Keeps the existing flat-file JSON
 * atomic-write pattern (dev / launch promo window) while allowing a
 * drop-in Postgres swap once we're ready to scale beyond flat files.
 *
 * Selection: set PERSISTENCE_DRIVER=postgres in the server env and
 * provide DATABASE_URL. Default remains "flatfile" — zero-config
 * local dev continues to work.
 *
 * Usage:
 *   import { kvStore } from "./persistence/driver.js";
 *   const users = await kvStore<Record<string, User>>("users", {});
 *   users.set({ ... });
 *   users.get();
 */

import { atomicWriteJson, readJsonSafe, dataPath } from "../persistence.js";

export interface KvStore<T> {
  get(): Promise<T> | T;
  set(value: T): Promise<void> | void;
}

const DRIVER = (process.env.PERSISTENCE_DRIVER || "flatfile").toLowerCase();

/**
 * Key-value store keyed by a file/table name. `initial` is used on
 * first read when no prior value exists.
 *
 * The flatfile implementation is synchronous (matches the existing
 * service modules) but the signature returns a Promise-compatible
 * shape so callers can eventually await without a rewrite.
 */
export function kvStore<T>(name: string, initial: T): KvStore<T> {
  if (DRIVER === "postgres") {
    return postgresKv(name, initial);
  }
  return flatfileKv(name, initial);
}

function flatfileKv<T>(name: string, initial: T): KvStore<T> {
  const path = dataPath(`${name}.json`);
  return {
    get: () => readJsonSafe<T>(path, initial),
    set: (value: T) => atomicWriteJson(path, value),
  };
}

/**
 * Postgres placeholder. Intentionally stubs at this stage — the shape
 * is the contract; the actual PG implementation lands when we add the
 * `pg` npm dep + a migration runner. Until then, selecting postgres
 * prints a warning + silently falls back to flatfile so dev doesn't
 * break.
 */
function postgresKv<T>(name: string, initial: T): KvStore<T> {
  if (!warnedAboutPg) {
    console.warn(
      "[persistence] PERSISTENCE_DRIVER=postgres selected but the PG adapter " +
      "is not yet wired. Falling back to flatfile. Set DATABASE_URL + add the " +
      "`pg` dep, then implement this function.",
    );
    warnedAboutPg = true;
  }
  return flatfileKv(name, initial);
}
let warnedAboutPg = false;
