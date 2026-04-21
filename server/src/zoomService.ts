/**
 * Zoom meeting creation via server-to-server OAuth.
 *
 * Env required:
 *   ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET
 *   ZOOM_USER_ID  (host user id; usually the account owner's email)
 *
 * Without these, createZoomMeeting returns a placeholder URL + stub
 * flag so downstream code can render an honest "link pending" state.
 *
 * We cache the OAuth access token in memory until its expiry.
 */

import { captureError } from "./observability.js";

interface ZoomMeeting {
  id: string;
  joinUrl: string;
  startUrl?: string;
  passcode?: string;
}

interface ZoomToken {
  token: string;
  expiresAt: number;
}

let cached: ZoomToken | null = null;

export function isZoomConfigured(): boolean {
  return Boolean(
    process.env.ZOOM_ACCOUNT_ID &&
    process.env.ZOOM_CLIENT_ID &&
    process.env.ZOOM_CLIENT_SECRET &&
    process.env.ZOOM_USER_ID,
  );
}

async function getAccessToken(): Promise<string | null> {
  if (!isZoomConfigured()) return null;
  if (cached && Date.now() < cached.expiresAt - 60_000) return cached.token;

  const accountId = process.env.ZOOM_ACCOUNT_ID!;
  const clientId = process.env.ZOOM_CLIENT_ID!;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET!;
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const res = await fetch(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    if (!res.ok) {
      captureError(new Error(`Zoom OAuth HTTP ${res.status}`), { where: "zoom.token" });
      return null;
    }
    const data = (await res.json()) as { access_token: string; expires_in?: number };
    cached = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
    };
    return cached.token;
  } catch (err) {
    captureError(err as Error, { where: "zoom.token" });
    return null;
  }
}

/**
 * Create a scheduled Zoom meeting for the given start time + duration.
 * Returns the real join URL when configured; otherwise a pending
 * placeholder (downstream code can show an honest status).
 */
export async function createZoomMeeting(opts: {
  topic: string;
  startAt: string;        // ISO
  durationMin: number;
  agenda?: string;
}): Promise<{ meeting: ZoomMeeting | null; stub: boolean }> {
  const token = await getAccessToken();
  if (!token) {
    return {
      meeting: {
        id: `pending_${Date.now()}`,
        joinUrl: `https://zoom.us/j/pending-${Date.now()}`,
      },
      stub: true,
    };
  }

  const userId = process.env.ZOOM_USER_ID!;
  try {
    const res = await fetch(`https://api.zoom.us/v2/users/${encodeURIComponent(userId)}/meetings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: opts.topic,
        type: 2, // scheduled
        start_time: opts.startAt,
        duration: opts.durationMin,
        agenda: opts.agenda,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          waiting_room: true,
        },
      }),
    });
    if (!res.ok) {
      captureError(new Error(`Zoom create-meeting HTTP ${res.status}`), { where: "zoom.createMeeting" });
      return { meeting: null, stub: true };
    }
    const data = (await res.json()) as {
      id: number | string;
      join_url: string;
      start_url?: string;
      password?: string;
      encrypted_password?: string;
    };
    return {
      meeting: {
        id: String(data.id),
        joinUrl: data.join_url,
        startUrl: data.start_url,
        passcode: data.password ?? data.encrypted_password,
      },
      stub: false,
    };
  } catch (err) {
    captureError(err as Error, { where: "zoom.createMeeting" });
    return { meeting: null, stub: true };
  }
}
