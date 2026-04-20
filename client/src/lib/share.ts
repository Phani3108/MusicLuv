/**
 * Social share helpers. Uses the Web Share API when available (mobile + modern
 * desktop), falls back to provider URLs for Twitter / Facebook / LinkedIn /
 * WhatsApp, and offers "copy link" as the last resort.
 */

export interface ShareTarget {
  url: string;
  title: string;
  text?: string;
}

/** Attempt Web Share API; returns true if it successfully invoked. */
export async function nativeShare(target: ShareTarget): Promise<boolean> {
  if (typeof navigator !== "undefined" && (navigator as any).share) {
    try {
      await (navigator as any).share({ title: target.title, text: target.text, url: target.url });
      return true;
    } catch {
      // user cancelled or not available
      return false;
    }
  }
  return false;
}

export function twitterShareUrl(t: ShareTarget): string {
  const text = `${t.title} · ${t.text ?? ""}`.trim();
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(t.url)}`;
}
export function facebookShareUrl(t: ShareTarget): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(t.url)}`;
}
export function linkedInShareUrl(t: ShareTarget): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(t.url)}`;
}
export function whatsAppShareUrl(t: ShareTarget): string {
  const text = `${t.title}\n${t.text ?? ""}\n${t.url}`.trim();
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export async function copyLink(url: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}
