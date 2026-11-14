import type { CSSProperties } from "react";

import { Icon } from "@/components/ui/Icon";
import { profile } from "@/lib/content";
import { publicFileExists } from "@/lib/server";
import { asset } from "@/lib/utils";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const cv = publicFileExists(profile.cv) ? asset(profile.cv) : undefined;
  const [primaryRole, ...restRole] = profile.role.split("|").map((s) => s.trim());

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center pb-16 pt-28 sm:pt-32 lg:pb-20"
    >
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="lg:col-span-7">
          <div className="enter flex flex-wrap items-center gap-x-4 gap-y-3" style={delay(0)}>
            {profile.availability?.show ? (
              <span className="inline-flex h-8 items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.04] px-3.5 text-[0.8125rem] text-fg backdrop-blur">
                <span className="pulse-dot" aria-hidden="true" />
                {profile.availability.label}
              </span>
            ) : null}
            {profile.location ? (
              <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-subtle">
                <Icon name="mapPin" size={15} />
                {profile.location}
              </span>
            ) : null}
          </div>

          <p className="enter mt-8 text-base text-muted sm:text-lg" style={delay(80)}>
            Hi, I&rsquo;m <span className="font-medium text-fg">{profile.name}</span>
          </p>

          <h1
            id="hero-title"
            className="enter mt-3 text-balance text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.04em] text-fg xs:text-[2.85rem] sm:text-[3.75rem] lg:text-[4.25rem] xl:text-[4.9rem]"
            style={delay(140)}
          >
            <HeadlineAccent text={profile.headline} />
          </h1>

          <p
            className="enter mt-6 flex flex-col gap-x-3 gap-y-1.5 font-mono sm:flex-row sm:flex-wrap sm:items-center text-[0.8125rem] uppercase tracking-[0.12em] text-cyan"
            style={delay(220)}
          >
            <span>{primaryRole}</span>
            {restRole.map((r) => (
              <span key={r} className="flex items-center gap-3">
                <span className="hidden h-3 w-px bg-line-strong sm:block" aria-hidden="true" />
                {r}
              </span>
            ))}
          </p>

          <p className="enter mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg" style={delay(280)}>
            {profile.intro}
          </p>

          <div className="enter mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center" style={delay(360)}>
            <a href="#projects" className="btn btn-primary">
              View projects
              <Icon name="arrowRight" size={18} />
            </a>
            {cv ? (
              <a href={cv} download className="btn btn-ghost">
                <Icon name="download" size={18} />
                Download CV
              </a>
            ) : null}
            <a href="#contact" className="btn btn-ghost">
              Get in touch
            </a>
          </div>

          {profile.socials.length ? (
            <ul className="enter mt-8 flex items-center gap-2" style={delay(440)} aria-label="Social profiles">
              {profile.socials.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-btn"
                    aria-label={`${s.label} (opens in a new tab)`}
                  >
                    <Icon name={s.icon} size={19} />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Visual */}
        <div className="enter lg:col-span-5" style={delay(300)}>
          <HeroVisual years={profile.yearsOfExperience} />
        </div>
      </div>

    </section>
  );
}

/** Colours the last two words of the headline with the accent gradient. */
function HeadlineAccent({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  if (words.length < 4) return <>{text}</>;
  const tail = words.slice(-2).join(" ");
  const head = words.slice(0, -2).join(" ");
  return (
    <>
      {head}{" "}
      <span className="bg-gradient-to-r from-accent via-[#7aa8ff] to-cyan bg-clip-text text-transparent">{tail}</span>
    </>
  );
}

/**
 * A composed glass "device" scene: a call session card in front of a Dart code card.
 * Purely decorative — no fabricated numbers, just the craft.
 */
function HeroVisual({ years }: { years?: number }) {
  return (
    <div className="relative mx-auto aspect-[5/5.4] w-full max-w-[21rem] sm:max-w-[30rem] lg:max-w-none" aria-hidden="true">
      {/* glow */}
      <div className="absolute inset-[12%] rounded-full bg-accent/25 blur-3xl" />

      {/* Back card: Dart code */}
      <div className="glass absolute right-0 top-0 w-[86%] overflow-hidden p-0">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-[0.6875rem] text-subtle">call_screen.dart</span>
        </div>
        <pre className="overflow-hidden px-4 py-4 font-mono text-[0.6875rem] leading-[1.75] text-muted sm:text-xs">
          <code>
            <span className="text-violet">class</span> <span className="text-cyan">CallScreen</span>{" "}
            <span className="text-violet">extends</span> StatelessWidget {"{"}
            {"\n"}  <span className="text-subtle">{"// "}{years ? `${years} years shipping Flutter` : "shipping Flutter"}</span>
            {"\n"}  <span className="text-violet">@override</span>
            {"\n"}  Widget <span className="text-[#7aa8ff]">build</span>(context) {"{"}
            {"\n"}    <span className="text-violet">return</span> <span className="text-cyan">RTCVideoView</span>(
            {"\n"}      renderer,
            {"\n"}      mirror: <span className="text-[#f0b46a]">true</span>,
            {"\n"}    );
            {"\n"}  {"}"}
            {"\n"}
            {"}"}
          </code>
        </pre>
      </div>

      {/* Front card: call session */}
      <div className="glass absolute bottom-0 left-0 w-[70%] p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-subtle">
            <span className="pulse-dot" />
            Peer connected
          </span>
          <span className="font-mono text-[0.6875rem] text-subtle">P2P</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-gradient-to-br from-accent/35 via-ink-800 to-ink-900">
            <div className="absolute left-1/2 top-[38%] h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15" />
            <div className="absolute bottom-0 left-1/2 h-[30%] w-[64%] -translate-x-1/2 rounded-t-full bg-white/10" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-gradient-to-br from-violet/30 via-ink-800 to-ink-900">
            <div className="absolute left-1/2 top-[38%] h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15" />
            <div className="absolute bottom-0 left-1/2 h-[30%] w-[64%] -translate-x-1/2 rounded-t-full bg-white/10" />
          </div>
        </div>

        <div className="wave mt-4 flex h-7 items-center gap-[3px]">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} style={{ "--i": i, height: `${30 + ((i * 37) % 70)}%` } as CSSProperties} />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2.5">
          {["mic", "cam", "end"].map((k) => (
            <span
              key={k}
              className={
                k === "end"
                  ? "h-9 w-12 rounded-full bg-[#ff5d6c]/85 shadow-[0_6px_20px_-6px_rgba(255,93,108,0.8)]"
                  : "h-9 w-9 rounded-full border border-line-strong bg-white/[0.06]"
              }
            />
          ))}
        </div>
      </div>

      {/* Floating label */}
      <div className="glass absolute right-[4%] top-[58%] hidden items-center gap-2.5 !rounded-full px-4 py-2.5 xs:flex">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-accent to-cyan text-ink-950">
          <Icon name="code" size={14} strokeWidth={2.2} />
        </span>
        <span className="text-xs font-medium text-fg">Flutter · Dart</span>
      </div>
    </div>
  );
}
