#!/usr/bin/env node
/**
 * Content check — runs automatically before every build (and via `npm run check:content`).
 *
 * It never fails the build. It lists:
 *   • placeholders you still need to fill in   ([[...]], YOUR-USERNAME, you@example.com)
 *   • files referenced in content that don't exist in /public (cover images, screenshots, CV)
 *   • projects still marked as "sample": true
 *
 * Structural errors (missing required fields, typos) are caught by the build itself,
 * see src/lib/content.ts.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const contentDir = path.join(root, "content");
const publicDir = path.join(root, "public");

const PLACEHOLDER = /\[\[[^\]]*\]\]|YOUR-[A-Z]+|you@example\.com/;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;

const placeholders = [];
const missingFiles = [];
const samples = [];

function walk(value, file, trail) {
  if (typeof value === "string") {
    if (PLACEHOLDER.test(value)) placeholders.push({ file, at: trail.join(" → "), value });
    if (/^\/(images|documents|icons)\//.test(value) && !fs.existsSync(path.join(publicDir, value)))
      missingFiles.push({ file, at: trail.join(" → "), value });
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, file, [...trail, i]));
  } else if (value && typeof value === "object") {
    if (value.hidden === true) return;
    for (const [k, v] of Object.entries(value)) walk(v, file, [...trail, k]);
  }
}

for (const name of fs.readdirSync(contentDir).filter((f) => f.endsWith(".json")).sort()) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(path.join(contentDir, name), "utf8"));
  } catch (err) {
    console.error(`\n✖ content/${name} is not valid JSON: ${err.message}\n  Tip: check for a missing comma or an extra comma before } or ].\n`);
    process.exit(1);
  }
  walk(data, name, []);
  if (name === "projects.json")
    for (const p of data.items ?? []) if (p.sample && !p.hidden) samples.push(p.name);
}

console.log("\n── Content check ──────────────────────────────");
if (!placeholders.length && !missingFiles.length && !samples.length) {
  console.log(green("✓ No placeholders or missing files. Ready to publish."));
} else {
  if (placeholders.length) {
    console.log(yellow(`\n⚠ ${placeholders.length} placeholder(s) still to fill in:`));
    for (const p of placeholders) console.log(`  content/${p.file} ${dim("→ " + p.at)}\n    ${p.value}`);
  }
  if (missingFiles.length) {
    console.log(yellow(`\n⚠ ${missingFiles.length} referenced file(s) not found in /public (they'll be hidden on the site):`));
    for (const m of missingFiles) console.log(`  content/${m.file} ${dim("→ " + m.at)}\n    public${m.value}`);
  }
  if (samples.length) {
    console.log(yellow(`\n⚠ ${samples.length} sample project(s) still shown — replace them or set "hidden": true:`));
    for (const s of samples) console.log(`  • ${s}`);
  }
}
console.log("───────────────────────────────────────────────\n");
