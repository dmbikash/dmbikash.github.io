import type { CSSProperties } from "react";

import { asset, cn } from "@/lib/utils";

/** A CSS phone frame around one screenshot. Size it with width/height classes on `className`. */
export function PhoneFrame({
  src,
  alt = "",
  className,
  lazy = true,
}: {
  src: string;
  alt?: string;
  className?: string;
  lazy?: boolean;
}) {
  return (
    <div className={cn("phone", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(src)} alt={alt} loading={lazy ? "lazy" : "eager"} decoding="async" width={720} height={1500} />
    </div>
  );
}

/**
 * Animated preview for a project card: the screenshots cross-fade inside a centre phone,
 * with two dimmed phones either side. Pure CSS; stops for prefers-reduced-motion.
 */
export function PhoneReel({ screens, accent }: { screens: string[]; accent?: string }) {
  const shots = screens.slice(0, 6);
  const n = Math.max(2, shots.length);
  const step = 3.2; // seconds per screen
  const left = shots[1] ?? shots[0];
  const right = shots[2] ?? shots[1] ?? shots[0];
  const tint = accent ?? "#4d8dff";

  return (
    <div
      className="reel absolute inset-0"
      style={{
        background: `radial-gradient(80% 90% at 50% 100%, ${tint}55, transparent 70%), radial-gradient(60% 60% at 0% 0%, ${tint}33, transparent 70%), var(--color-ink-850)`,
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] [background-size:48px_48px]" />
      {left ? <PhoneFrame src={left} className="reel__side reel__side--l" /> : null}
      {right ? <PhoneFrame src={right} className="reel__side reel__side--r" /> : null}
      <div className="phone reel__main">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(shots[0])} alt="" loading="lazy" decoding="async" width={720} height={1500} />
        {shots.length > 1
          ? shots.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={s}
                src={asset(s)}
                alt=""
                loading="lazy"
                decoding="async"
                width={720}
                height={1500}
                className="reel__frame"
                style={
                  {
                    animationName: `reel-${n}`,
                    animationDuration: `${n * step}s`,
                    animationDelay: `${i * step}s`,
                  } as CSSProperties
                }
              />
            ))
          : null}
      </div>
    </div>
  );
}
