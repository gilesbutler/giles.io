import { defineTask } from '@a5c-ai/babysitter-sdk';

export async function process(inputs, ctx) {
  const change = await ctx.task(applyHomepageChangeTask, { request: inputs.request });
  const verify = await ctx.task(verifyHomepageChangeTask, { request: inputs.request });
  return { change, verify };
}

const applyHomepageChangeTask = defineTask('apply-homepage-annotation-change', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Apply homepage annotation changes',
  description: 'Update copy, icons, and optimized case-study imagery from the annotation request',
  agent: {
    name: 'homepage-content-editor',
    prompt: {
      role: 'senior Astro frontend engineer',
      task: 'Implement the provided homepage annotation request completely in the existing repository.',
      context: { request: args.request },
      instructions: [
        'Work directly in the current repository; do not create a scratch worktree.',
        'Read the relevant existing components, config, content entries, and asset conventions before editing.',
        'Use existing data-driven patterns. Keep all requested copy exact, including capitalization.',
        'Use the attached local image files from the request. Convert or resize them to web-appropriate assets before adding them; preserve the requested content while reducing file weight.',
        'Use existing project tools and do not add dependencies unless strictly necessary.',
        'Do not run formatters, linters, or project-wide tests.',
        'Return JSON with filesCreated, filesModified, summary, and decisions.',
      ],
      outputFormat: 'JSON with filesCreated (array), filesModified (array), summary (string), decisions (array)',
    },
    outputSchema: {
      type: 'object',
      required: ['filesCreated', 'filesModified', 'summary'],
      properties: {
        filesCreated: { type: 'array', items: { type: 'string' } },
        filesModified: { type: 'array', items: { type: 'string' } },
        summary: { type: 'string' },
        decisions: { type: 'array', items: { type: 'object' } },
      },
    },
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['homepage', 'content', 'assets', 'implementation'],
}));

const verifyHomepageChangeTask = defineTask('verify-homepage-annotation-change', (_args, taskCtx) => ({
  kind: 'shell',
  title: 'Build and verify homepage changes',
  description: 'Run the production build and verify requested image assets are present',
  shell: {
    command: 'npm run build',
    expectedExitCode: 0,
    timeout: 300000,
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['astro', 'build', 'verification'],
}));
