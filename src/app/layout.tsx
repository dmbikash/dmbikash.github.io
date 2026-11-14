import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";

import { Aurora } from "@/components/layout/Aurora";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ClientEffects } from "@/components/ui/ClientEffects";
import { navigation, profile, site } from "@/lib/content";
import { publicFileExists, siteUrl } from "@/lib/server";
import { asset } from "@/lib/utils";

import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: { default: site.title, template: `%s · ${profile.name}` },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/`,
    siteName: profile.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
    images: [{ url: "og.png", width: 1200, height: 630, alt: `${profile.name} — ${profile.role}` }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["og.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cv = publicFileExists(profile.cv) ? asset(profile.cv) : undefined;
  const initials =
    profile.shortName && !/\[\[/.test(profile.shortName)
      ? profile.shortName
      : profile.name
          .replace(/[^\p{L}\s]/gu, "")
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((w) => w[0]!.toUpperCase())
          .join("") || "Me";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role.split("|")[0]?.trim(),
    url: siteUrl,
    sameAs: profile.socials.map((s) => s.url),
    knowsAbout: ["Flutter", "Dart", "Mobile application development", "WebRTC"],
  };

  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS is running, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Aurora />
        <Navbar items={navigation.items} brand={initials} brandFull={profile.name} cvHref={cv} />
        <main id="main">{children}</main>
        <Footer />
        <ClientEffects />
      </body>
    </html>
  );
}
