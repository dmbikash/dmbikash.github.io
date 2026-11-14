"use client";

import { useState } from "react";

import { Icon } from "@/components/ui/Icon";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="icon-btn shrink-0"
      aria-label={copied ? "Email copied" : "Copy email address"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
    >
      <Icon name={copied ? "check" : "copy"} size={18} className={copied ? "text-live" : undefined} />
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
