import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contact, profile } from "@/lib/content";
import { publicFileExists } from "@/lib/server";
import { asset, cn } from "@/lib/utils";

import { ContactForm } from "./ContactForm";
import { CopyEmail } from "./CopyEmail";

export function Contact() {
  const cv = contact.showCv && publicFileExists(profile.cv) ? asset(profile.cv) : undefined;
  const form = contact.form?.enabled && contact.form.accessKey ? contact.form : undefined;

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad">
      <div className="container-page">
        <SectionHeader id="contact-title" index="06" label="Contact" title={contact.title} intro={contact.intro} />

        <div className={cn("grid gap-4 lg:gap-5", form && "lg:grid-cols-12")}>
          <Reveal className={cn("grid gap-4 lg:gap-5", form ? "lg:col-span-5" : "md:grid-cols-2")}>
            {contact.email ? (
              <div className="glass glass-hover p-6 sm:p-7">
                <p className="eyebrow">Email</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${contact.email}`}
                    className="min-w-0 break-all text-lg font-medium text-fg underline decoration-line-strong underline-offset-[6px] transition-colors hover:decoration-accent sm:text-xl"
                  >
                    {contact.email}
                  </a>
                  <CopyEmail email={contact.email} />
                </div>
              </div>
            ) : null}

            {profile.socials.length || cv ? (
              <div className="glass p-2">
                <ul>
                  {profile.socials.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-h-16 items-center gap-4 rounded-[0.875rem] px-4 transition-colors hover:bg-white/[0.04] sm:px-5"
                      >
                        <Icon name={s.icon} size={20} className="text-muted group-hover:text-fg" />
                        <span className="flex-1 text-fg">{s.label}</span>
                        <span className="sr-only">(opens in a new tab)</span>
                        <Icon
                          name="arrowUpRight"
                          size={18}
                          className="text-subtle transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                        />
                      </a>
                    </li>
                  ))}
                  {cv ? (
                    <li>
                      <a
                        href={cv}
                        download
                        className="group flex min-h-16 items-center gap-4 rounded-[0.875rem] px-4 transition-colors hover:bg-white/[0.04] sm:px-5"
                      >
                        <Icon name="download" size={20} className="text-muted group-hover:text-fg" />
                        <span className="flex-1 text-fg">Download CV</span>
                        <span className="font-mono text-xs text-subtle">PDF</span>
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null}
          </Reveal>

          {form ? (
            <Reveal delay={80} className="glass p-6 sm:p-8 lg:col-span-7">
              <p className="eyebrow mb-6">Send a message</p>
              <ContactForm
                provider={form.provider}
                accessKey={form.accessKey!}
                subject={form.subject}
                fallbackEmail={contact.email}
              />
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
