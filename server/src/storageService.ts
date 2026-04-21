/**
 * Object storage adapter. Two backends:
 *
 *   local   → writes to ./data/uploads/ (dev default, single machine)
 *   s3      → uploads to S3 / Cloudflare R2 via AWS signature v4
 *
 * Select via STORAGE_DRIVER=local|s3. Consumers get a unified
 * { key, url, bytes } return value regardless of backend.
 *
 * For S3:
 *   STORAGE_S3_BUCKET
 *   STORAGE_S3_REGION          (e.g. us-east-1, auto for R2)
 *   STORAGE_S3_ENDPOINT        (optional — required for R2)
 *   STORAGE_S3_ACCESS_KEY_ID
 *   STORAGE_S3_SECRET_ACCESS_KEY
 *   STORAGE_S3_PUBLIC_BASE     (optional — public CDN URL prefix)
 *
 * Falls back to `local` whenever S3 env is incomplete.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createHash, createHmac } from "node:crypto";
import { dataPath } from "./persistence.js";
import { captureError } from "./observability.js";

const DRIVER = (process.env.STORAGE_DRIVER || "local").toLowerCase();
const UPLOAD_DIR = dataPath("uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

export interface UploadResult {
  key: string;             // storage key (path within bucket / local dir)
  url: string;             // accessible URL (public if CDN, else signed/server-proxied)
  bytes: number;
  contentType: string;
}

export async function putObject(opts: {
  body: Buffer;
  contentType: string;
  keyPrefix?: string;      // e.g. "compositions" → "compositions/<hash>.ext"
  ext?: string;            // default ".bin"
}): Promise<UploadResult> {
  const hash = crypto.randomBytes(12).toString("hex");
  const ext = opts.ext ?? inferExt(opts.contentType);
  const key = `${opts.keyPrefix ? opts.keyPrefix + "/" : ""}${hash}${ext}`;

  if (DRIVER === "s3" && s3Configured()) {
    try {
      const url = await putObjectS3(key, opts.body, opts.contentType);
      return { key, url, bytes: opts.body.length, contentType: opts.contentType };
    } catch (err) {
      captureError(err as Error, { where: "storage.putObject.s3", key });
      // fall through to local
    }
  }

  // Local backend.
  const full = path.join(UPLOAD_DIR, key);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, opts.body);
  const publicBase = process.env.APP_URL || "http://localhost:8000";
  return {
    key,
    url: `${publicBase}/data/uploads/${key}`,
    bytes: opts.body.length,
    contentType: opts.contentType,
  };
}

// ── S3 / R2 backend (no AWS SDK dep — pure signature v4) ─────────────

function s3Configured(): boolean {
  return Boolean(
    process.env.STORAGE_S3_BUCKET &&
    process.env.STORAGE_S3_ACCESS_KEY_ID &&
    process.env.STORAGE_S3_SECRET_ACCESS_KEY,
  );
}

async function putObjectS3(key: string, body: Buffer, contentType: string): Promise<string> {
  const bucket = process.env.STORAGE_S3_BUCKET!;
  const region = process.env.STORAGE_S3_REGION || "us-east-1";
  const endpoint = process.env.STORAGE_S3_ENDPOINT || `https://${bucket}.s3.${region}.amazonaws.com`;
  const accessKey = process.env.STORAGE_S3_ACCESS_KEY_ID!;
  const secretKey = process.env.STORAGE_S3_SECRET_ACCESS_KEY!;

  const host = new URL(endpoint).host;
  const url = endpoint.endsWith("/") ? `${endpoint}${key}` : `${endpoint}/${key}`;
  const date = new Date();
  const amzDate = date.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);

  const payloadHash = createHash("sha256").update(body).digest("hex");
  const canonicalHeaders = [
    `content-type:${contentType}`,
    `host:${host}`,
    `x-amz-content-sha256:${payloadHash}`,
    `x-amz-date:${amzDate}`,
  ].join("\n") + "\n";
  const signedHeaders = "content-type;host;x-amz-content-sha256;x-amz-date";

  const canonicalRequest = [
    "PUT",
    `/${encodeURI(key)}`,
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const credentialScope = `${dateStamp}/${region}/s3/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    createHash("sha256").update(canonicalRequest).digest("hex"),
  ].join("\n");

  const kDate = createHmac("sha256", `AWS4${secretKey}`).update(dateStamp).digest();
  const kRegion = createHmac("sha256", kDate).update(region).digest();
  const kService = createHmac("sha256", kRegion).update("s3").digest();
  const kSigning = createHmac("sha256", kService).update("aws4_request").digest();
  const signature = createHmac("sha256", kSigning).update(stringToSign).digest("hex");

  const authorization = `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": contentType,
      "x-amz-content-sha256": payloadHash,
      "x-amz-date": amzDate,
      Authorization: authorization,
    },
    body,
  });
  if (!res.ok) {
    throw new Error(`S3 PUT failed: HTTP ${res.status}`);
  }

  const publicBase = process.env.STORAGE_S3_PUBLIC_BASE;
  return publicBase ? `${publicBase.replace(/\/$/, "")}/${key}` : url;
}

function inferExt(contentType: string): string {
  if (!contentType) return ".bin";
  const map: Record<string, string> = {
    "audio/mpeg": ".mp3",
    "audio/mp3": ".mp3",
    "audio/wav": ".wav",
    "audio/x-wav": ".wav",
    "audio/ogg": ".ogg",
    "audio/webm": ".webm",
    "audio/m4a": ".m4a",
    "audio/mp4": ".m4a",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "application/pdf": ".pdf",
  };
  return map[contentType] ?? `.${contentType.split("/")[1] || "bin"}`;
}
