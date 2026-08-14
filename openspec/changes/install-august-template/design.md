## Context

The repository is an Astro 4 Dante theme with a large legacy `src/` and `public/` tree. The uploaded archive contains a complete August Astro theme at its `august/` root and declares Astro 7, Tailwind 4, sitemap, and font dependencies. The user explicitly approved deleting old content and requested only template installation for now.

## Goals / Non-Goals

**Goals:**

- Make the archive's August project the repository's active Astro site.
- Preserve August's routes, components, demo content, styles, and deployment configuration.
- Use August's package manifest and lockfile so Astro is upgraded to the template's Astro 7 baseline.
- Prove the result with dependency installation and a production build.

**Non-Goals:**

- Customizing August's copy, branding, images, or demo content.
- Preserving Dante routes or compatibility shims.
- Adding application features, CMS integration, or deployment changes.

## Decisions

- **Replace the site tree rather than merge it.** The user does not need old content, and merging would retain conflicting routes, styles, and dependency assumptions.
- **Use the archive's manifest and lockfile.** August already specifies the requested Astro 7/Tailwind 4 stack; independently upgrading or translating dependencies would create unnecessary drift.
- **Keep template deployment files.** `netlify.toml` and `vercel.json` are part of the supplied template and do not add runtime complexity.
- **Retain August demo content.** It demonstrates the installed template and is explicitly left for a later content-update phase.

## Risks / Trade-offs

- [Risk] Existing links to Dante routes will break. → Mitigation: intentional clean cutover; content migration is out of scope.
- [Risk] Astro 7 or Vite 8 dependency resolution may expose environment incompatibilities. → Mitigation: install from the supplied lockfile and run the production build.
- [Risk] Archive metadata such as `.wrangler/` may be unnecessary. → Mitigation: preserve only tracked project files and exclude generated artifacts when replacing the repository.

## Migration Plan

1. Remove the old site implementation and old package/config baseline.
2. Extract the archive's `august/` project contents into the repository root.
3. Install dependencies from the August lockfile.
4. Run the production build and inspect generated routes.
5. Rollback, if needed, by restoring the repository's prior commit; no data migration is involved.

## Open Questions

None for template installation. Branding and content decisions are deferred to the follow-up work requested by the user.
