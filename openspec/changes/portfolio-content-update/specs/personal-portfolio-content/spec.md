## ADDED Requirements

### Requirement: Home presents Giles Butler as the subject
The home page SHALL show "Giles Butler" as the named subject with the headline "Product minded creative engineer. 15+ years turning complex problems into interfaces people actually use." and a contact CTA.

#### Scenario: Home hero shows the correct subject
- **WHEN** the home page is rendered
- **THEN** the hero displays the name "Giles Butler", the headline above, and a primary CTA linking to `/contact/`

### Requirement: About page reflects Giles's bio
The About page SHALL show the bio "Founder | Father | Entrepreneur. Building products at the intersection of music, technology and design" and a skills list that emphasizes Vue, xState, and design engineering.

#### Scenario: About page shows Giles's bio
- **WHEN** the About page is rendered
- **THEN** the lead paragraph contains the bio and a skills list that includes "Vue" and "xState" with a clear emphasis

### Requirement: Fuzzy Logic Labs appears as the current role
The site SHALL list Fuzzy Logic Labs as Giles's current role (since 2016, Co-Founder) and link the four products (Mixo, Mixvisor, Userfold, Room For Sound) from that entry.

#### Scenario: Timeline lists Fuzzy Logic Labs
- **WHEN** the timeline is rendered on the About page
- **THEN** Fuzzy Logic Labs appears as an entry marked as the current role from 2016 with the role "Co-Founder" and a body describing the products and responsibilities

### Requirement: Four case studies are published
The site SHALL publish case studies for Mixo, CommBank, eGuarantee, and LawPath, each with a detail page at `/work/<slug>/`.

#### Scenario: Case-study index lists all four
- **WHEN** the work index is rendered
- **THEN** the four case studies appear in the order Mixo, CommBank, eGuarantee, LawPath

#### Scenario: Each case study has a detail page
- **WHEN** a user opens `/work/mixo/`, `/work/commbank/`, `/work/eguarantee/`, or `/work/lawpath/`
- **THEN** a detail page renders with the title, excerpt, body, and a back link to `/work/`

### Requirement: Five testimonials are shown
The site SHALL show testimonials from Adam Arbolino, Brad Phillips, Remon Saddik, Dale Hurley, and Daniel Serrano, each with their quote, name, and role.

#### Scenario: Testimonial grid lists all five
- **WHEN** the testimonials component is rendered on the home or About page
- **THEN** all five testimonials appear with the correct quote, name, and role

### Requirement: Eleven-logo client cloud
The site SHALL show eleven client wordmarks in a monochrome marquee: Mixo, Mixvisor, Userfold, Room For Sound, Credabl, eGuarantee, CommBank, Emirates, Quiksilver, LawPath, Toyota.

#### Scenario: Marquee lists all eleven
- **WHEN** the clients section is rendered on the home page
- **THEN** the marquee shows the eleven wordmarks in the agreed order

### Requirement: Demo material is archived
The blog index, the playground page, and the four demo work entries SHALL NOT be present in nav/footer or generate routes, but SHALL remain on disk under `archived/` for future recovery.

#### Scenario: Demo routes are not built
- **WHEN** the site is built
- **THEN** no routes are generated for `/blog/`, `/blog/<slug>/`, `/playground/`, or the four demo work entries (north-light, homestead, stylebook, northwind-health)

#### Scenario: Demo source is preserved
- **WHEN** the source tree is inspected after the change
- **THEN** the original demo material is present in `archived/` (or equivalent) and is not loaded by the build

### Requirement: Contact form posts to Netlify with captcha and honeypot
The contact form SHALL submit to Netlify Forms and SHALL include a honeypot field and a captcha challenge.

#### Scenario: Form posts to Netlify
- **WHEN** the form is rendered
- **THEN** the form has the attributes required for Netlify Forms (`data-netlify="true"`, `name="contact"`, hidden `form-name` input)

#### Scenario: Honeypot field is present
- **WHEN** the form is rendered
- **THEN** a hidden input is present that is visually hidden from humans but readable by bots, and it is excluded from legitimate submissions

#### Scenario: Captcha challenge is present
- **WHEN** the form is rendered
- **THEN** a captcha challenge is shown to the user (Netlify's built-in reCAPTCHA / honeypot combination or equivalent)

## ADDED Requirements

### Requirement: Netlify deploy config targets giles.io
`netlify.toml` SHALL declare the build command, publish directory, and Node version required for the site. `astro.config.mjs` SHALL set `site: 'https://giles.io'`.

#### Scenario: Build configuration is correct
- **WHEN** the repository is connected to Netlify
- **THEN** Netlify builds the site using `npm run build` and publishes `dist/` to giles.io
