import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { profile } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-fg">{profile.name}</p>
          <p className="mt-1 text-sm text-subtle">
            {profile.role.split("|")[0]?.trim()} · © {year}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {profile.socials.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label={s.label}
            >
              <Icon name={s.icon} size={18} />
            </a>
          ))}
          <Link href="/#home" className="icon-btn" aria-label="Back to top">
            <Icon name="arrowUp" size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
