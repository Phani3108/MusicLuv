/**
 * Atomic JSON persistence — ported verbatim from 3DWorld/server/persistence.js.
 * Write-to-tmp-then-rename so a crash mid-write never leaves a corrupt JSON
 * that breaks server boot.
 */
import fs from "node:fs";
import path from "node:path";

export const atomicWriteJson = (filePath: string, obj: unknown): void => {
  const tmp = `${filePath}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(obj, null, 2));
  fs.renameSync(tmp, filePath);
};

export const readJsonSafe = <T>(filePath: string, fallback: T): T => {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const ensureDir = (dirPath: string): void => {
  fs.mkdirSync(dirPath, { recursive: true });
};

export const pushCapped = <T>(arr: T[], item: T, cap: number): T[] => {
  arr.unshift(item);
  if (arr.length > cap) arr.length = cap;
  return arr;
};

export const joinPath = path.join;

export const DATA_DIR = process.env.MUSICLUV_DATA_DIR || path.join(process.cwd(), "data");
ensureDir(DATA_DIR);

export const dataPath = (name: string) => path.join(DATA_DIR, name);
