import type { SVGProps } from "react";

/** Inline SVG icon set (no icon library dependency). Stroke icons on a 24px grid. */
const paths = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  arrowLeft: <path d="M19 12H5M11 18l-6-6 6-6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  mapPin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h18" />
    </>
  ),
  graduation: (
    <>
      <path d="m2.5 9 9.5-5 9.5 5-9.5 5-9.5-5Z" />
      <path d="M6.5 11.2V16c1.5 1.4 3.4 2 5.5 2s4-.6 5.5-2v-4.8M21.5 9v5" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2.5" />
      <path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  send: <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" />,
  sparkle: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  // skill categories
  mobile: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  realtime: (
    <>
      <path d="M5 12a7 7 0 0 1 14 0M8 12a4 4 0 0 1 8 0" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <path d="M12 13v8" />
    </>
  ),
  server: (
    <>
      <rect x="3.5" y="4" width="17" height="7" rx="2" />
      <rect x="3.5" y="13" width="17" height="7" rx="2" />
      <path d="M7.5 7.5h.01M7.5 16.5h.01" />
    </>
  ),
  layers: <path d="m12 3 9 5-9 5-9-5 9-5ZM3 12.5l9 5 9-5M3 16.5l9 5 9-5" />,
  tools: <path d="M14.5 6.5a4 4 0 0 0-5.3 5L4 16.7 7.3 20l5.2-5.2a4 4 0 0 0 5-5.3l-2.4 2.4-2.6-.7-.7-2.6 2.4-2.4Z" />,
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  cloud: <path d="M7 18a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 9.5a4.3 4.3 0 0 1-.5 8.5H7Z" />,
  shield: <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />,
  test: <path d="M9 3h6M10 3v6l-5.5 9.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" />,
  design: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="8.5" cy="10" r="1" fill="currentColor" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" />
      <circle cx="15.5" cy="10" r="1" fill="currentColor" />
    </>
  ),
  offline: (
    <>
      <path d="M3 3l18 18M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 4.2-2.4M19 13a10 10 0 0 0-2.6-1.8M2 9.5a14 14 0 0 1 4-2.6M22 9.5A14 14 0 0 0 11 6" />
      <circle cx="12" cy="20" r=".8" fill="currentColor" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c.6-3.4 3-5.5 6-5.5s5.4 2.1 6 5.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16.5 14.6c2.3.2 4 1.9 4.5 4.6" />
    </>
  ),
  play: <path d="M6 4.5v15l13-7.5-13-7.5Z" />,
  link: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />,
  website: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5S9.6 5.9 12 3.5Z" />
    </>
  ),
} as const;

/** Brand marks are filled glyphs. */
const brands = {
  github: (
    <path d="M12 2.25a9.75 9.75 0 0 0-3.08 19c.49.09.67-.21.67-.47v-1.65c-2.72.59-3.29-1.31-3.29-1.31-.44-1.13-1.08-1.43-1.08-1.43-.89-.6.07-.59.07-.59.98.07 1.5 1.01 1.5 1.01.87 1.5 2.29 1.07 2.85.81.09-.63.34-1.07.62-1.31-2.17-.25-4.46-1.09-4.46-4.83 0-1.07.38-1.94 1.01-2.62-.1-.25-.44-1.24.1-2.59 0 0 .82-.26 2.68 1a9.3 9.3 0 0 1 4.88 0c1.86-1.26 2.68-1 2.68-1 .54 1.35.2 2.34.1 2.59.63.68 1.01 1.55 1.01 2.62 0 3.75-2.29 4.58-4.47 4.82.35.3.66.9.66 1.81v2.68c0 .26.18.57.67.47A9.75 9.75 0 0 0 12 2.25Z" />
  ),
  linkedin: (
    <path d="M19.7 3H4.3A1.3 1.3 0 0 0 3 4.3v15.4A1.3 1.3 0 0 0 4.3 21h15.4a1.3 1.3 0 0 0 1.3-1.3V4.3A1.3 1.3 0 0 0 19.7 3ZM8.4 18.3H5.7V9.7h2.7v8.6ZM7 8.5a1.6 1.6 0 1 1 0-3.1 1.6 1.6 0 0 1 0 3.1Zm11.3 9.8h-2.7v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3H10V9.7h2.6v1.2a2.8 2.8 0 0 1 2.5-1.4c2.7 0 3.2 1.8 3.2 4.1v4.7Z" />
  ),
  x: <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5Z" />,
  stackoverflow: <path d="M17.4 20.2v-5.4h1.8V22H3.5v-7.2h1.8v5.4h12.1ZM7.3 14.3l8.8 1.9.4-1.8-8.8-1.9-.4 1.8Zm1.2-4.3 8.2 3.8.7-1.7-8.2-3.8-.7 1.7Zm2.3-4 6.9 5.8 1.2-1.4-7-5.8-1.1 1.4ZM15.3 1.7l-1.5 1.1 5.4 7.2 1.5-1.1-5.4-7.2ZM7.1 18.4h9v-1.8h-9v1.8Z" />,
  medium: <path d="M13.5 12a6.3 6.3 0 1 1-12.6 0 6.3 6.3 0 0 1 12.6 0Zm6.9 0c0 3.2-1.4 5.8-3.1 5.8s-3.2-2.6-3.2-5.8 1.4-5.8 3.2-5.8 3.1 2.6 3.1 5.8Zm2.8 0c0 2.9-.5 5.2-1.1 5.2s-1.1-2.3-1.1-5.2.5-5.2 1.1-5.2 1.1 2.3 1.1 5.2Z" />,
  youtube: <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" />,
} as const;

export type IconName = keyof typeof paths | keyof typeof brands;

export function Icon({
  name,
  size = 20,
  ...rest
}: { name: IconName; size?: number } & Omit<SVGProps<SVGSVGElement>, "name">) {
  const isBrand = name in brands;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill={isBrand ? "currentColor" : "none"}
      stroke={isBrand ? "none" : "currentColor"}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {isBrand ? brands[name as keyof typeof brands] : paths[name as keyof typeof paths]}
    </svg>
  );
}
