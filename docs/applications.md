# Tailored application pages

The SoundCloud approach lives at `/soundcloud/`. It asks for a UK-based exception to the advertised New York arrangement; it does not claim relocation or US work eligibility.

## Structure

- `src/config/applications/types.ts`: the typed company/role copy contract.
- `src/config/applications/soundcloud.ts`: company, role, sources, eligibility, asset paths, contact subject inputs and chapter copy.
- `src/components/applications/ApplicationLanding.astro`: the chapter structure, navigation, base typography and named `design-demo` slot.
- `ApplicationWork.astro`: evidence from Mixo and Mixvisor, with configurable relevance summaries.
- `ApplicationContact.astro`: company-specific email subject and CV download. Clipboard failures do not report success.
- `CreatorInsights.astro`: a small independent analytics interaction with explicitly fictional data.

The existing `/moises/` page and its CV are deliberately unchanged. The shared audio pads, engineering illustration and product-loop components are reused, not forked. The legacy `lab/moises` import path is internal and does not add Moises branding to the new page.

## Next application

1. Add a typed configuration beside `soundcloud.ts`; verify the actual role and location requirements.
2. Add a thin Astro route, import the configuration and supply an appropriate `design-demo` slot.
3. Tailor the evidence and relevance, not just the company name. Do not present a fictional prototype as shipped experience.
4. Create a separate CV filename, application link and share image. Never overwrite another application's assets.
5. Check the new page, rendered metadata, email subject, CV links and visible copy for accidental cross-company references.

## Assets

`public/giles-butler-soundcloud-cv.pdf` is the two-page tailored CV. The full-width link near the top opens `https://giles.io/soundcloud/`. Contact and footer links are clickable.

`src/assets/applications/soundcloud-share.svg` is editable 1200 by 630 artwork. The static Astro endpoint `src/pages/applications/soundcloud/share.png.ts` converts it to a real PNG during the build using the Sharp installation already supplied with this repository's Astro image pipeline. The output path is `/applications/soundcloud/share.png`; there is no runtime image-generation service or browser dependency.

The SoundCloud cloudmark path is sourced from Simple Icons (`icons/soundcloud.svg`). It identifies the intended company and does not imply endorsement or affiliation. The accompanying company name uses the site's typography rather than a fabricated official wordmark.

## Validation

Run `node --test tests/creator-insights.test.mjs` for the deterministic metric checks. The previous seven-day comparison is calculated from the overlapping 28-day rows; period unique listeners are not incorrectly summed from daily uniques.

Run `npm run build` and inspect `/soundcloud/` plus `/applications/soundcloud/share.png` in the deploy preview before merging. Review desktop and narrow screens, drawer keyboard/focus behaviour, the analytics table, reset, reduced motion, audio initiation and the PDF download. A reduced-motion component test is not a substitute for testing the complete page on real devices.

No changes should be committed directly to `main`. Publish application changes on a branch and review them through a pull request.
