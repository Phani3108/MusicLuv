/**
 * Persistence driver abstraction. Swap between flat-file JSON atomic
 * writes (dev / launch promo) and Postgres via PERSISTENCE_DRIVER.
 *
 * Flatfile mode is synchronous (matches existing service modules).
 * Postgres mode is async (pg driver); the kvStore signature returns
 * union types so callers can await either — `await store.get()` works
 * in both cases since await on a non-Promise resolves to the value.
 */

import { atomicWriteJson, readJsonSafe, dataPath } from "../persistence.js";

export interface KvStore<T> {
  get(): Promise<T> | T;
  set(value: T): Promise<void> | void;
}

const DRIVER = (process.env.PERSISTENCE_DRIVER || "flatfile").toLowerCase();

export function kvStore<T>(name: string, initial: T): KvStore<T> {
  if (DRIVER === "postgres") {
    return postgresKvLazy(name, initial);
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
 * Lazy proxy — defers the dynamic import until first use so flatfile
 * deployments don't need `pg` installed. Falls back to flatfile if the
 * import fails (e.g. pg wasn't installed).
 */
function postgresKvLazy<T>(name: string, initial: T): KvStore<T> {
  let real: KvStore<T> | null = null;
  let loaded: Promise<KvStore<T>> | null = null;

  const ensure = async (): Promise<KvStore<T>> => {
    if (real) return real;
    if (!loaded) {
      loaded = (async () => {
        try {
          const mod = await import("./postgres.js");
          return mod.postgresKvStore<T>(name, initial);
        } catch (err) {
          console.warn(
            "[persistence] postgres selected but pg is not installed; falling back to flatfile.",
            err,
          );
          return flatfileKv<T>(name, initial);
        }
      })();
    }
    real = await loaded;
    return real;
  };

  return {
    get: async () => (await ensure()).get(),
    set: async (value: T) => {
      const r = await ensure();
      await r.set(value);
    },
  };
}
