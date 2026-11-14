"use client";

import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";

import { Chips } from "@/components/ui/Chips";
import { Icon } from "@/components/ui/Icon";
import type { ExperienceItem } from "@/lib/content";
import { cn, dateRange } from "@/lib/utils";

export function ExperienceEntry({ item, defaultOpen = false }: { item: ExperienceItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();
  const panelId = useId();
  const hasDetails = item.responsibilities.length + item.technologies.length + item.achievements.length > 0;
  const range = dateRange(item.startDate, item.endDate, item.current);

  return (
    <article className="glass glass-hover p-5 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {item.current ? (
              <span className="inline-flex h-6 items-center gap-2 rounded-full border border-live/30 bg-live/10 px-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-live">
                <span className="pulse-dot !h-1.5 !w-1.5" aria-hidden="true" />
                Current
              </span>
            ) : null}
            {item.employmentType ? (
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-subtle">{item.employmentType}</span>
            ) : null}
          </div>
          <h3 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.02em] text-fg sm:text-2xl">{item.role}</h3>
          <p className="mt-1 text-base text-muted">{item.organization}</p>
        </div>

        <dl className="flex shrink-0 flex-wrap gap-x-5 gap-y-1.5 text-sm text-subtle sm:flex-col sm:items-end sm:text-right">
          {range ? (
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Dates</dt>
              <Icon name="calendar" size={15} />
              <dd className="font-mono text-[0.8125rem]">{range}</dd>
            </div>
          ) : null}
          {item.location ? (
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Location</dt>
              <Icon name="mapPin" size={15} />
              <dd>{item.location}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      {item.description ? <p className="mt-5 max-w-3xl text-pretty leading-relaxed text-muted">{item.description}</p> : null}

      {hasDetails ? (
        <>
          <button
            type="button"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-medium text-accent transition-colors hover:text-cyan"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Hide details" : "Show details"}
            <Icon
              name="chevronDown"
              size={16}
              className={cn("transition-transform duration-300", open && "rotate-180")}
            />
          </button>

          <LazyMotion features={domAnimation} strict>
            <AnimatePresence initial={false}>
              {open && (
                <m.div
                  id={panelId}
                  key="details"
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-6 border-t border-line pt-6 mt-3 md:grid-cols-2 md:gap-8">
                    {item.responsibilities.length ? (
                      <DetailList title="Responsibilities" items={item.responsibilities} />
                    ) : null}
                    {item.achievements.length ? <DetailList title="Achievements" items={item.achievements} accent /> : null}
                    {item.technologies.length ? (
                      <div className="md:col-span-2">
                        <h4 className="eyebrow">Technologies</h4>
                        <Chips items={item.technologies} className="mt-3" label="Technologies used" />
                      </div>
                    ) : null}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </LazyMotion>
        </>
      ) : null}
    </article>
  );
}

function DetailList({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div>
      <h4 className="eyebrow">{title}</h4>
      <ul className="mt-3 space-y-2.5">
        {items.map((x, i) => (
          <li key={i} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
            <span
              className={cn("mt-[0.6rem] h-1 w-1 shrink-0 rounded-full", accent ? "bg-cyan" : "bg-accent")}
              aria-hidden="true"
            />
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}
