## ADDED Requirements

### Requirement: August template source is installed
The repository SHALL contain the August template source tree, including its Astro pages, components, layout, styles, content collections, configuration, and public assets, as the active site implementation.

#### Scenario: Template routes are present
- **WHEN** the repository is inspected after installation
- **THEN** the August home, about, work, blog, contact, playground, and error routes are present under `src/pages`

#### Scenario: Legacy site is absent
- **WHEN** the active source and public trees are inspected
- **THEN** Dante-specific pages, components, content, styles, and assets are no longer part of the site

### Requirement: August uses its Astro 7 dependency baseline
The project SHALL use the August package manifest and lockfile dependency baseline, including Astro 7, Tailwind 4's Vite plugin, sitemap integration, and the bundled font packages.

#### Scenario: Dependencies install from the lockfile
- **WHEN** dependencies are installed from the repository lockfile
- **THEN** installation completes successfully without requiring the old site's dependency set

#### Scenario: Production build succeeds
- **WHEN** `npm run build` is executed from the repository root
- **THEN** Astro generates the static August site successfully

### Requirement: Template behavior remains unchanged
The initial installation SHALL not rewrite August's demo content or visual behavior; content customization is out of scope for this change.

#### Scenario: Demo content remains available
- **WHEN** the installed site is built
- **THEN** August's bundled journal and work demo entries are included in the generated site
