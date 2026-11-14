/** Client-safe helpers (no Node APIs). */

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a /public path with the GitHub Pages base path.
 * next/link adds it automatically; plain <img>, <a download> etc. need this.
 */
export function asset(src: string | undefined): string | undefined {
  if (!src) return undefined;
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
  return `${basePath}${src.startsWith("/") ? src : `/${src}`}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2022-03" → "Mar 2022", "2022" → "2022"; anything else is shown as written. */
export function formatDate(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const m = /^(\d{4})-(\d{1,2})$/.exec(value);
  if (m) {
    const month = MONTHS[Number(m[2]) - 1];
    return month ? `${month} ${m[1]}` : value;
  }
  return value;
}

export function dateRange(start?: string, end?: string, current?: boolean) {
  const s = formatDate(start);
  const e = current ? "Present" : formatDate(end);
  if (s && e) return `${s} — ${e}`;
  return s ?? e ?? "";
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
