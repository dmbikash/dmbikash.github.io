/**
 * Content loader.
 *
 * Every JSON file in /content is validated here at build time. If a file has a
 * typo or a missing required field, `npm run build` stops with a readable
 * message that names the file and the field — nothing broken gets deployed.
 *
 * Optional fields can be left out (or set to "" / []) and the UI hides them.
 */
import { z } from "zod";

import siteJson from "@content/site.json";
import profileJson from "@content/profile.json";
import aboutJson from "@content/about.json";
import experienceJson from "@content/experience.json";
import projectsJson from "@content/projects.json";
import skillsJson from "@content/skills.json";
import educationJson from "@content/education.json";
import contactJson from "@content/contact.json";
import navigationJson from "@content/navigation.json";

/* ---------- helpers ---------- */

const text = z.string().trim();
/** Optional string: missing, null or "" all mean "not set". */
const optText = z
  .string()
  .trim()
  .nullish()
  .transform((v) => (v ? v : undefined));
const list = <T extends z.ZodTypeAny>(item: T) =>
  z
    .array(item)
    .nullish()
    .transform((v) => v ?? []);
const optUrl = optText.refine(
  (v) => v === undefined || /^(https?:\/\/|mailto:|\/)/.test(v),
  "must start with https://, http://, mailto: or /",
);
/** Removes entries marked `"hidden": true` — handy for drafts. */
const visible = <T extends { hidden?: boolean }>(items: T[]) => items.filter((i) => !i.hidden);

/* ---------- schemas ---------- */

export const siteSchema = z.object({
  siteUrl: text,
  title: text,
  description: text,
  keywords: list(text),
  locale: optText,
});

const iconName = z.enum([
  "linkedin",
  "github",
  "mail",
  "x",
  "website",
  "stackoverflow",
  "medium",
  "youtube",
  "link",
]);

export const profileSchema = z.object({
  name: text,
  shortName: optText,
  role: text,
  headline: text,
  intro: text,
  yearsOfExperience: z.number().int().nonnegative().optional(),
  location: optText,
  availability: z
    .object({ show: z.boolean().default(true), label: text })
    .optional(),
  cv: optText,
  socials: list(
    z.object({ label: text, url: optUrl, icon: iconName.default("link") }),
  ).transform((s) => s.filter((x) => x.url)),
  highlights: list(z.object({ label: text, value: text, detail: optText })),
});

export const aboutSchema = z.object({
  title: text,
  biography: z.union([text, z.array(text)]).transform((v) => (Array.isArray(v) ? v : [v])),
  philosophy: optText,
  experienceSummary: optText,
  interests: list(text),
  objectives: optText,
});

const yearMonth = optText; // "2022-03", "2022", "[[YYYY-MM]]" or any free text

export const experienceItemSchema = z.object({
  hidden: z.boolean().optional(),
  organization: text,
  role: text,
  employmentType: optText,
  startDate: yearMonth,
  endDate: yearMonth,
  current: z.boolean().default(false),
  location: optText,
  logo: optText,
  description: optText,
  responsibilities: list(text),
  technologies: list(text),
  achievements: list(text),
});

export const experienceSchema = z.object({
  title: text,
  intro: optText,
  items: z.array(experienceItemSchema).transform(visible),
});

export const projectSchema = z.object({
  hidden: z.boolean().optional(),
  slug: text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "use lowercase letters, numbers and dashes only, e.g. my-app"),
  sample: z.boolean().default(false),
  featured: z.boolean().default(false),
  confidential: z.boolean().default(false),
  name: text,
  category: optText,
  /** Who the work was for, e.g. "UNDP Bangladesh". */
  client: optText,
  summary: text,
  description: z
    .union([text, z.array(text)])
    .nullish()
    .transform((v) => (v ? (Array.isArray(v) ? v : [v]) : [])),
  highlights: list(text),
  role: optText,
  year: optText,
  stack: list(text),
  /** Small square app icon shown on the card. */
  icon: optText,
  cover: optText,
  screenshots: list(text),
  /** "cover" shows the cover image on the card; "phones" shows the screenshots in animated phone frames. */
  preview: z.enum(["cover", "phones"]).default("cover"),
  /** Brand colour used to tint the card, e.g. "#1f8a7a". */
  accent: optText.refine((v) => v === undefined || /^#[0-9a-f]{6}$/i.test(v), "use a 6-digit hex colour like #1f8a7a"),
  links: z
    .object({ github: optUrl, demo: optUrl, store: optUrl })
    .partial()
    .nullish()
    .transform((v) => v ?? {}),
});

export const projectsSchema = z.object({
  title: text,
  intro: optText,
  items: z
    .array(projectSchema)
    .transform(visible)
    .superRefine((items, ctx) => {
      const seen = new Set<string>();
      items.forEach((p, i) => {
        if (seen.has(p.slug))
          ctx.addIssue({ code: "custom", path: [i, "slug"], message: `duplicate slug "${p.slug}"` });
        seen.add(p.slug);
      });
    }),
});

const skillIcon = z.enum(["mobile", "realtime", "server", "layers", "tools", "code", "cloud", "shield", "test", "design", "offline", "team"]);

export const skillsSchema = z.object({
  title: text,
  intro: optText,
  categories: z
    .array(
      z.object({
        hidden: z.boolean().optional(),
        name: text,
        icon: skillIcon.default("code"),
        featured: z.boolean().default(false),
        description: optText,
        skills: z.array(text).min(1, "add at least one skill or hide the category"),
      }),
    )
    .transform(visible),
});

export const educationSchema = z.object({
  title: text,
  items: z
    .array(
      z.object({
        hidden: z.boolean().optional(),
        degree: text,
        institution: text,
        location: optText,
        startYear: optText,
        graduationYear: optText,
        grade: z
          .object({ label: text.default("CGPA"), value: text, scale: optText })
          .nullish(),
        description: optText,
        coursework: list(text),
        thesis: optText,
      }),
    )
    .transform(visible),
});

export const contactSchema = z.object({
  title: text,
  intro: optText,
  email: optText,
  showCv: z.boolean().default(true),
  form: z
    .object({
      enabled: z.boolean().default(false),
      provider: z.enum(["web3forms", "formspree"]).default("web3forms"),
      accessKey: optText,
      subject: optText,
    })
    .nullish(),
});

export const navigationSchema = z.object({
  items: z.array(z.object({ id: text, label: text, hidden: z.boolean().optional() })).transform(visible),
});

/* ---------- parse ---------- */

function load<S extends z.ZodTypeAny>(file: string, schema: S, data: unknown): z.output<S> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const lines = result.error.issues.map(
      (i) => `  • content/${file} → ${i.path.length ? i.path.join(" → ") : "(root)"}: ${i.message}`,
    );
    throw new Error(`\n\nContent error in content/${file}:\n${lines.join("\n")}\n`);
  }
  return result.data;
}

export const site = load("site.json", siteSchema, siteJson);
export const profile = load("profile.json", profileSchema, profileJson);
export const about = load("about.json", aboutSchema, aboutJson);
export const experience = load("experience.json", experienceSchema, experienceJson);
export const projects = load("projects.json", projectsSchema, projectsJson);
export const skills = load("skills.json", skillsSchema, skillsJson);
export const education = load("education.json", educationSchema, educationJson);
export const contact = load("contact.json", contactSchema, contactJson);
export const navigation = load("navigation.json", navigationSchema, navigationJson);

export type Profile = typeof profile;
export type ExperienceItem = (typeof experience.items)[number];
export type Project = (typeof projects.items)[number];
export type SkillCategory = (typeof skills.categories)[number];
export type SocialIcon = z.infer<typeof iconName>;
export type SkillIcon = z.infer<typeof skillIcon>;

export function getProject(slug: string) {
  return projects.items.find((p) => p.slug === slug);
}
