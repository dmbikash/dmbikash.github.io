import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CoverFallback } from "@/components/sections/Projects";
import { Chips } from "@/components/ui/Chips";
import { Icon } from "@/components/ui/Icon";
import { PhoneFrame } from "@/components/ui/Phone";
import { Reveal } from "@/components/ui/Reveal";
import { getProject, projects } from "@/lib/content";
import { publicFileExists, siteUrl } from "@/lib/server";
import { asset, cn } from "@/lib/utils";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const cover = publicFileExists(p.cover) && !p.cover?.endsWith(".svg") ? p.cover : undefined;
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `${siteUrl}/projects/${p.slug}/` },
    openGraph: {
      title: p.name,
      description: p.summary,
      url: `${siteUrl}/projects/${p.slug}/`,
      images: [{ url: cover ? asset(cover)! : "og.png" }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const cover = publicFileExists(p.cover) ? asset(p.cover) : undefined;
  const shots = p.screenshots.filter((s) => publicFileExists(s));
  const idx = projects.items.findIndex((x) => x.slug === p.slug);
  const next = projects.items[(idx + 1) % projects.items.length];

  const links = [
    p.links.store && { href: p.links.store, label: "Get it on Google Play", icon: "play" as const },
    p.links.demo && { href: p.links.demo, label: "Visit live app", icon: "arrowUpRight" as const },
    p.links.github && { href: p.links.github, label: "Source code", icon: "github" as const },
  ].filter(Boolean) as { href: string; label: string; icon: "github" | "arrowUpRight" | "play" }[];

  const facts = [
    p.client && { k: "Client", v: p.client },
    p.category && { k: "Category", v: p.category },
    p.role && { k: "Role", v: p.role },
    p.year && { k: "Period", v: p.year },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <article className="pb-20 pt-28 sm:pt-32">
      <div className="container-page">
        <Link
          href="/#projects"
          className="enter inline-flex min-h-11 items-center gap-2 rounded-full text-sm text-muted transition-colors hover:text-fg"
        >
          <Icon name="arrowLeft" size={17} />
          All projects
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <div className="enter flex flex-wrap items-center gap-2" style={{ ["--enter-delay" as string]: "60ms" }}>
              {p.category ? <span className="eyebrow">{p.category}</span> : null}
              {p.confidential ? (
                <span className="chip !h-7">
                  <Icon name="lock" size={13} />
                  Confidential
                </span>
              ) : null}
              {p.sample ? <span className="chip !h-7 !border-[#f0b46a]/30 !text-[#f0c58a]">Sample project</span> : null}
            </div>
            <h1
              className="enter mt-5 text-balance text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.04em] text-fg sm:text-6xl lg:text-7xl"
              style={{ ["--enter-delay" as string]: "120ms" }}
            >
              {p.name}
            </h1>
            <p
              className="enter mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"
              style={{ ["--enter-delay" as string]: "180ms" }}
            >
              {p.summary}
            </p>
          </div>

          {links.length ? (
            <div
              className="enter flex flex-col gap-3 xs:flex-row lg:col-span-4 lg:flex-col lg:items-stretch lg:justify-end"
              style={{ ["--enter-delay" as string]: "240ms" }}
            >
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("btn", i === 0 ? "btn-primary" : "btn-ghost")}
                >
                  <Icon name={l.icon} size={18} />
                  {l.label}
                </a>
              ))}
            </div>
          ) : null}
        </header>

        <div
          className="enter glass relative mt-12 aspect-[16/10] overflow-hidden sm:aspect-[16/8]"
          style={{ ["--enter-delay" as string]: "260ms" }}
        >
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt={`${p.name} cover`} width={1600} height={1000} className="h-full w-full object-cover" />
          ) : (
            <CoverFallback name={p.name} />
          )}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-4">
            <Reveal className="glass p-6 sm:p-7 lg:sticky lg:top-28">
              {facts.length ? (
                <dl className="grid gap-5">
                  {facts.map((f) => (
                    <div key={f.k}>
                      <dt className="eyebrow">{f.k}</dt>
                      <dd className="mt-2 text-fg">{f.v}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {p.stack.length ? (
                <div className={facts.length ? "mt-6 border-t border-line pt-6" : ""}>
                  <p className="eyebrow">Stack</p>
                  <Chips items={p.stack} className="mt-3" label="Technology stack" />
                </div>
              ) : null}
            </Reveal>
          </aside>

          <div className="lg:col-span-8">
            {p.description.length ? (
              <Reveal>
                <h2 className="eyebrow">Overview</h2>
                <div className="mt-5 space-y-5">
                  {p.description.map((para, i) => (
                    <p key={i} className="text-pretty text-lg leading-relaxed text-muted">
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
            ) : null}

            {p.highlights.length ? (
              <Reveal className="mt-12">
                <h2 className="eyebrow">Highlights</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {p.highlights.map((h, i) => (
                    <li key={h} className="glass flex gap-4 p-5">
                      <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[0.9375rem] leading-relaxed text-fg">{h}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {p.confidential ? (
              <Reveal className="mt-12 flex gap-4 rounded-2xl border border-line bg-white/[0.02] p-5 text-[0.9375rem] leading-relaxed text-muted">
                <Icon name="lock" size={20} className="mt-0.5 shrink-0 text-subtle" />
                <p>
                  This work is confidential. Screenshots, source code and technical specifics are intentionally not
                  shared.
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>

        {shots.length ? (
          <section className="mt-20" aria-labelledby="screens-title">
            <Reveal>
              <h2 id="screens-title" className="eyebrow">
                Screens
              </h2>
            </Reveal>
            <ul className="-mx-4 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 [scrollbar-width:thin] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4">
              {shots.map((s, i) => (
                <Reveal as="li" key={s} delay={i * 70} className="w-[62%] shrink-0 snap-center sm:w-auto">
                  <PhoneFrame src={s} alt={`${p.name} screen ${i + 1}`} className="w-full" />
                </Reveal>
              ))}
            </ul>
          </section>
        ) : null}

        {next && next.slug !== p.slug ? (
          <Reveal className="mt-24">
            <Link
              href={`/projects/${next.slug}/`}
              className="glass glass-hover group flex items-center justify-between gap-6 p-6 sm:p-8"
            >
              <div className="min-w-0">
                <p className="eyebrow">Next project</p>
                <p className="mt-3 truncate text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">{next.name}</p>
              </div>
              <span className="icon-btn shrink-0 transition-transform duration-500 group-hover:translate-x-1">
                <Icon name="arrowRight" size={20} />
              </span>
            </Link>
          </Reveal>
        ) : null}
      </div>
    </article>
  );
}
