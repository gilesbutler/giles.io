# Project Profile: giles.io

Existing version-1 Astro static portfolio for Giles Butler, a product-minded creative engineer and co-founder of Fuzzy Logic Labs.

> Last updated: 2026-08-13T14:54:17Z | Version: 1

## Goals

- **portfolio** [high]: Present Giles Butler's product engineering, frontend, design, and full-stack experience. (active)
- **content-maintenance** [high]: Maintain site copy, navigation, SEO, contact content, and case studies from clear source locations. (active)
- **delivery** [high]: Continuously publish a reliable static site from main through Netlify. (active)
- **process** [medium]: Use semi-autonomous assistance without babysitter triggers in production CI/CD. (active)

## Tech Stack

### Languages

- TypeScript v5.7 (configuration, schemas, Astro scripts)
- JavaScript (Astro configuration and process scripts)
- CSS (global tokens, themes, responsive styling)
- Markdown (content collections)

### Frameworks

- Astro v7.0.2 [static site framework]
- Tailwind CSS v4.3.0 [styling via Vite]
- Zod [content validation]
- @astrojs/sitemap v3.7.3 [sitemap generation]

### Infrastructure

- Netlify [primary hosting/build/deploy]
- Vercel [secondary hosting]
- Cloudflare Pages [optional deployment]
- Node.js [build runtime]

**Build tools:** Astro CLI, Vite, @tailwindcss/vite, patch-package, TypeScript

**Package managers:** npm

## Architecture

**Pattern:** Configuration-driven, statically generated Astro site.
**Data flow:** Build-time Astro content/config loading produces dist/; Netlify publishes dist/. Contact posts to Netlify Forms. There is no database or application API.

### Modules

| Module | Path | Description |
|--------|------|-------------|
| Site configuration | `src/config/site.ts` | Single source for identity, copy, navigation, sections, SEO, form, and footer. |
| Routes | `src/pages/` | Home, about, work index/detail, contact, 404, and service-worker cleanup route. |
| Components | `src/components/` | Presentational Astro sections. |
| Content collections | `src/content/ and src/content.config.ts` | Glob-loaded work and journal Markdown validated with Zod. |
| Styles | `src/styles/global.css` | Centralized theme tokens and responsive styles. |

**Entry points:** `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/work.astro`, `src/pages/work/[slug].astro`, `src/pages/contact.astro`, `astro.config.mjs`

## Team

- **Giles Butler** (Owner and product-minded creative engineer): Portfolio direction, Astro/frontend/design/full-stack implementation, Content and deployment ownership
- **Adam Arbolino** (Fuzzy Logic Labs co-founder): Co-founded Fuzzy Logic Labs and collaborated on represented products
- **Asta Bankauske** (Historical repository contributor): Dependency maintenance and GitHub merge activity
- **Luca Zoppetti** (Historical external contributor): Theme-flash fix

## Workflows

### development

Local Astro development and implementation.
**Triggers:** Manual local development

1. npm install
2. npm run dev
3. Edit source
4. npm run build

### content-update

Plan or update content, build, and inspect generated routes.
**Triggers:** Content request

1. Use OpenSpec when appropriate
2. Edit centralized config or Markdown
3. Run build and smoke checks

### verification

Build-based smoke verification; no unit-test framework exists.
**Triggers:** Before delivery

1. npm run build
2. Assert required dist routes and identity
3. Assert archived routes remain absent

### netlify-deployment

Primary continuous deployment.
**Triggers:** Push to main

1. Push main
2. Netlify runs npm run build with Node 22
3. Publish dist/
4. Apply security headers

## Processes

- **undefined** (`undefined`, undefined)
- **undefined** (`undefined`, undefined)
- **undefined** (`undefined`, undefined)
- **undefined** (`undefined`, undefined)
- **undefined** (`undefined`, undefined)
- **undefined** (`undefined`, undefined)

## Services

- **Netlify** (undefined)
- **Vercel** (undefined)
- **Cloudflare Pages** (undefined)
- **GitHub** (undefined)

## CI/CD

**Provider:** Netlify
**Config files:** `netlify.toml`, `vercel.json`

### Pipelines

- **Netlify production** (trigger: Push to main)
  Stages: npm run build with Node 22 -> Publish dist/ -> Apply security headers
- **Vercel secondary** (trigger: Manual deploy:vercel)
  Stages: Build -> Publish dist/
- **Cloudflare secondary** (trigger: Manual deploy:cloudflare)
  Stages: Build -> Deploy dist/

## Pain Points

- **medium** [quality]: No unit, integration, lint, or dedicated test suite; confidence relies on build and route smoke checks.
- **medium** [maintenance]: Dependency updates historically use a repeated manual external-fork PR loop.
- **low** [content]: HEADSHOTS_TODO.md and placeholder case-study imagery indicate remaining asset work.

## Bottlenecks

- Manual build-and-route verification is the primary quality gate. at .a5c/processes/verify-portfolio.sh (Every delivery)
  Impact: Limited regression detection.
- Manual dependency update loop. at GitHub PR workflow (Recurring)
  Impact: Recurring maintenance effort and possible update lag.
- No tags, releases, changelog, or semver markers. at Git history (Continuous)
  Impact: Release boundaries are hard to audit.

## Conventions

### Naming

- **paths:** Lowercase route/content slugs
- **siteConfig:** camelCase properties
- **components:** PascalCase Astro filenames

### Git

- **branchStrategy:** Trunk-based single main branch
- **mergeStrategy:** GitHub PR merges plus direct content/config commits
- **commitStyle:** Terse lowercase imperative subjects
- **releaseStrategy:** Continuous deployment; no formal releases

**Import order:** External packages > Astro imports > ~/* aliases > Relative imports

**Error handling:** Fail-fast shell verification and Zod/Astro content validation.

**Testing:** Use npm run build and deterministic generated-route/content assertions; no unit-test framework.

### Additional Rules

- Keep site static unless explicitly required otherwise.
- Keep Netlify primary.
- Do not add babysitter CI/CD triggers.
- Use OpenSpec for changes that warrant planning.
- Gitignore policy: Logs only; ignore .a5c/creds.env, .a5c/creds.env.tmp.*, and .a5c/logs/.

## Repositories

- **giles.io** - https://github.com/gilesbutler/giles.io.git

## CLAUDE.md Instructions

- Use Astro 7 static-site conventions with Node 22 and existing repository data/content/asset paths.
- Use Netlify as the primary deployment target; publish dist/ via the configured build, and treat Vercel/Cloudflare as secondary manual targets.
- Do not add Babysitter CI/CD integration, CI triggers, deployment pipelines, dependencies, or new process files without explicit approval.
- Work semi-autonomously for routine reversible edits; request approval for consequential, irreversible, production, security-sensitive, dependency, deletion, migration, or scope changes.
- Use OpenSpec for spec-worthy work and run strict validation plus change status checks before implementation.
- Use .a5c/processes/portfolio-content-update.js for full portfolio-content updates, .a5c/processes/homepage-annotation-update.js for homepage annotation requests, and .a5c/processes/verify-portfolio.sh for build/route/content smoke verification.
- Use the documented npm, OpenSpec, and verification commands; preserve existing process hard gates and do not invent substitute workflows.

## Installed Extensions

- Skills: OpenSpec spec-driven workflow, Babysitter cradle/project-install reference, Astro/static-site conventions
- Agents: General-purpose profile architect, Senior Astro frontend engineer role, Review and verification roles referenced by processes
- Processes: cradle/project-install, .a5c/processes/homepage-annotation-update.js, .a5c/processes/portfolio-content-update.js, .a5c/processes/install-august-template.js, .a5c/processes/apply-portfolio.sh, .a5c/processes/verify-portfolio.sh
