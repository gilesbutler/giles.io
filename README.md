# giles.io

Personal portfolio for **Giles Butler** - product minded creative engineer,
co-founder of Fuzzy Logic Labs, 15+ years turning complex problems into
interfaces people actually use.

Built with [Astro](https://astro.build) on the [August](https://august-theme.pages.dev)
template, deployed to [Netlify](https://www.netlify.com) at
[https://giles.io](https://giles.io).

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build to ./dist
```

## Where things live

| What | Where |
| --- | --- |
| Site identity, nav, hero, sections, footer, SEO, contact form | `src/config/site.ts` |
| Case studies | `src/content/work/*.md` |
| Theme tokens (colors, fonts, spacing) | `src/styles/global.css` |
| Public assets, headshots, case-study covers | `public/` |
| Archived demo material (not built) | `archived/` |
| OpenSpec changes | `openspec/changes/` |

## Contact form

The form on `/contact/` posts to **Netlify Forms** with Netlify's built-in
captcha and honeypot. No third-party scripts are loaded.

## Deploy

Netlify builds on push to the configured branch and publishes `dist/`. See
`netlify.toml` for the build command, Node version, and security headers.

## Follow-ups

See `HEADSHOTS_TODO.md` for the list of placeholder photos and case-study
covers to drop in later.
