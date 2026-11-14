"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type NavItem = { id: string; label: string };

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function Navbar({
  items,
  brand,
  brandFull,
  cvHref,
}: {
  items: NavItem[];
  brand: string;
  brandFull: string;
  cvHref?: string;
}) {
  const pathname = usePathname();
  const onHome = pathname === "/" || pathname === "";
  const [active, setActive] = useState<string>(onHome ? items[0]?.id ?? "" : "projects");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  // Track which section is in view (home page only).
  useEffect(() => {
    if (!onHome) {
      setActive(pathname.startsWith("/projects") ? "projects" : "");
      return;
    }
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        // Pick the section nearest the top that is meaningfully visible.
        const current = sections.find((s) => (visible.get(s.id) ?? 0) > 0);
        if (current) setActive(current.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01, 0.25] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items, onHome, pathname]);

  // Background gets denser once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Slide the active indicator under the current link (desktop).
  const measure = useCallback(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !link) return setPill(null);
    setPill({ x: link.offsetLeft, w: link.offsetWidth });
  }, [active]);

  useIsoLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Mobile menu: close on Escape, outside tap, or when resizing to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !toggleRef.current?.contains(t)) setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 64rem)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const LinkEl = onHome ? "a" : Link;

  /** On the home page, scroll in JS so it also works while the mobile menu is closing. */
  const go = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (!onHome) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", `#${id}`);
      setActive(id);
    });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <nav
          aria-label="Primary"
          className={cn(
            "pointer-events-auto relative mx-auto flex h-14 max-w-[76rem] items-center justify-between gap-3 rounded-full border pl-2 pr-2 transition-[background-color,border-color,box-shadow] duration-500",
            "backdrop-blur-xl backdrop-saturate-150",
            scrolled || open
              ? "border-line-strong bg-ink-900/70 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.8)]"
              : "border-line bg-ink-900/35",
          )}
        >
          {/* Brand */}
          <LinkEl
            href={onHome ? "#home" : "/"}
            className="group flex min-h-11 items-center gap-2.5 rounded-full pl-1 pr-3"
            aria-label={`${brandFull} — home`}
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-gradient-to-br from-accent/30 to-violet/20 font-mono text-[0.8125rem] font-medium tracking-tight text-fg shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
              {brand}
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-fg sm:inline">{brandFull}</span>
          </LinkEl>

          {/* Desktop links */}
          <ul ref={listRef} className="relative hidden items-center lg:flex">
            {pill && (
              <span
                aria-hidden="true"
                className="absolute inset-y-0 rounded-full border border-line-strong bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-[transform,width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ width: pill.w, transform: `translateX(${pill.x}px)` }}
              />
            )}
            {items.map((item) => (
              <li key={item.id}>
                <LinkEl
                  href={href(item.id)}
                  onClick={go(item.id)}
                  data-id={item.id}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative z-10 inline-flex h-10 items-center rounded-full px-3.5 text-sm transition-colors duration-300 xl:px-4",
                    active === item.id ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </LinkEl>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {cvHref ? (
              <a href={cvHref} download className="btn btn-ghost hidden !min-h-10 !px-4 text-sm sm:inline-flex">
                <Icon name="download" size={16} />
                CV
              </a>
            ) : null}
            <button
              ref={toggleRef}
              type="button"
              className="icon-btn !h-11 !w-11 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <m.div
              ref={panelRef}
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto mx-auto mt-2 max-w-[76rem] origin-top overflow-hidden rounded-3xl border border-line-strong bg-ink-900/90 p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl lg:hidden"
            >
              <ul className="grid gap-0.5">
                {items.map((item, i) => (
                  <li key={item.id}>
                    <LinkEl
                      href={href(item.id)}
                      onClick={go(item.id)}
                      aria-current={active === item.id ? "true" : undefined}
                      className={cn(
                        "flex min-h-12 items-center justify-between rounded-2xl px-4 text-base transition-colors",
                        active === item.id ? "bg-white/[0.06] text-fg" : "text-muted active:bg-white/[0.04]",
                      )}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                    </LinkEl>
                  </li>
                ))}
              </ul>
              {cvHref ? (
                <a href={cvHref} download className="btn btn-primary mt-2 w-full sm:hidden">
                  <Icon name="download" size={18} />
                  Download CV
                </a>
              ) : null}
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </LazyMotion>
  );
}
