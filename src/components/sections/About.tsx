import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { about, profile } from "@/lib/content";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad">
      <div className="container-page">
        <SectionHeader id="about-title" index="01" label="About" title={about.title} />

        <div className="grid gap-4 md:grid-cols-6 lg:grid-cols-12 lg:gap-5">
          {/* Biography */}
          <Reveal className="glass glass-hover p-6 sm:p-8 md:col-span-6 lg:col-span-7 lg:p-10">
            <p className="eyebrow">Biography</p>
            <div className="mt-6 space-y-5">
              {about.biography.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-pretty text-xl leading-snug tracking-[-0.01em] text-fg sm:text-2xl"
                      : "text-pretty text-base leading-relaxed text-muted sm:text-lg"
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Highlights 2×2 */}
          {profile.highlights.length ? (
            <Reveal delay={80} className="grid grid-cols-2 gap-4 md:col-span-6 lg:col-span-5 lg:gap-5">
              {profile.highlights.slice(0, 4).map((h) => (
                <div key={h.label} className="glass glass-hover flex min-h-36 flex-col justify-between p-5 sm:p-6">
                  <p className="eyebrow">{h.label}</p>
                  <div className="mt-6">
                    <p className="text-balance text-lg font-semibold leading-tight tracking-[-0.02em] text-fg sm:text-[1.375rem]">
                      {h.value}
                    </p>
                    {h.detail ? <p className="mt-1.5 text-[0.8125rem] leading-snug text-subtle">{h.detail}</p> : null}
                  </div>
                </div>
              ))}
            </Reveal>
          ) : null}

          {/* Technical interests */}
          {about.interests.length ? (
            <Reveal className="glass glass-hover p-6 sm:p-8 md:col-span-6 lg:col-span-7">
              <p className="eyebrow">Technical interests</p>
              <ul className="mt-6 grid gap-x-6 sm:grid-cols-2">
                {about.interests.map((interest, i) => (
                  <li
                    key={interest}
                    className="flex items-baseline gap-4 border-t border-line py-3 text-[0.9375rem] text-fg"
                  >
                    <span className="font-mono text-[0.6875rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {interest}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          {/* Philosophy */}
          {about.philosophy ? (
            <Reveal delay={80} className="glass glass-hover flex flex-col p-6 sm:p-8 md:col-span-6 lg:col-span-5">
              <p className="eyebrow">Philosophy</p>
              <blockquote className="mt-6 flex-1">
                <span className="block font-serif text-5xl leading-none text-accent/60" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="-mt-2 text-pretty text-lg leading-relaxed text-fg">{about.philosophy}</p>
              </blockquote>
            </Reveal>
          ) : null}

          {about.experienceSummary ? (
            <Reveal className="glass glass-hover p-6 sm:p-8 md:col-span-3 lg:col-span-6">
              <p className="eyebrow">Experience</p>
              <p className="mt-5 text-pretty leading-relaxed text-muted">{about.experienceSummary}</p>
            </Reveal>
          ) : null}

          {about.objectives ? (
            <Reveal delay={80} className="glass glass-hover p-6 sm:p-8 md:col-span-3 lg:col-span-6">
              <p className="eyebrow">What I&rsquo;m looking for</p>
              <p className="mt-5 text-pretty leading-relaxed text-muted">{about.objectives}</p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
