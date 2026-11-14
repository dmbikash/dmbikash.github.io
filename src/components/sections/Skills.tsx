import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skills } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Skills() {
  if (!skills.categories.length) return null;
  const featuredCount = skills.categories.filter((c) => c.featured).length;
  const restCount = skills.categories.length - (featuredCount <= 2 ? featuredCount : 0);
  // rows of three when it divides evenly, otherwise rows of two, so no row is left half-empty
  const restSpan = restCount % 3 === 0 ? "lg:col-span-2" : restCount % 2 === 0 ? "lg:col-span-3" : "lg:col-span-2";

  return (
    <section id="skills" aria-labelledby="skills-title" className="section-pad">
      <div className="container-page">
        <SectionHeader id="skills-title" index="04" label="Skills" title={skills.title} intro={skills.intro} />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {skills.categories.map((cat, i) => {
            // featured categories get wide tiles; the rest share rows of three
            const wide = cat.featured && featuredCount <= 2;
            return (
              <Reveal
                as="li"
                key={cat.name}
                delay={(i % 3) * 70}
                className={cn(
                  "glass glass-hover flex flex-col p-6 sm:p-7",
                  wide ? "sm:col-span-2 lg:col-span-3" : restSpan,
                  !wide && i === skills.categories.length - 1 && restCount % 2 === 1 && "sm:col-span-2",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-xl border border-line-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
                      cat.featured ? "bg-gradient-to-br from-accent/30 to-cyan/10 text-cyan" : "bg-white/[0.04] text-muted",
                    )}
                  >
                    <Icon name={cat.icon} size={21} />
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.01em] text-fg sm:text-xl">{cat.name}</h3>
                {cat.description ? <p className="mt-2 text-pretty text-[0.9375rem] leading-relaxed text-muted">{cat.description}</p> : null}
                <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label={`${cat.name} skills`}>
                  {cat.skills.map((s) => (
                    <li key={s} className={cn("chip", wide && "!h-9 !px-4 !text-sm !text-fg")}>
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
