import { Chips } from "@/components/ui/Chips";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { education } from "@/lib/content";

export function Education() {
  if (!education.items.length) return null;
  return (
    <section id="education" aria-labelledby="education-title" className="section-pad">
      <div className="container-page">
        <SectionHeader id="education-title" index="05" label="Education" title={education.title} />

        <div className="grid gap-4 lg:gap-5">
          {education.items.map((ed, i) => {
            const years = [ed.startYear, ed.graduationYear].filter(Boolean).join(" — ");
            return (
              <Reveal key={`${ed.institution}-${i}`} className="glass glass-hover overflow-hidden">
                <div className="grid md:grid-cols-12">
                  <div className="p-6 sm:p-8 md:col-span-8 lg:p-10">
                    <div className="flex items-center gap-3 text-accent">
                      <Icon name="graduation" size={22} />
                      {years ? <span className="font-mono text-[0.8125rem] text-subtle">{years}</span> : null}
                    </div>
                    <h3 className="mt-6 text-balance text-2xl font-semibold leading-tight tracking-[-0.02em] text-fg sm:text-3xl">
                      {ed.degree}
                    </h3>
                    <p className="mt-2 text-lg text-muted">
                      {ed.institution}
                      {ed.location ? <span className="text-subtle"> · {ed.location}</span> : null}
                    </p>
                    {ed.description ? <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted">{ed.description}</p> : null}
                    {ed.thesis ? (
                      <p className="mt-5 text-[0.9375rem] text-muted">
                        <span className="eyebrow mr-3">Thesis</span>
                        {ed.thesis}
                      </p>
                    ) : null}
                    {ed.coursework.length ? (
                      <div className="mt-7">
                        <p className="eyebrow">Relevant coursework</p>
                        <Chips items={ed.coursework} className="mt-3" label="Relevant coursework" />
                      </div>
                    ) : null}
                  </div>

                  {ed.grade ? (
                    <div className="relative flex flex-col justify-between gap-8 border-t border-line p-6 sm:p-8 md:col-span-4 md:border-l md:border-t-0 lg:p-10">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(80%_70%_at_100%_0%,rgba(77,141,255,0.16),transparent_70%)]"
                      />
                      <p className="eyebrow relative">{ed.grade.label}</p>
                      <p className="relative">
                        <span className="bg-gradient-to-br from-fg to-muted bg-clip-text text-[4.5rem] font-semibold leading-none tracking-[-0.05em] text-transparent sm:text-[5.5rem]">
                          {ed.grade.value}
                        </span>
                        {ed.grade.scale ? (
                          <span className="ml-2 font-mono text-sm text-subtle">/ {ed.grade.scale}</span>
                        ) : null}
                      </p>
                    </div>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
