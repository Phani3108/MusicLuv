/**
 * Boot-time fetch of the launch promo status. Falls back to "promo active"
 * (safest — no spurious paywalls) if the server can't be reached.
 *
 * The status powers:
 *   - PaywallModal + PlanPickerPanel: show $7 strikethrough + "Free for 200" badge
 *   - lib/paywall.ts: treats every feature as unlocked while promo active
 *   - AuthPanel onboarding CTA: "Claim your free seat (N of 200 remaining)"
 */
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { launchStatusAtom, type LaunchStatus } from "@/atoms/billing";

const API_BASE = ((import.meta as any).env.VITE_SERVER_URL as string | undefined) || "";

/** Fetch monetization status once at app boot + hydrate the atom. */
export function useBootstrapLaunchStatus() {
  const setStatus = useSetAtom(launchStatusAtom);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/monetization/status`, {
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = (await res.json()) as { ok: boolean } & LaunchStatus;
        if (cancelled) return;
        if (!data.ok) return;
        setStatus({
          active: data.active,
          firstUserAt: data.firstUserAt,
          userCount: data.userCount,
          seatsRemaining: data.seatsRemaining,
          maxFreeUsers: data.maxFreeUsers,
          maxFreeDays: data.maxFreeDays,
          daysElapsed: data.daysElapsed,
          daysRemaining: data.daysRemaining,
          monetizationActivatedAt: data.monetizationActivatedAt,
          activationReason: data.activationReason,
        });
      } catch {
        // Offline or server down — keep the safe default (promo active).
        // The cached atom value from localStorage wins.
      }
    })();

    return () => { cancelled = true; };
  }, [setStatus]);
}

/** Record the current user against the launch-counter. Idempotent. */
export async function recordUserSeen(userId: string): Promise<void> {
  if (!userId || userId === "anon") return;
  try {
    await fetch(`${API_BASE}/api/v1/monetization/seen`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": userId },
      body: JSON.stringify({}),
    });
  } catch {
    // Non-critical; server tracks via any API call anyway.
  }
}
