# Project Instructions

## Babysitter

### Project conventions

- This is an Astro 7 personal portfolio rendered as a static site (`output: 'static'`) for Node 22. Keep the existing Astro structure and data-driven patterns: site identity and shared page copy live in `src/config/site.ts`, work entries are Markdown in `src/content/work/`, theme tokens and Tailwind v4 styling live in `src/styles/global.css`, and publishable assets belong in `public/`.
- Treat content collection validation as a contract. Preserve requested copy exactly, follow the existing frontmatter/schema conventions, and keep archived or demo-only material out of the built site.
- Prefer the repository's existing commands and patterns. Do not add dependencies, new process files, CI triggers, or deployment pipelines unless explicitly approved.

### Deployment and approvals

- Netlify is the primary deployment target. The production build publishes `dist/` with Node 22, as configured in `netlify.toml`; use `npm run deploy:netlify` for an intentional production deployment. Vercel and Cloudflare commands are secondary manual targets, not the default release path.
- Babysitter CI/CD integration is intentionally skipped. Do not add babysitter workflows, CI triggers, or pipeline configuration; Netlify's configured branch build remains the deployment automation.
- Work semi-autonomously: use sensible defaults for routine, reversible, in-scope edits and report what changed. Ask for approval before adding dependencies, deleting or migrating content, changing scope or deployment behavior, deploying to production, altering security-sensitive settings, or taking another consequential/irreversible action.

### OpenSpec and Babysitter workflow

- Use OpenSpec for spec-worthy work: plan changes under `openspec/changes/<change>/`, review the proposal/design/tasks, then run `openspec validate <change> --strict` and `openspec status --change <change>` before implementation. OpenSpec defines what should change; Babysitter processes enforce the execution and verification gates.
- For a full portfolio-content update, use the existing `.a5c/processes/portfolio-content-update.js`. It validates the named OpenSpec change, applies the repository's portfolio update step, and runs the portfolio build gate. Do not replace it with an ad hoc process.
- For a request based on homepage annotations (copy, icons, or optimized case-study imagery), use `.a5c/processes/homepage-annotation-update.js`; it applies the request through the existing Astro content-editor task and then builds the site.
- After portfolio or route/content changes, use `.a5c/processes/verify-portfolio.sh` as the smoke gate. It runs the production build, checks required route files and identity copy, and rejects unintended `/blog/` or `/playground/` output.
- Use the existing processes through the repository's Babysitter runner; their exported `process(inputs, ctx)` entrypoints are not standalone application scripts. Keep their hard gates intact and do not invent substitute workflows.

### Commands

```bash
npm install
npm run dev              # local Astro server at http://localhost:4321
npm run build            # production static build in dist/
npm run preview         # preview the built site
npm run deploy:netlify   # intentional Netlify production deployment
openspec validate <change> --strict
openspec status --change <change>
bash .a5c/processes/verify-portfolio.sh
```

There is no separate unit, lint, or project-wide test suite configured; for site changes, treat the production build and the applicable route/content smoke checks as the verification baseline. Do not run formatters, linters, or project-wide tests as part of the existing Babysitter processes.
