## Context

The August template is installed and the build is green. All visible copy is currently placeholder. The site is being repositioned as Giles Butler's personal portfolio for senior frontend / full-stack roles, with strong emphasis on Vue/xState/product-minded creative engineering, 15+ years of experience, and a case-study portfolio anchored on Mixo, CommBank, eGuarantee, and LawPath.

## Goals / Non-Goals

**Goals:**

- Replace every user-facing string with copy that reflects Giles's positioning, experience, and projects.
- Make Mixo the headline product and CommBank the headline enterprise story.
- Provide a working Netlify Forms contact form with captcha and honeypot.
- Archive demo material so it can be restored later without losing source.
- Configure the repo for giles.io on Netlify.

**Non-Goals:**

- Custom visual design changes (we keep August's design language; only the data changes).
- Replacing Giles's headshot on the site if the LinkedIn CDN URL is unreachable (we fall back to initials).
- Adding new routes, components, or integrations beyond what is required to deliver the new copy + form config + Netlify wiring.
- Adding CI, previews, or any backend.

## Decisions

- **Single source of truth for copy: `src/config/site.ts`.** All names, headlines, links, navigation, testimonials, timeline entries, footer, and the contact form provider live in this file. No component edits unless strictly required.
- **Static content collections for case studies.** Four new `src/content/work/<slug>.md` files; each becomes a route at `/work/<slug>/`. No additional schema fields required.
- **Archive strategy.** Move demo content into `archived/`. Do not delete. The `content.config.ts` collections are left alone, but the journal collection becomes empty so the blog index page is removed from nav. The playground page is moved to `archived/` and not imported.
- **Nav.** Drop Playground and Journal from the nav and footer. Keep Home, About, Work, Contact. Footer columns updated to remove the CV link and the placeholder emails.
- **Logo cloud.** 11 monochrome wordmarks rendered as the `Clients.astro` marquee already supports. No new component required.
- **Testimonials.** Five items, paraphrased where necessary (Adam Arbolino's quote is paraphrased to reference Fuzzy Logic Labs / Mixo). Initial placeholders use initials in a circle; photos added later.
- **Netlify Forms wiring.** `ContactForm.astro` already supports `provider: "netlify"`. Switch the provider and add a honeypot `<input name="_gotcha">` (Netlify's standard pattern) and a captcha. Netlify provides a built-in reCAPTCHA challenge; we render a captcha marker field and rely on Netlify to render the challenge on submit. We do not embed Google reCAPTCHA explicitly to avoid third-party JS.
- **Deploy target.** `astro.config.mjs` `site: 'https://giles.io'`. `netlify.toml` already has the right build command and publish dir; we add a `NODE_VERSION = "22"` env entry (already present), tighten the headers, and ensure the contact form is detected by Netlify.
- **Headshots placeholder.** A new `HEADSHOTS_TODO.md` lists all six people (Giles + 5 testimonial authors) and explains how to drop in photos later.

## Risks / Trade-offs

- [Risk] LinkedIn CDN URL is often blocked by referer / IP. → Mitigation: fall back to initials-in-circle for Giles's avatar if the URL is unreachable; the site still renders correctly.
- [Risk] Netlify reCAPTCHA markup varies by site. → Mitigation: add a captcha div with `data-netlify-recaptcha="true"` on the submit button; Netlify auto-injects the captcha on render.
- [Risk] Live site goes through giles.io which we don't own. → Mitigation: configure only the build/host pieces in this repo; DNS and domain ownership happen in Netlify and the registrar, not here.
- [Risk] Archiving the journal collection while keeping the content collection defined produces an empty `/blog/` page. → Mitigation: also remove `/blog/` from nav and footer; do not generate a `blog` link anywhere user-visible.

## Migration Plan

1. Move demo material into `archived/`.
2. Add four new case-study markdown files.
3. Rewrite `siteConfig` for Giles.
4. Update `netlify.toml` headers and `astro.config.mjs` site URL + allowedHosts.
5. Wire Netlify Forms in `ContactForm.astro` (add honeypot + captcha div).
6. Add `HEADSHOTS_TODO.md`.
7. Update `README.md`.
8. Build, smoke-test (request `/`, `/about/`, `/work/`, `/work/mixo/`, `/work/commbank/`, `/work/eguarantee/`, `/work/lawpath/`, `/contact/`, confirm 404, confirm no `/blog/` or `/playground/`), and report.

## Open Questions

None. All open questions from the interview phase were resolved before this design was written.
