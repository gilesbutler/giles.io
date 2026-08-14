#!/usr/bin/env bash
set -euo pipefail
cd /home/exedev/giles.io

# 1. Archive demo material
mkdir -p archived/journal archived/work
mv src/content/journal/*.md archived/journal/ 2>/dev/null || true
mv src/pages/playground.astro archived/playground.astro 2>/dev/null || true
mv src/content/work/*.md archived/work/ 2>/dev/null || true

# 2. New case studies
cat > src/content/work/mixo.md <<'MIXO'
---
title: "Mixo"
date: 2022-01-15
excerpt: "Co-founder. From 500 to 500,000 users from launch, in 4 months. Now a multi-million-website product mentioned alongside the major AI site builders."
tags:
  - Founder
  - Growth
  - Product
image: /work/mixo.svg
imageLabel: mixo.svg
imageAlt: "Mixo product cover"
cardColor: "#e01e5a"
cardText: light
order: 1
---

Mixo is the headline product of Fuzzy Logic Labs. I co-founded the company and have been involved in all aspects of the business - building products front and backend, growth, UI/UX, and managing the company.

We built Mixo to make getting a real business online take seconds, not weeks. The product is regularly mentioned alongside the major AI site builders - and that is the company I am most proud of.

## How it scaled

We went from 500 to 500,000 users from launch, in 4 months. In the first year, as a small team, we created millions of websites for real businesses around the world.

The playbook was not secret: ship the smallest thing that is actually useful, then keep shipping. Every release was a real bet on what the next bottleneck for a small business owner was. The product kept getting simpler, and the audience kept getting larger.
MIXO

cat > src/content/work/commbank.md <<'CBA'
---
title: "CommBank website rebuild"
date: 2020-06-01
excerpt: "Lead frontend developer for CommBank's website rebuild. 20,000-page migration. Six months, four frontend developers, hundreds of thousands of dollars saved."
tags:
  - Lead Frontend
  - Enterprise
  - Refactor
image: /work/commbank.svg
imageLabel: commbank.svg
imageAlt: "CommBank website cover"
cardColor: "#36c5f0"
cardText: dark
order: 2
---

I was the lead frontend developer for the rebuild of CommBank's website. I managed a team of four frontend developers over a six-month engagement, taking the site from wireframes through to production.

## What I owned

- A 20,000-page migration off the legacy CMS.
- A highly technical refactor of the rendering layer and the legacy system support around it - the kind of work that is invisible to the reader but saves the bank hundreds of thousands of dollars.
- Frontend direction across the team, including the architecture decisions, code review, and the integration with backend services and the design system.

The hardest part wasn't any one page - it was keeping the site stable while a 20,000-page migration ran in parallel with the rebuild.
CBA

cat > src/content/work/eguarantee.md <<'EG'
---
title: "eGuarantee MVP"
date: 2023-04-01
excerpt: "MVP build for eGuarantee. Astro landing pages. Vue.js application with xState for state management. Hosted on AWS. Now a leading Australian commercial lease bond provider."
tags:
  - Vue
  - xState
  - MVP
image: /work/eguarantee.svg
imageLabel: eguarantee.svg
imageAlt: "eGuarantee MVP cover"
cardColor: "#ecb22e"
cardText: dark
order: 3
---

eGuarantee came to Fuzzy Logic Labs as a client engagement. We built their MVP, the Astro landing pages, and the Vue.js application that runs the underwriting flow.

## What I built

- The MVP that went live - now a leading Australian commercial lease bond provider, backed by a major global insurer.
- The Vue.js application with xState as the state machine layer, modelling the underwriting flow so the form is explicit, testable, and easy to extend.
- The Astro landing pages, deployed on AWS, that turn a complex commercial-lease product into something a tenant can actually evaluate.

The interesting choice was xState. For a flow with this many branches, hand-rolled state is where the bugs live. Modelling it as a state machine paid off the first time a regulator changed the rules.
EG

cat > src/content/work/lawpath.md <<'LP'
---
title: "LawPath company registration tool"
date: 2015-06-01
excerpt: "Senior frontend engineer and product manager. Lead developer on the company registration tool, integrating with ASIC. Team of 10. Presented to C-level executives."
tags:
  - React
  - Product
  - Legal Tech
image: /work/lawpath.svg
imageLabel: lawpath.svg
imageAlt: "LawPath cover"
cardColor: "#111212"
cardText: light
order: 4
---

I was the senior frontend engineer and product manager at LawPath, working across the company registration tool and the wider product.

## What I owned

- Lead developer for the company registration tool, built in React and wired into a stack of third-party APIs and the Australian Securities and Investments Commission (ASIC).
- Design and wireframing for the tool and the surrounding flows.
- Product management for the registration product line, including presenting to C-level executives on strategy, progress, and the roadmap.
- I led a team of 10 and was the team lead responsible for product strategy across the surface.

This is the role where I learned to talk to a board and ship at the same time - and that both of those things take the same care.
LP

mkdir -p public/work
# 3. Placeholder SVG images for case studies
cat > public/work/mixo.svg <<'IMG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e01e5a"/>
      <stop offset="1" stop-color="#7a0c33"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <text x="60" y="120" font-family="system-ui, sans-serif" font-size="36" fill="#fff" opacity="0.7">Mixo</text>
  <text x="60" y="200" font-family="system-ui, sans-serif" font-size="84" font-weight="700" fill="#fff">Founder story + growth</text>
  <text x="60" y="740" font-family="ui-monospace, monospace" font-size="18" fill="#fff" opacity="0.6">Placeholder image - replace with real cover.</text>
</svg>
IMG

cat > public/work/commbank.svg <<'IMG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#36c5f0"/>
      <stop offset="1" stop-color="#0e6a87"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <text x="60" y="120" font-family="system-ui, sans-serif" font-size="36" fill="#06212b" opacity="0.7">CommBank</text>
  <text x="60" y="200" font-family="system-ui, sans-serif" font-size="84" font-weight="700" fill="#06212b">20,000-page migration</text>
  <text x="60" y="740" font-family="ui-monospace, monospace" font-size="18" fill="#06212b" opacity="0.6">Placeholder image - replace with real cover.</text>
</svg>
IMG

cat > public/work/eguarantee.svg <<'IMG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ecb22e"/>
      <stop offset="1" stop-color="#a07414"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <text x="60" y="120" font-family="system-ui, sans-serif" font-size="36" fill="#241a04" opacity="0.7">eGuarantee</text>
  <text x="60" y="200" font-family="system-ui, sans-serif" font-size="84" font-weight="700" fill="#241a04">Vue + xState MVP</text>
  <text x="60" y="740" font-family="ui-monospace, monospace" font-size="18" fill="#241a04" opacity="0.6">Placeholder image - replace with real cover.</text>
</svg>
IMG

cat > public/work/lawpath.svg <<'IMG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1a1a1a"/>
      <stop offset="1" stop-color="#3a3a3a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <text x="60" y="120" font-family="system-ui, sans-serif" font-size="36" fill="#fff" opacity="0.7">LawPath</text>
  <text x="60" y="200" font-family="system-ui, sans-serif" font-size="84" font-weight="700" fill="#fff">Company registration</text>
  <text x="60" y="740" font-family="ui-monospace, monospace" font-size="18" fill="#fff" opacity="0.6">Placeholder image - replace with real cover.</text>
</svg>
IMG

# 4. Placeholder Giles avatar
printf 'Placeholder avatar. Replace public/avatar.jpg with a real headshot.\n' > public/avatar.jpg

# 5. Headshot reminder
cat > HEADSHOTS_TODO.md <<'TXT'
# Headshots to drop in

The site currently uses initials-in-a-circle placeholders. Drop real photos in
at the paths below and update the corresponding `avatar` / `image` reference
in `src/config/site.ts`.

- Giles Butler - `public/avatar.jpg` (referenced in `siteConfig.hero.avatars[0]`).
- Adam Arbolino - `public/people/adam.jpg` (testimonials index 0).
- Brad Phillips - `public/people/brad.jpg` (testimonials index 1).
- Remon Saddik - `public/people/remon.jpg` (testimonials index 2).
- Dale Hurley - `public/people/dale.jpg` (testimonials index 3).
- Daniel Serrano - `public/people/daniel.jpg` (testimonials index 4).

For each, update the matching `avatar` field in `siteConfig.testimonials.items`
to the new path, e.g. `avatar: "/people/adam.jpg"`.

# Case-study images to drop in

- `public/work/mixo.svg` - real cover for Mixo.
- `public/work/commbank.svg` - real cover for CommBank.
- `public/work/eguarantee.svg` - real cover for eGuarantee.
- `public/work/lawpath.svg` - real cover for LawPath.

# Other follow-ups

- Add a real email address anywhere you want it on the site.
- Replace the four case-study placeholder images with real screenshots.
- Add more entries to `siteConfig.timeline.entries` for any role I don't have dates for (e.g. VML contracting years for Emirates / Quiksilver / Toyota).
TXT

# 6. Rewrite src/config/site.ts
cat > src/config/site.ts <<'CFG'
/**
 * Giles Butler - personal portfolio site config
 * Edit this file to update names, headlines, links, sections, footer, and the
 * contact form provider.
 */

export const siteConfig = {
  name: "Giles Butler",
  tagline: "Product minded creative engineer. 15+ years turning complex problems into interfaces people actually use.",
  url: "https://giles.io",
  favicon: "/favicon.svg",

  theme: {
    toggle: true,
    default: "light" as "light" | "dark",
  },

  navigation: {
    links: [
      { label: "Home", url: "/" },
      { label: "About", url: "/about/" },
      { label: "Case Study", url: "/work/" },
    ],
    cta: { label: "Contact", url: "/contact/" },
  },

  hero: {
    nameLabel: "my name is",
    name: "Giles Butler",
    availability: "Open to senior frontend and full-stack roles",
    ctaLabel: "Get in touch",
    ctaUrl: "/contact/",
    stickers: {
      notes: [
        { lead: "Currently at", strong: "Fuzzy Logic Labs" },
        { lead: "Previously at", strong: "CommBank" },
      ],
      role: "Co-Founder & Frontend Lead",
      location: "Cotswolds, UK - remote",
    },
    avatars: ["/avatar.jpg", "/avatar.jpg"],
  },

  statement: {
    partA: "I build",
    partB: "products people actually use",
    ctaLabel: "Get in touch",
    ctaUrl: "/contact/",
  },

  about: {
    kicker: "about me!",
    heading: "what's up",
    lead: {
      partA: "I'm Giles, a product minded creative engineer in the Cotswolds, UK",
      photo: "/avatar.jpg",
      partB: "I get",
      emphasis: "excited",
      partC: "about turning complex problems into interfaces people actually use.",
    },
    workspace: [
      { image: "/avatar.jpg", caption: "remote" },
      { image: "/avatar.jpg", caption: "the desk" },
    ],
    skills: [
      { label: "Vue.js", color: "cyan", icon: "star" },
      { label: "xState / state machines", color: "amber", icon: "grid" },
      { label: "Astro", color: "magenta", icon: "motion" },
      { label: "Design engineering", color: "green", icon: "search" },
    ],
  },

  works: {
    kicker: "selected work",
    titleTop: "CASE",
    titleBottom: "STUDIES",
    note: "Four projects that span a founder story, an enterprise rebuild, a recent fintech, and a legal tech product.",
    viewLabel: "View case study",
    projectPrefix: "Case",
  },

  contact: {
    lets: "let's talk",
    text: "I'm most energized by senior frontend and full-stack roles where I can own a product surface, ship things that improve someone's day, and work with people who care about the details.",
    stickerLabel: "Contact",
    comment: {
      header: "Currently",
      name: "Giles",
      avatar: "/avatar.jpg",
      body: "Open to senior frontend and full-stack roles. Remote-friendly, US East Coast hours, available from the Cotswolds, UK.",
      reactions: 1,
    },
  },

  footer: {
    bio: "Product minded creative engineer. Co-founder of Fuzzy Logic Labs. Building at the intersection of music, technology and design.",
    availability: "Open to senior frontend and full-stack roles",
    columns: [
      {
        heading: "Explore",
        links: [
          { label: "Work", url: "/work/" },
          { label: "About", url: "/about/" },
        ],
      },
      {
        heading: "Get in touch",
        links: [
          { label: "Contact form", url: "/contact/" },
          { label: "LinkedIn", url: "https://www.linkedin.com/in/gilesbutler/" },
        ],
      },
    ],
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/gilesbutler/", icon: "linkedin" },
    ],
    copyright: "\u00a9 2026 Giles Butler.",
    backlink: { prefix: "Built with", label: "Astro", url: "https://astro.build" },
  },

  pages: {
    about: {
      kicker: "about me",
      title: "Founder, father, entrepreneur",
      subtitle: "15+ years turning complex problems into interfaces people actually use.",
    },
    work: {
      kicker: "selected work",
      title: "Case studies",
      subtitle: "Four projects that span a founder story, an enterprise rebuild, a recent fintech, and a legal tech product.",
    },
    contact: {
      kicker: "get in touch",
      title: "Let's talk",
      subtitle: "Senior frontend and full-stack roles. Remote-friendly, US East Coast hours, available from the Cotswolds, UK.",
    },
  },

  timeline: {
    kicker: "the story so far",
    heading: "How I got here",
    entries: [
      {
        year: "2016 - now",
        title: "Co-Founder, Fuzzy Logic Labs",
        body: "Co-founded Fuzzy Logic Labs. Fuzzy Logic is a digital agency and startup studio. Inside Fuzzy Logic we built Mixo (mixo.io), Mixvisor (mixvisor.com), Userfold (userfold.com) and Room For Sound (roomforsound.com). I am involved in all aspects of the business - building products front and backend, growth, UI/UX, and managing the company.",
        color: "cyan",
      },
      {
        year: "Client engagement",
        title: "Fuzzy Logic Labs x eGuarantee",
        body: "Client engagement through Fuzzy Logic Labs. Built the eGuarantee MVP, the Astro landing pages, and the Vue.js underwriting application using xState for state management. Hosted on AWS. The MVP went live and eGuarantee is now a leading Australian commercial lease bond provider.",
        color: "amber",
      },
      {
        year: "Client engagement",
        title: "Fuzzy Logic Labs x Credabl",
        body: "Client engagement through Fuzzy Logic Labs. Design, wireframing, and development of Credabl's WordPress site, then a full rebuild a few years later on a headless CMS (Dato) and React (Gridsome).",
        color: "green",
      },
      {
        year: "VML contracting",
        title: "VML (Emirates, Quiksilver, Toyota)",
        body: "Contracted through VML. Built sites and apps for Emirates, Quiksilver and Toyota. (Dates not pinned down yet - update the timeline once you have them.)",
        color: "magenta",
      },
      {
        year: "2020",
        title: "Lead Frontend Developer, CommBank website rebuild",
        body: "Lead frontend developer for the rebuild of CommBank's website. Managed a team of four frontend developers over a six-month engagement. Took the site from wireframes through to production. A 20,000-page migration. A highly technical refactor and complex legacy system support which saved the bank hundreds of thousands of dollars.",
        color: "amber",
      },
      {
        year: "2015 - 2016",
        title: "Senior Frontend Engineer & Product Manager, LawPath",
        body: "Senior frontend engineer and product manager at LawPath. Lead developer for the company registration tool, working with React and various APIs and integrating with ASIC (Australian Securities and Investments Commission). Designed and developed wireframes. Led product management and development. Presented to C-level executives. Led a team of 10 and was the team lead responsible for product strategy.",
        color: "green",
      },
      {
        year: "2009 - now",
        title: "Building",
        body: "Started building for the web in earnest around 2009. Fifteen-plus years of product, frontend, design, and full-stack work later, still most at home in the gap between design and engineering.",
        color: "cyan",
      },
    ],
  },

  faq: {
    kicker: "good to know",
    heading: "Quick answers",
    items: [
      { q: "What kind of role are you looking for?", a: "Senior frontend or full-stack roles, ideally with a product surface to own. I am most useful where design and engineering overlap." },
      { q: "Where are you based?", a: "Cotswolds, UK. Happy to work remote and comfortable with US East Coast hours. Open to occasional travel for the right team." },
      { q: "Are you open to contract work?", a: "Yes, for the right project. I am also open to full-time roles." },
      { q: "What is your stack?", a: "Vue.js is my primary frontend. I have shipped Astro landing pages, React (including Gridsome) and headless CMS rebuilds, and I have used xState for any non-trivial state flow. Node.js on the backend." },
      { q: "What is Fuzzy Logic Labs?", a: "A digital agency and startup studio I co-founded with Adam Arbolino in 2016. Inside Fuzzy Logic we built Mixo, Mixvisor, Userfold and Room For Sound, and we ship client work for companies like eGuarantee and Credabl." },
    ],
  },

  contactForm: {
    provider: "netlify" as "formspree" | "formsubmit" | "netlify",
    formspreeId: "",
    formsubmitEmail: "",
    submitLabel: "Send it",
    successMessage: "Thanks - I'll get back to you within a day or two.",
    fields: {
      name: "Your name",
      email: "Email",
      message: "What's on your mind?",
    },
    channels: [
      { label: "Based in", value: "Cotswolds, UK", url: "" },
      { label: "Open to", value: "Remote, US East Coast hours", url: "" },
      { label: "Response", value: "Within ~48h", url: "" },
    ],
  },

  clients: {
    kicker: "worked with",
    items: [
      "Mixo",
      "Mixvisor",
      "Userfold",
      "Room For Sound",
      "Credabl",
      "eGuarantee",
      "CommBank",
      "Emirates",
      "Quiksilver",
      "LawPath",
      "Toyota",
    ],
  },

  stats: {
    kicker: "by the numbers",
    heading: "Where I am in one screen",
    items: [
      { value: "15+", label: "Years building", color: "cyan" },
      { value: "Vue / xState / Astro", label: "Primary stack", color: "magenta" },
      { value: "Fuzzy Logic Labs", label: "Co-founder, since 2016", color: "amber" },
      { value: "4", label: "Products in market", color: "green" },
    ],
  },

  testimonials: {
    kicker: "kind words",
    heading: "What people say",
    items: [
      {
        quote: "Giles is one of the best front-end engineers I had the pleasure to work with at Fuzzy Logic Labs and Mixo. His in-depth knowledge of front-end development - in particular CSS and JS frameworks - made him an absolute asset to the team. Giles is the type of person I could always count on and delivers his work with the highest quality. He has made great contributions to the company with valuable insights in both technology and business decisions.",
        name: "Adam Arbolino",
        role: "Co-founder, Fuzzy Logic Labs / Mixo",
        avatar: "",
        color: "cyan",
      },
      {
        quote: "Giles's work on the CommBank website redesign was first class. He has the uncommon ability to combine tremendous technical acumen, creative thinking and strong communication to deliver great results. As part of a large project team Giles played a key front end development role, working closely with designers, developers and business stakeholders to manage fluid requirements and cope with the intensity and long hours of a large project implementation. I'd recommend Giles without hesitation.",
        name: "Brad Phillips",
        role: "Head of Digital & Data, CommBank",
        avatar: "",
        color: "magenta",
      },
      {
        quote: "Giles was the technical front-end leader when I first joined the CBA project. He naturally serves as an inspiring mentor for the whole team. We had a lot to catch up with but he made it possible. Giles is an out-of-the-box thinker as well as a results-oriented problem solver. He is technically savvy and likes to keep on top of the latest trends and technologies in the field. He is a true asset to any organisation.",
        name: "Remon Saddik",
        role: "CBA project",
        avatar: "",
        color: "amber",
      },
      {
        quote: "Giles is an excellent designer with a great eye for detail. He works very efficiently with a passion for the web. Giles helped transform the design of CreditorWatch into a modern and professional layout, significantly increasing sales.",
        name: "Dale Hurley",
        role: "CreditorWatch",
        avatar: "",
        color: "green",
      },
      {
        quote: "Giles is an extremely talented developer who stays up to date with the bleeding edge of the industry and stands out due to his focus and discipline. He is very knowledgeable and a natural innovator that will find the most optimal way to tackle a problem with his constantly evolving toolkit. Not afraid of large-scale projects, his personality and natural leadership qualities will certainly make him a driving force in any team he joins.",
        name: "Daniel Serrano",
        role: "Hothouse",
        avatar: "",
        color: "cyan",
      },
    ],
  },

  notFound: {
    kicker: "well, this is awkward",
    title: "404",
    note: "That page wandered off the canvas",
    ctaLabel: "Back home",
  },

  ui: {
    workBackShort: "All work",
    workBackLong: "Back to all work",
    journalBackShort: "The journal",
    journalBackLong: "Back to the journal",
  },

  seo: {
    title: "Giles Butler - Frontend & full-stack portfolio",
    description: "Giles Butler is a product minded creative engineer. Co-founder of Fuzzy Logic Labs. 15+ years turning complex problems into interfaces people actually use.",
    ogImage: "/avatar.jpg",
    twitterHandle: "",
  },

  analytics: {
    provider: null as null | "google" | "plausible" | "umami",
    googleId: "",
    plausibleDomain: "giles.io",
    umamiWebsiteId: "",
    umamiScriptUrl: "",
  },

  headScripts: "" as string,
};

export type SiteConfig = typeof siteConfig;
CFG

# 7. Contact form: Netlify Forms + honeypot + captcha
cat > src/components/ContactForm.astro <<'CF'
---
import { siteConfig } from "~/config/site";
const f = siteConfig.contactForm;
const isNetlify = f.provider === "netlify";
---

<div class="contact-page">
  <form
    class="cform"
    method="POST"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    data-netlify-recaptcha="true"
    name="contact"
  >
    <input type="hidden" name="form-name" value="contact" />
    <p class="hp" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;">
      <label>Don't fill this out if you're human: <input name="bot-field" tabindex="-1" autocomplete="off" /></label>
    </p>
    <div class="cfield">
      <label for="cf-name">{f.fields.name}</label>
      <input id="cf-name" name="name" type="text" required autocomplete="name" />
    </div>
    <div class="cfield">
      <label for="cf-email">{f.fields.email}</label>
      <input id="cf-email" name="email" type="email" required autocomplete="email" />
    </div>
    <div class="cfield">
      <label for="cf-msg">{f.fields.message}</label>
      <textarea id="cf-msg" name="message" required></textarea>
    </div>
    <div data-netlify-recaptcha="true"></div>
    <button class="submit" type="submit">
      {f.submitLabel}
      <svg viewBox="0 0 24 24" fill="none" style="width:16px;height:16px"
        ><path
          d="M5 12h13M12 6l6 6-6 6"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"></path></svg
      >
    </button>
  </form>

  <div class="channels">
    {f.channels.map((ch) =>
      ch.url ? (
        <a class="channel" href={ch.url}>
          <div class="l">{ch.label}</div>
          <div class="v">{ch.value}</div>
        </a>
      ) : (
        <div class="channel">
          <div class="l">{ch.label}</div>
          <div class="v">{ch.value}</div>
        </div>
      )
    )}
  </div>
</div>
CF

# 8. Update astro.config.mjs
cat > astro.config.mjs <<'ASTRO'
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://giles.io',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['gb-dev-1.exe.xyz', 'giles.io', 'www.giles.io'],
    },
  },
  prefetch: { prefetchAll: true },
  compressHTML: true,
});
ASTRO

# 9. Update netlify.toml
cat > netlify.toml <<'NETLIFY'
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
NETLIFY

# 10. Update README.md
cat > README.md <<'README'
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
README

printf 'apply-portfolio-content complete\n'
