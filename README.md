# Portfolio — Flutter Developer & Mobile Application Engineer

A personal portfolio site built with **Next.js (static export), React, TypeScript, Tailwind CSS and Framer Motion**, hosted free on **GitHub Pages**.

All text, links, projects and skills live in plain JSON files in [`content/`](content/). You never need to touch the React code to update the site.

---

## Contents

1. [Quick start](#1-quick-start)
2. [Updating your content](#2-updating-your-content)
3. [Images, screenshots and your CV](#3-images-screenshots-and-your-cv)
4. [Contact form (optional)](#4-contact-form-optional)
5. [Deploying to GitHub Pages](#5-deploying-to-github-pages)
6. [Project structure](#6-project-structure)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Quick start

Requires **Node.js 20.9+** (22 or 24 recommended).

```bash
npm install        # once
npm run dev        # live-reloading dev server → http://localhost:3000
```

Other commands:

| Command | What it does |
| --- | --- |
| `npm run check:content` | Lists placeholders still to fill in and missing images |
| `npm run build` | Production build into `out/` (runs the content check first) |
| `npm run preview` | Serves `out/` exactly as GitHub Pages will → http://localhost:4173 |
| `npm run typecheck` | TypeScript check |

---

## 2. Updating your content

### How it works

- Every file in `content/` is **checked when the site builds**. If you make a typo or leave out a required field, the build stops with a message such as:
  ```
  Content error in content/experience.json:
    • content/experience.json → items → 1 → role: Invalid input: expected string, received undefined
  ```
  Nothing broken gets published.
- **Optional fields** can be deleted, or left as `""` or `[]`, and the site simply hides them.
- Add `"hidden": true` to any experience, project, skill category, education entry or nav item to keep it in the file without showing it. This is handy for drafts.
- Placeholders look like **`[[ ... ]]`**. `npm run check:content` lists every one that's left.

> **JSON tips:** strings use double quotes `"like this"`. Items in a list are separated by commas, with **no comma after the last item**. If the build says a file "is not valid JSON", look for a missing or extra comma.

### `content/profile.json` — name, headline, links

| Field | Notes |
| --- | --- |
| `name` | Your full name. Shown in the hero, nav, footer, page titles. |
| `shortName` | Initials for the round nav badge, e.g. `"AR"`. If blank, they're taken from `name`. |
| `role` | Use `\|` to split into parts: `"Flutter Developer \| Mobile Application Engineer"` |
| `headline` | The big hero sentence. The last two words get the blue gradient. |
| `intro` | One or two sentences under the headline. |
| `yearsOfExperience` | A number, e.g. `4`. |
| `location` | Optional. |
| `availability` | `{ "show": true, "label": "Open to new opportunities" }`. Set `show` to `false` to hide the badge. |
| `cv` | Path to your CV PDF, e.g. `"/documents/cv.pdf"` (see §3). |
| `socials` | List of `{ "label", "url", "icon" }`. Icons: `linkedin`, `github`, `mail`, `x`, `website`, `stackoverflow`, `medium`, `youtube`, `link`. Leave `url` empty to hide. |
| `highlights` | The four fact tiles in the About section: `{ "label", "value", "detail" }`. |

### `content/site.json` — SEO

| Field | Notes |
| --- | --- |
| `siteUrl` | Your live address, e.g. `https://yourname.github.io`. GitHub Actions sets this automatically when it deploys; this value is only a fallback for local builds. |
| `title` | Browser tab and search result title. |
| `description` | Search and social preview description (~150 characters). |
| `keywords` | List of search keywords. |

### `content/about.json`

`title`, `biography` (one string, or a list of paragraphs; the first paragraph is shown larger), `philosophy`, `experienceSummary`, `interests` (list), `objectives`.

### `content/experience.json` — adding a job

Copy an object inside `items` and edit it. **Items are shown in the order you write them**, so put the newest first.

```json
{
  "organization": "Company name",
  "role": "Senior Flutter Developer",
  "employmentType": "Full-time",
  "startDate": "2023-04",
  "endDate": null,
  "current": true,
  "location": "Dhaka, Bangladesh",
  "description": "One or two sentences about the role.",
  "responsibilities": ["…", "…"],
  "technologies": ["Flutter", "Dart", "WebRTC"],
  "achievements": ["…"]
}
```

- Dates: `"2023-04"` shows as **Apr 2023**, `"2023"` shows as **2023**. Any other text is shown as written.
- `current: true` shows **Present** and a green "Current" badge. Leave `endDate` as `null`.
- The first entry starts expanded. The others expand with **Show details**.
- To add a job, copy one of the existing entries and edit it.

> **Bangladesh Army entry:** keep descriptions general. Describe the kind of work (for example, cross-platform app development or API integration), never systems, units, operations or anything restricted.

### `content/projects.json` — adding a project

```json
{
  "slug": "my-app",
  "featured": true,
  "preview": "phones",
  "accent": "#1f8a7a",
  "name": "My App",
  "category": "Health · Education",
  "client": "UNICEF Bangladesh",
  "summary": "One sentence for the card.",
  "description": ["Paragraph one for the detail page.", "Paragraph two."],
  "highlights": ["Key feature", "Another one"],
  "role": "Lead App Developer",
  "year": "Jan 2025 — present",
  "stack": ["Flutter", "Dart", "Firebase"],
  "icon": "/images/projects/my-app/icon.webp",
  "cover": "/images/projects/my-app/cover.webp",
  "screenshots": ["/images/projects/my-app/screen-1.webp", "/images/projects/my-app/screen-2.webp"],
  "links": { "store": "https://play.google.com/store/apps/details?id=…", "demo": null, "github": null }
}
```

| Field | Notes |
| --- | --- |
| `slug` | Becomes the page address (`/projects/my-app/`). Lowercase letters, numbers and dashes, and unique. |
| `featured` | Featured projects come first. **The first project gets the large tile.** |
| `preview` | `"phones"` animates the screenshots inside phone frames on the card (cross-fading every ~3 seconds). `"cover"` (the default) shows the cover image. |
| `accent` | Brand colour used behind the animated phones, as a 6-digit hex value. |
| `client` | Shown as "For …" on the card and as "Client" on the detail page. |
| `year` | Free text, shown as "Period", e.g. `"2024"` or `"Nov 2024 — Jan 2025"`. |
| `icon` | Square app icon (about 192×192) shown next to the name. |
| `links` | `store` shows a **Get it on Google Play** button, `demo` a **Visit live app** button, `github` a **Source code** button. Use `null` or `""` to hide a button. |
| `confidential` | `true` adds a lock badge and a note that details aren't shared. |

Leave out any optional field you don't need and it's hidden.

### `content/skills.json` — adding skills

Each category:

```json
{ "name": "State Management", "icon": "layers", "description": "…", "skills": ["Provider", "Riverpod"] }
```

- Add or remove names in `skills` to change a category. Add or remove whole objects to change the categories.
- `icon` options: `mobile`, `realtime`, `server`, `layers`, `tools`, `code`, `cloud`, `shield`, `test`, `design`, `offline`, `team`.
- `featured: true` gives a category a wide, highlighted tile. Up to two work best.
- There are no percentage bars, on purpose.

### `content/education.json`

`degree`, `institution`, `location`, `startYear`, `graduationYear`, `grade` (`{ "label": "CGPA", "value": "3.50", "scale": "4.00" }`), `description`, `coursework` (list), `thesis`. Leave any optional one empty to hide it.

### `content/contact.json`

`title`, `intro`, `email`, `showCv`, and the optional `form` (see §4).

### `content/navigation.json`

The menu items. Each `id` must match a section: `home`, `about`, `experience`, `projects`, `skills`, `education`, `contact`. Change `label` to rename an item, or add `"hidden": true` to remove it from the menu.

---

## 3. Images, screenshots and your CV

Everything in `public/` is published as-is.

```
public/
  documents/cv.pdf                    ← your CV (the Download CV buttons appear once this file exists)
  images/projects/<slug>/cover.webp    ← project cover, 1600×1000 (16:10)
  images/projects/<slug>/screen-1.webp ← phone screenshots, portrait (e.g. 720×1500)
  images/projects/<slug>/icon.webp     ← app icon, square (e.g. 192×192)
```

- In JSON, refer to files **starting with `/`** and **without** `public`, e.g. `"/images/projects/my-app/cover.png"`. The site adds the GitHub Pages sub-path for you.
- If a file is missing, the site hides it (or shows a neat fallback) and `npm run check:content` warns you.
- Use **.webp** or well-compressed **.jpg/.png**, and keep each under ~300 KB. Images load lazily.
- **Your CV:** save it as `public/documents/cv.pdf`. To use a different name, update `cv` in `profile.json`.

---

## 4. Contact form (optional)

GitHub Pages can't send email on its own, so the form uses a free form service. **The form stays hidden until you add a key**, so visitors never see a form that doesn't work.

**Web3Forms (recommended, free):**

1. Go to <https://web3forms.com>, enter the email address that should receive messages, and copy the access key they send you.
2. In `content/contact.json`, set:
   ```json
   "form": { "enabled": true, "provider": "web3forms", "accessKey": "YOUR-KEY-HERE", "subject": "New message from your portfolio" }
   ```

**Formspree (alternative):** create a form at <https://formspree.io>, then set `"provider": "formspree"` and `"accessKey"` to the form ID (the part after `/f/`).

These keys are designed to be public; they can only send mail to *your* inbox. Messages show a real success or error state. If sending fails, visitors are offered your email address instead.

---

## 5. Deploying to GitHub Pages

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes the site **every time you push to `main`**. It detects your username, repo name and sub-path automatically, so nothing is hard-coded.

### First-time setup

1. **Create a GitHub repository.** Choose a name:
   - **`<your-username>.github.io`** gives the address `https://<your-username>.github.io/` (recommended)
   - **any other name**, e.g. `portfolio`, gives `https://<your-username>.github.io/portfolio/`
2. **Push this folder:**
   ```bash
   git add -A
   git commit -m "Initial portfolio"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo on GitHub, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Open the **Actions** tab. The "Deploy to GitHub Pages" run takes about 1–2 minutes, then shows your live URL. If the first run happened before step 3, click **Re-run all jobs**.
5. Update `siteUrl` in `content/site.json` to your live URL. The deploy sets it automatically, but local builds use this value.

### Every update after that

Edit the files in `content/` (or add images), then:

```bash
npm run check:content          # optional: see what's still a placeholder
git add -A && git commit -m "Update projects" && git push
```

The site updates automatically in 1–2 minutes. You can also edit a JSON file directly on github.com (pencil icon → commit), and it deploys the same way.

### Options

- **Different branch:** change `branches: [main]` in the workflow file.
- **Custom domain:** add it under **Settings → Pages → Custom domain** and the workflow switches the sub-path off automatically. Also update `siteUrl`.
- **Test a sub-path build locally:**
  ```bash
  NEXT_PUBLIC_BASE_PATH=/portfolio npm run build && NEXT_PUBLIC_BASE_PATH=/portfolio npm run preview
  ```

---

## 6. Project structure

```
content/                  ← EDIT THESE: all site content (JSON)
public/
  documents/              ← CV
  images/projects/        ← project covers and screenshots
scripts/
  check-content.mjs       ← placeholder / missing-file report (runs before every build)
  preview.mjs             ← local server that behaves like GitHub Pages
src/
  app/
    layout.tsx            ← page shell, fonts, SEO metadata
    page.tsx              ← home page: list of sections
    projects/[slug]/      ← one static page per project
    og.png/               ← social preview image, generated from profile.json
    sitemap.ts, robots.ts, icon.svg, not-found.tsx
    globals.css           ← design tokens, glass surfaces, aurora background, motion
  components/
    layout/               ← Navbar, Footer, Aurora background
    sections/             ← Hero, About, Experience, Projects, Skills, Education, Contact
    ui/                   ← Icon, SectionHeader, Chips, Reveal, ClientEffects
  lib/
    content.ts            ← loads and validates content/*.json (schemas live here)
    server.ts             ← build-time helpers (file checks, site URL)
    utils.ts              ← base-path helper, date formatting
.github/workflows/deploy.yml
```

**Design system** (in `src/app/globals.css`):

- **Colours:** deep navy/charcoal base `#05070d`, electric blue `#4d8dff`, cyan `#5fdcef`, violet ambient `#8b7cff`
- **Type:** Instrument Sans for text and headings, JetBrains Mono for labels and section indices
- **Surfaces:** `glass` (frosted panel with a specular rim) and `glass-hover` (pointer-following highlight)

On phones the backdrop blur is swapped for a denser fill, and the aurora stops moving, to keep scrolling smooth. With `prefers-reduced-motion`, all motion is turned off.

---

## 7. Troubleshooting

| Problem | Fix |
| --- | --- |
| Build fails with "Content error in content/…" | The message names the file, the entry and the field. Fix that value. |
| Build fails with "is not valid JSON" | Missing or extra comma, or a missing quote, in that file. |
| Site loads with no styling or images on GitHub | Make sure Pages **Source** is set to **GitHub Actions** (not "Deploy from a branch"). |
| Download CV button missing | `public/documents/cv.pdf` doesn't exist, or `cv` in `profile.json` points somewhere else. |
| Contact form missing | `form.enabled` is `false` or `form.accessKey` is empty (see §4). |
| A new project page shows 404 locally | Restart `npm run dev` after adding a project. |
