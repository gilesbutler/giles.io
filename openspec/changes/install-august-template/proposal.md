## Why

The repository currently contains the old Dante Astro site, while the desired baseline is the uploaded August portfolio template. Replacing the old site now establishes the new design and Astro 7 toolchain before content is customized.

## What Changes

- **BREAKING** Replace the existing `src/` and `public/` site implementation with the August template from `/tmp/august-astro-theme-1.0.2_1_.zip`.
- **BREAKING** Remove the old Dante components, pages, content collections, assets, styles, and related dependencies.
- Adopt August's Astro 7 configuration, Tailwind 4 Vite integration, fonts, content model, routes, and static assets.
- Preserve the repository as an Astro project with working install and production build scripts.

## Capabilities

### New Capabilities
- `august-site-baseline`: The repository serves the uploaded August portfolio template, including its routes, styling, components, and bundled demo content.

### Modified Capabilities

## Impact

Affected files include the site source tree, public assets, `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, and project documentation/configuration inherited from the template. No external API or data migration is required. The old site's content is intentionally discarded.
