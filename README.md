# IHD Philippines — ihd-mnl.com

Marketing site for IHD Philippines Ltd. Inc. Built with React, Vite and Tailwind, prerendered to static HTML, and deployed to GitHub Pages on every push to `main`.

## Commands

| Command          | What it does                                                                       |
| ---------------- | ---------------------------------------------------------------------------------- |
| `npm run dev`    | Local dev server at http://localhost:5173                                          |
| `npm run build`  | Type-check, build, prerender every page to `dist/`, then run the site check        |
| `npm run images` | Regenerate optimised images from `assets-src/` (run after adding or changing one)  |
| `npm run check`  | Re-run the site check against an existing `dist/`                                  |

## How the site is put together

- **Content lives in `src/data/`** — pages are generated from these files, so most edits never touch page code.
  - `projects.ts` — the portfolio (one entry per project)
  - `disciplines.ts` — the six engineering disciplines; `faqs.ts` — their FAQs
  - `sectorPages.ts` — the four sector landing pages
  - `team.ts` — leadership, team and developer logos
  - `practice.ts` — delivery lifecycle and principles
  - `../lib/site.ts` — company facts (email, phone, hours, domain)
- **Prerendering** (`scripts/prerender.mjs`) renders every route to its own HTML file with its title, description, canonical URL, Open Graph tags and schema.org data, so search engines and link previews see full pages without running JavaScript. It also writes `sitemap.xml`, `404.html` and redirect pages for the old site's URLs.
- **Site check** (`scripts/check-site.mjs`) fails the build if a page is missing its H1, title, description or canonical, has an image without alt text, duplicates another page's title, or links to a page that doesn't exist.

## Adding a project

1. Put the original photo in `assets-src/projects/`, e.g. `newhotel.jpg`.
2. Run `npm run images`. This creates the web versions and records the image as `projects/newhotel`.
3. Add an entry to `src/data/projects.ts`:
   - `slug` becomes the URL (`/projects/<slug>`); use lowercase words joined by hyphens.
   - `image: 'projects/newhotel'` and an `imageAlt` that describes what the photo actually shows.
   - `disciplines` uses the discipline slugs (`acoustics`, `audiovisual`, `security`, `information-technology`, `iot-smart-buildings`, `guest-room-management`).
   - `sector` is one of `hospitality`, `worship`, `culture-education`, `commercial-residential`.
4. Run `npm run build`. The project page, portfolio, sector page, discipline pages and sitemap all update automatically.

## Content rules

- Only publish facts IHD can stand behind — no invented clients, certifications, statistics or project outcomes.
- Every meaningful image needs alt text describing what is in the photo.
- Keep page titles under ~65 characters and meta descriptions under ~160.

## Contact form

The form sends through EmailJS (`src/components/InquiryForm.tsx`) with reCAPTCHA, which only loads once a visitor starts filling in the form. Discipline focus, phone number and the page the enquiry came from are added to the top of the message body, so the existing EmailJS template needs no changes. A hidden honeypot field silently drops most bot submissions.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages under the custom domain in `public/CNAME`.
