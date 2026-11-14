import type { NextConfig } from "next";

/**
 * GitHub Pages serves static files only, so the site is exported as plain HTML.
 *
 * NEXT_PUBLIC_BASE_PATH:
 *   - ""            → user/organisation site  (https://<user>.github.io/)
 *   - "/<repo>"     → project site            (https://<user>.github.io/<repo>/)
 * The GitHub Actions workflow sets this automatically. Locally it defaults to "".
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  trailingSlash: true, // /projects/foo/ → /projects/foo/index.html, so refresh & deep links work on Pages
  images: { unoptimized: true }, // no image server on GitHub Pages
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
