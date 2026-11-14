import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { PhoneReel } from "@/components/ui/Phone";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects, type Project } from "@/lib/content";
import { publicFileExists } from "@/lib/server";
import { asset, cn } from "@/lib/utils";

/**
 * Bento layout: featured projects take the large tiles, the rest fill in.
 * Order in projects.json is respected within each group.
 */
export function Projects() {
  if (!projects.items.length) return null;
  const featured = projects.items.filter((p) => p.featured);
  const rest = projects.items.filter((p) => !p.featured);
  const ordered = [...featured, ...rest];

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-pad">
      <div className="container-page">
        <SectionHeader id="projects-title" index="03" label="Projects" title={projects.title} intro={projects.intro} />

        <ul className="grid grid-flow-dense gap-4 md:grid-cols-6 lg:grid-cols-12 lg:gap-5">
          {ordered.map((p, i) => (
            <Reveal
              as="li"
              key={p.slug}
              delay={(i % 3) * 70}
              className={cn("min-w-0", spanFor(i, ordered.length))}
            >
              <ProjectCard project={p} large={i === 0} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Bento spans. lg (12 cols): a hero tile (7 cols × 2 rows) beside two stacked tiles (5 cols),
 * then rows of three; leftovers stretch so the grid never ends with a hole.
 * md (6 cols): hero tile full width, then pairs.
 */
function spanFor(i: number, total: number) {
  const md = i === 0 || (i === total - 1 && (total - 1) % 2 === 1) ? "md:col-span-6" : "md:col-span-3";
  if (total === 1) return "md:col-span-6 lg:col-span-12";
  if (total === 2) return `md:col-span-3 ${i === 0 ? "lg:col-span-7" : "lg:col-span-5"}`;
  if (i === 0) return `${md} lg:col-span-7 lg:row-span-2`;
  if (i <= 2) return `${md} lg:col-span-5`;
  const k = i - 3;
  const remaining = total - 3;
  const lastRowStart = remaining - (remaining % 3 || 3);
  if (k >= lastRowStart) {
    const inLast = remaining - lastRowStart;
    return `${md} ${inLast === 1 ? "lg:col-span-12" : inLast === 2 ? "lg:col-span-6" : "lg:col-span-4"}`;
  }
  return `${md} lg:col-span-4`;
}

function ProjectCard({ project: p, large }: { project: Project; large: boolean }) {
  const cover = publicFileExists(p.cover) ? asset(p.cover) : undefined;
  const icon = publicFileExists(p.icon) ? asset(p.icon) : undefined;
  const shots = p.screenshots.filter((s) => publicFileExists(s));
  const reel = p.preview === "phones" && shots.length > 0;

  return (
    <Link
      href={`/projects/${p.slug}/`}
      className="glass glass-hover group flex h-full flex-col overflow-hidden"
      aria-label={`${p.name} — view project details`}
    >
      <div
        className={cn(
          "relative overflow-hidden border-b border-line bg-ink-850",
          large ? "aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[22rem] lg:flex-1" : "aspect-[16/9]",
        )}
      >
        {reel ? (
          <PhoneReel screens={shots} accent={p.accent} />
        ) : cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt=""
            loading="lazy"
            decoding="async"
            width={1200}
            height={750}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
          />
        ) : (
          <CoverFallback name={p.name} />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {p.confidential ? (
            <span className="chip !h-7 !border-white/15 !bg-ink-950/70 !text-fg backdrop-blur">
              <Icon name="lock" size={13} />
              Confidential
            </span>
          ) : null}
          {p.sample ? (
            <span className="chip !h-7 !border-[#f0b46a]/30 !bg-ink-950/70 !text-[#f0c58a] backdrop-blur">Sample</span>
          ) : null}
        </div>
      </div>

      <div className={cn("flex flex-col p-5 sm:p-6", large ? "lg:flex-none lg:p-8" : "flex-1")}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3.5">
            {icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={icon}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                className="mt-0.5 h-12 w-12 shrink-0 rounded-[0.8rem] border border-line-strong object-cover"
              />
            ) : null}
            <div className="min-w-0">
            {p.category ? <p className="eyebrow">{p.category}</p> : null}
            <h3
              className={cn(
                "mt-2.5 font-semibold leading-tight tracking-[-0.02em] text-fg",
                large ? "text-2xl sm:text-[1.75rem]" : "text-xl",
              )}
            >
              {p.name}
            </h3>
            </div>
          </div>
          <span className="icon-btn !h-10 !w-10 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg">
            <Icon name="arrowUpRight" size={18} />
          </span>
        </div>
        {p.client ? (
          <p className="mt-3 text-[0.8125rem] leading-snug text-cyan/90">
            <span className="text-subtle">For </span>
            {p.client}
          </p>
        ) : null}
        <p className={cn("mt-3 text-pretty leading-relaxed text-muted", large ? "text-base" : "text-[0.9375rem]")}>
          {p.summary}
        </p>
        {p.stack.length ? (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Technology stack">
            {p.stack.slice(0, large ? 6 : 4).map((t) => (
              <li key={t} className="chip !h-7 !px-2.5 !text-xs">
                {t}
              </li>
            ))}
            {p.stack.length > (large ? 6 : 4) ? (
              <li className="chip !h-7 !px-2.5 !text-xs">+{p.stack.length - (large ? 6 : 4)}</li>
            ) : null}
          </ul>
        ) : null}
        {p.links.store || p.links.demo ? (
          <p className={cn("flex flex-wrap gap-x-4 gap-y-1 text-xs text-subtle", p.stack.length ? "pt-4" : "mt-auto pt-5")}>
            {p.links.store ? (
              <span className="inline-flex items-center gap-1.5">
                <Icon name="play" size={12} className="text-live" />
                On Google Play
              </span>
            ) : null}
            {p.links.demo ? (
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />
                Live
              </span>
            ) : null}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

/** Shown when a project has no cover image yet. */
export function CoverFallback({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_90%_at_20%_0%,rgba(77,141,255,0.25),transparent_60%),radial-gradient(90%_80%_at_100%_100%,rgba(139,124,255,0.18),transparent_60%)]">
      <span className="font-mono text-sm tracking-tight text-subtle">{name}</span>
    </div>
  );
}
