import { ImageResponse } from "next/og";

import { profile } from "@/lib/content";

/** Social preview image (LinkedIn, Slack, X…), generated at build time from profile.json. */
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };


export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(900px 500px at 0% 0%, rgba(47,116,255,0.35), transparent 60%), radial-gradient(700px 500px at 100% 100%, rgba(139,124,255,0.25), transparent 60%), #05070d",
          color: "#eef2fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, color: "#5fdcef", letterSpacing: 3 }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#3ddc97" }} />
          {profile.role.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02, maxWidth: 1000 }}>
            {profile.headline}
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#a3adc2" }}>{profile.name}</div>
        </div>
      </div>
    ),
    size,
  );
}
