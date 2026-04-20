/**
 * Thin Supabase client wrapper.
 *
 * Works against the Supabase Auth REST API directly (no SDK dependency) so
 * we don't add 600kB to the bundle for something that can be a fetch call.
 * If `@supabase/supabase-js` is added later, swap the three helpers here
 * and every callsite in `AuthPanel.tsx` keeps working unchanged.
 *
 * Env vars (Vite):
 *   VITE_SUPABASE_URL           https://<project-ref>.supabase.co
 *   VITE_SUPABASE_ANON_KEY      <public anon key>
 *   VITE_SUPABASE_REDIRECT_URL  https://app.musicluv.com/auth/callback
 *
 * If VITE_SUPABASE_URL is missing, `isConfigured()` returns false and the
 * AuthPanel falls back to the existing dev stub — useful for local work
 * without a Supabase project.
 */

type Env = { VITE_SUPABASE_URL?: string; VITE_SUPABASE_ANON_KEY?: string; VITE_SUPABASE_REDIRECT_URL?: string };
const env: Env = (import.meta as any).env || {};

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_KEY = env.VITE_SUPABASE_ANON_KEY;
const REDIRECT_URL = env.VITE_SUPABASE_REDIRECT_URL || (typeof window !== "undefined" ? window.location.origin : undefined);

const JWT_KEY = "musicluv:jwt";

export interface SupabaseSession {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  user: {
    id: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    provider: "email" | "google" | "apple";
  };
}

export function isConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

export function getStoredSession(): SupabaseSession | null {
  try {
    const raw = localStorage.getItem(JWT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SupabaseSession;
  } catch {
    return null;
  }
}

export function getAccessToken(): string | null {
  return getStoredSession()?.accessToken ?? null;
}

export function setStoredSession(s: SupabaseSession | null): void {
  if (s) localStorage.setItem(JWT_KEY, JSON.stringify(s));
  else localStorage.removeItem(JWT_KEY);
}

function authHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    apikey: SUPABASE_KEY!,
  };
}

/** Sign in / up with email + password. Returns session or throws. */
export async function emailAuth(
  mode: "signin" | "signup",
  email: string,
  password: string,
): Promise<SupabaseSession> {
  if (!isConfigured()) throw new Error("Supabase not configured (VITE_SUPABASE_URL)");
  const path = mode === "signin" ? "/auth/v1/token?grant_type=password" : "/auth/v1/signup";
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ msg: "auth_failed" }));
    throw new Error(err.msg || err.error_description || `HTTP ${res.status}`);
  }
  const data = await res.json();
  const session: SupabaseSession = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
    user: {
      id: data.user?.id ?? data.id,
      email: data.user?.email ?? email,
      displayName: data.user?.user_metadata?.display_name ?? email.split("@")[0],
      avatarUrl: data.user?.user_metadata?.avatar_url,
      provider: "email",
    },
  };
  setStoredSession(session);
  return session;
}

/** OAuth redirect flow. Sends the browser to the provider consent page. */
export function oauthRedirect(provider: "google" | "apple"): void {
  if (!isConfigured()) throw new Error("Supabase not configured (VITE_SUPABASE_URL)");
  const url = new URL(`${SUPABASE_URL}/auth/v1/authorize`);
  url.searchParams.set("provider", provider);
  if (REDIRECT_URL) url.searchParams.set("redirect_to", REDIRECT_URL);
  window.location.href = url.toString();
}

/**
 * Parse the OAuth callback fragment (#access_token=...) and persist the
 * session. Call this on the /auth/callback route at boot.
 */
export function absorbOAuthCallback(): SupabaseSession | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash.includes("access_token")) return null;
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token") ?? undefined;
  const expiresIn = Number(params.get("expires_in") ?? 3600);
  if (!accessToken) return null;

  // Basic JWT decode for user info (no verification — that's the server's job).
  const payload = decodeJwt(accessToken);
  const session: SupabaseSession = {
    accessToken,
    refreshToken,
    expiresAt: Date.now() + expiresIn * 1000,
    user: {
      id: payload?.sub ?? "unknown",
      email: payload?.email ?? "unknown@musicluv.app",
      displayName: payload?.user_metadata?.full_name ?? payload?.user_metadata?.name ?? (payload?.email?.split("@")[0] ?? "User"),
      avatarUrl: payload?.user_metadata?.avatar_url,
      provider: (payload?.app_metadata?.provider as "google" | "apple") ?? "google",
    },
  };
  setStoredSession(session);
  // Clean the URL.
  window.history.replaceState({}, "", window.location.pathname + window.location.search);
  return session;
}

export async function signOut(): Promise<void> {
  const tok = getAccessToken();
  setStoredSession(null);
  if (!isConfigured() || !tok) return;
  try {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: { ...authHeaders(), Authorization: `Bearer ${tok}` },
    });
  } catch {
    // ignore — local session is already cleared
  }
}

function decodeJwt(token: string): any {
  try {
    const [, payload] = token.split(".");
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}
