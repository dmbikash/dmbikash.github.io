"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One tiny global script instead of per-component listeners:
 *  1. Reveals [data-reveal] elements as they scroll into view.
 *  2. Feeds pointer position to .glass-hover cards for the specular highlight.
 */
export function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    // 1. scroll reveal
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io?.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      items.forEach((el) => io!.observe(el));
    } else {
      items.forEach((el) => el.classList.add("is-visible"));
    }

    // 2. pointer glow (fine pointers only)
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let frame = 0;
    const onMove = (ev: PointerEvent) => {
      const card = (ev.target as Element | null)?.closest<HTMLElement>(".glass-hover");
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${ev.clientX - r.left}px`);
        card.style.setProperty("--my", `${ev.clientY - r.top}px`);
      });
    };
    if (fine) root.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io?.disconnect();
      root.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [pathname]); // re-scan after client-side navigation

  return null;
}
