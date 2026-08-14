## Why

The August template is now installed, but its visible content still describes "August", a fictional Lisbon-based product designer. The site is intended to be Giles Butler's personal portfolio for senior frontend / full-stack roles. Without content, the site advertises someone who doesn't exist.

## What Changes

- Replace all user-facing copy in `src/config/site.ts` and case-study / journal / page files with Giles Butler's portfolio.
- Replace the four demo case studies with four real ones: Mixo, CommBank, eGuarantee, LawPath. Replace the three demo journal posts with no posts (journal archived).
- Archive demo material: `src/content/journal/*`, `src/pages/playground.astro`, and the four demo work entries moved to `archived/` (kept on disk, not built, not in nav/footer).
- Update `siteConfig.navigation.links` to drop Playground and Journal; add Work and About.
- Update the "Clients" logo cloud to the agreed 11 wordmarks (Mixo, Mixvisor, Userfold, Room For Sound, Credabl, eGuarantee, CommBank, Emirates, Quiksilver, LawPath, Toyota).
- Update `siteConfig.testimonials.items` with the five provided quotes.
- Update `siteConfig.timeline.entries` with Giles's story (Fuzzy Logic Labs from 2016, LawPath 2015-2016, CommBank, VML contracting years where brand work happened).
- Update `siteConfig.contactForm` to use Netlify Forms with captcha + honeypot.
- Update `siteConfig.footer` to remove the "Download CV" link and the placeholder emails, and link to Giles's real LinkedIn.
- Update `netlify.toml` so the build + publish path is correct for giles.io.
- Update `astro.config.mjs` `site` URL to https://giles.io and tighten `allowedHosts` for Netlify preview.
- Add a `HEADSHOTS_TODO.md` listing all six people (Giles + 5 testimonial authors) for later photo replacement.
- Update `README.md` to reflect the new site.

## Capabilities

### New Capabilities
- `personal-portfolio-content`: The site presents Giles Butler's portfolio: hero, about, fuzzy-logic-labs experience, four case studies, five testimonials, eleven-logo client cloud, contact form, and proper SEO/footer/socials.
- `netlify-deploy-config`: The repository builds and deploys to Netlify (giles.io) with `netlify.toml` configured for static build + publish path.
- `netlify-contact-form`: The contact form on `/contact/` posts to Netlify Forms with a captcha challenge and a honeypot field.

### Modified Capabilities

## Impact

Affected files:
- `src/config/site.ts` (large rewrite of all visible copy and form config)
- `src/content/work/*` (replaced with four real case studies; demo entries archived)
- `src/content/journal/*` (archived; not built)
- `src/pages/playground.astro` (archived; not built)
- `src/components/Nav.astro` (link list changes)
- `src/components/Footer.astro` (already driven by siteConfig; check column links)
- `src/content.config.ts` (no schema change required, but journal collection becomes empty)
- `netlify.toml` (publish + headers)
- `astro.config.mjs` (site URL, allowedHosts for Netlify previews)
- `README.md` (project description)
- New: `HEADSHOTS_TODO.md`
- New: `archived/` directory for demo material
