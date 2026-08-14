import { defineTask } from '@a5c-ai/babysitter-sdk';

export async function process(inputs, ctx) {
  const plan = await ctx.task(openspecPlanTask, { change: inputs.change });
  const install = await ctx.task(installTemplateTask, { archive: inputs.archive });
  const build = await ctx.task(buildTask, {});
  return { plan, install, build };
}

const openspecPlanTask = defineTask('openspec-plan', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Validate OpenSpec August replacement plan',
  shell: {
    command: `openspec validate ${args.change} --strict && openspec status --change ${args.change}`,
    expectedExitCode: 0,
    timeout: 120000,
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['openspec', 'planning', 'hard-gate'],
}));

const installTemplateTask = defineTask('install-august-template', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Replace legacy site with August template',
  shell: {
    command: `set -eu
archive='${args.archive}'
tmpdir="$(mktemp -d /tmp/august-install.XXXXXX)"
trap 'rm -rf "$tmpdir"' EXIT
unzip -q "$archive" -d "$tmpdir"
rm -rf src public astro.config.mjs package.json package-lock.json tsconfig.json tailwind.config.cjs .prettierrc README.md LICENSE netlify.toml vercel.json
cp -a "$tmpdir/august/." .
rm -rf .wrangler
npm ci
printf 'Installed August template with Astro version: '
npm ls astro --depth=0 --parseable | sed 's#^.*/node_modules/astro##' || npm ls astro --depth=0
`,
    expectedExitCode: 0,
    timeout: 240000,
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['astro', 'migration', 'template-install', 'hard-gate'],
}));

const buildTask = defineTask('verify-august-build', (_args, taskCtx) => ({
  kind: 'shell',
  title: 'Build August production site',
  shell: {
    command: `set -eu
npm run build
test -f dist/index.html
test -f dist/about/index.html
test -f dist/work/index.html
test -f dist/blog/index.html
test -f dist/contact/index.html
printf 'August build verified\n'`,
    expectedExitCode: 0,
    timeout: 240000,
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['astro', 'build', 'smoke-test', 'hard-gate'],
}));
