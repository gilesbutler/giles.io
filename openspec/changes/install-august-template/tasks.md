## 1. Replace source baseline

- [ ] 1.1 Remove the old Dante `src/` and `public/` implementation and legacy root project files that conflict with August
- [ ] 1.2 Extract the August archive project contents into the repository root, excluding generated `.wrangler/` state

## 2. Install dependencies

- [ ] 2.1 Install dependencies from August's `package-lock.json`
- [ ] 2.2 Confirm the project manifest resolves Astro 7 and Tailwind 4 tooling

## 3. Verify the installed template

- [ ] 3.1 Run the production build from the repository root
- [ ] 3.2 Confirm August routes and generated output are present
