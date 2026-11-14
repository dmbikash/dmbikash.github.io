import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/lib/content";

import { ExperienceEntry } from "./ExperienceEntry";

export function Experience() {
  if (!experience.items.length) return null;
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad">
      <div className="container-page">
        <SectionHeader id="experience-title" index="02" label="Experience" title={experience.title} intro={experience.intro} />

        <ol className="md:grid md:grid-cols-12 md:gap-x-8">
          {experience.items.map((item, i) => (
            <Reveal
              as="li"
              key={`${item.organization}-${item.role}-${i}`}
              className="group relative pb-5 pl-8 last:pb-0 md:col-span-9 md:col-start-4 md:pl-0"
            >
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-[7px] top-0 w-px bg-gradient-to-b from-accent/50 to-line-strong group-first:top-8 group-last:bottom-auto group-last:h-8 md:-left-6 md:group-first:top-9 md:group-last:h-9 group-only:hidden"
              />
              <span
                aria-hidden="true"
                className="absolute left-0 top-8 grid h-[0.9375rem] w-[0.9375rem] place-items-center rounded-full border border-accent/60 bg-ink-950 md:-left-[31px] md:top-9"
              >
                <span className={item.current ? "h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)]" : "h-1.5 w-1.5 rounded-full bg-accent/70"} />
              </span>
              <ExperienceEntry item={item} defaultOpen={i === 0} />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
