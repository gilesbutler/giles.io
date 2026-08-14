## 1. Archive demo material

- [ ] 1.1 Move `src/content/journal/*.md` into `archived/journal/`
- [ ] 1.2 Move `src/pages/playground.astro` into `archived/playground.astro`
- [ ] 1.3 Move the four demo work entries into `archived/work/`
- [ ] 1.4 Remove `/blog/` and `/playground/` from nav and footer

## 2. Case studies

- [ ] 2.1 Add `src/content/work/mixo.md`
- [ ] 2.2 Add `src/content/work/commbank.md`
- [ ] 2.3 Add `src/content/work/eguarantee.md`
- [ ] 2.4 Add `src/content/work/lawpath.md`
- [ ] 2.5 Confirm the case-study index lists all four in the right order

## 3. Site config rewrite

- [ ] 3.1 Rewrite `siteConfig.hero` for Giles Butler
- [ ] 3.2 Rewrite `siteConfig.about` with Giles's bio and skills
- [ ] 3.3 Rewrite `siteConfig.timeline.entries` with Giles's story
- [ ] 3.4 Rewrite `siteConfig.testimonials.items` with the five quotes
- [ ] 3.5 Rewrite `siteConfig.clients.items` to the 11 wordmarks
- [ ] 3.6 Rewrite `siteConfig.footer` (drop CV, link real LinkedIn)
- [ ] 3.7 Update `siteConfig.navigation.links` (drop Playground/Journal, keep Home/About/Work/Contact)
- [ ] 3.8 Update `siteConfig.seo` for the new title/description/og
- [ ] 3.9 Update `siteConfig.contactForm` to use Netlify

## 4. Netlify wiring

- [ ] 4.1 Add honeypot input + captcha div in `ContactForm.astro`
- [ ] 4.2 Update `netlify.toml` (publish, headers, NODE_VERSION)
- [ ] 4.3 Update `astro.config.mjs` (site URL, allowedHosts)

## 5. Headshot reminder

- [ ] 5.1 Add `HEADSHOTS_TODO.md` with the six names and how to drop in photos

## 6. Verify

- [ ] 6.1 Build the site and confirm the case studies + home + about + contact render
- [ ] 6.2 Confirm no `/blog/` or `/playground/` route is built
- [ ] 6.3 Update `README.md` to reflect the new site
