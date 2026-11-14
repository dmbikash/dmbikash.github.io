import type { MetadataRoute } from "next";

import { projects } from "@/lib/content";
import { siteUrl } from "@/lib/server";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...projects.items.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}/`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
