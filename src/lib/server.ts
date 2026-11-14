/** Build-time helpers (Node only — never import from a "use client" file). */
import fs from "node:fs";
import path from "node:path";

import { site } from "./content";

/** True if a file exists in /public. External URLs count as existing. */
export function publicFileExists(src: string | undefined): boolean {
  if (!src) return false;
  if (/^(https?:)?\/\//.test(src)) return true;
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/** Absolute site URL incl. base path, e.g. https://user.github.io/repo */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || site.siteUrl).replace(/\/$/, "");
