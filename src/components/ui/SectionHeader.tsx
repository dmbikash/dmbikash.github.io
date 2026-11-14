import { Reveal } from "./Reveal";

/** Swiss-style section heading: mono index + title + optional intro, on a shared grid. */
export function SectionHeader({
  index,
  label,
  title,
  intro,
  id,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
  id?: string;
}) {
  return (
    <Reveal className="mb-10 grid gap-5 md:mb-14 md:grid-cols-12 md:gap-8">
      <p className="eyebrow flex items-center gap-3 md:col-span-3 md:pt-3">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        <span>{label}</span>
      </p>
      <div className="md:col-span-9">
        <h2
          id={id}
          className="text-balance text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-fg sm:text-[2.5rem] lg:text-[3.25rem]"
        >
          {title}
        </h2>
        {intro ? <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">{intro}</p> : null}
      </div>
    </Reveal>
  );
}
