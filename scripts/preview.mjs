#!/usr/bin/env node
/**
 * Serves the exported /out folder exactly like GitHub Pages would — including the
 * base path — so you can check a production build locally.
 *
 *   npm run build && npm run preview
 *   NEXT_PUBLIC_BASE_PATH=/portfolio npm run build && NEXT_PUBLIC_BASE_PATH=/portfolio npm run preview
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "out");
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const port = Number(process.env.PORT ?? 4173);

const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".avif": "image/avif", ".ico": "image/x-icon", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml",
  ".pdf": "application/pdf",
};

if (!fs.existsSync(root)) {
  console.error("No /out folder yet — run `npm run build` first.");
  process.exit(1);
}

http
  .createServer((req, res) => {
    let url = decodeURIComponent((req.url ?? "/").split("?")[0]);
    if (base && url === "/") return res.writeHead(302, { Location: `${base}/` }).end();
    if (base) {
      if (!url.startsWith(base)) return send404(res);
      url = url.slice(base.length) || "/";
    }
    let file = path.join(root, url);
    if (!file.startsWith(root)) return send404(res);
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!url.endsWith("/")) return res.writeHead(301, { Location: `${base}${url}/` }).end();
      file = path.join(file, "index.html");
    }
    if (!fs.existsSync(file)) return send404(res);
    res.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log(`Preview: http://localhost:${port}${base}/`));

function send404(res) {
  const f = path.join(root, "404.html");
  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  fs.existsSync(f) ? fs.createReadStream(f).pipe(res) : res.end("Not found");
}
