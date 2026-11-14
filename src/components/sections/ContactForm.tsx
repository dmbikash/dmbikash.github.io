"use client";

import { useState, type FormEvent } from "react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Sends through a static-site form service (Web3Forms or Formspree) — GitHub Pages has no server.
 * Only rendered when an access key / form id is configured in content/contact.json.
 */
export function ContactForm({
  provider,
  accessKey,
  subject,
  fallbackEmail,
}: {
  provider: "web3forms" | "formspree";
  accessKey: string;
  subject?: string;
  fallbackEmail?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.botcheck) return; // honeypot filled → silently ignore bots

    setStatus("sending");
    setError("");
    try {
      const res =
        provider === "web3forms"
          ? await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json", Accept: "application/json" },
              body: JSON.stringify({
                access_key: accessKey,
                subject: subject ?? "New message from your portfolio",
                from_name: data.name,
                name: data.name,
                email: data.email,
                message: data.message,
              }),
            })
          : await fetch(`https://formspree.io/f/${accessKey}`, {
              method: "POST",
              headers: { "Content-Type": "application/json", Accept: "application/json" },
              body: JSON.stringify({ name: data.name, email: data.email, message: data.message, _subject: subject }),
            });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean; ok?: boolean; message?: string };
      if (!res.ok || json.success === false) throw new Error(json.message || `Request failed (${res.status})`);
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex h-full min-h-72 flex-col items-center justify-center text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-live/30 bg-live/10 text-live">
          <Icon name="check" size={26} />
        </span>
        <p className="mt-5 text-xl font-semibold text-fg">Message sent</p>
        <p className="mt-2 max-w-xs text-muted">Thanks for reaching out — I&rsquo;ll get back to you soon.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-6">
          Send another
        </button>
      </div>
    );
  }

  const field =
    "mt-2 block w-full rounded-xl border border-line-strong bg-ink-950/50 px-4 py-3 text-base text-fg placeholder:text-subtle/70 transition-colors focus:border-accent/70 focus:bg-ink-950/70 focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-accent/15";

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-fg">
          Name
          <input name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block text-sm font-medium text-fg">
          Email
          <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
        </label>
      </div>
      <label className="block text-sm font-medium text-fg">
        Message
        <textarea
          name="message"
          required
          rows={5}
          className={cn(field, "resize-y")}
          placeholder="Tell me about the role or project…"
        />
      </label>
      {/* honeypot */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-subtle" aria-live="polite">
          {status === "error" ? (
            <span className="text-[#ff8b96]">
              Couldn&rsquo;t send: {error}
              {fallbackEmail ? (
                <>
                  {" "}— please email{" "}
                  <a className="underline" href={`mailto:${fallbackEmail}`}>
                    {fallbackEmail}
                  </a>
                </>
              ) : null}
            </span>
          ) : (
            "Delivered straight to my inbox."
          )}
        </p>
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send message"}
          <Icon name="send" size={17} />
        </button>
      </div>
    </form>
  );
}
