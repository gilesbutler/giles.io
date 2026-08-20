import { defineTask } from '@a5c-ai/babysitter-sdk';

/**
 * @process specializations/web-development
 * @description Refresh portfolio positioning with a senior design engineering narrative
 * @agent senior-astro-content-editor specializations/web-development/agents/senior-astro-content-editor/AGENT.md
 */
export async function process(inputs, ctx) {
  const change = await ctx.task(applyPositioningTask, { request: inputs.request });
  const review = await ctx.task(reviewPositioningTask, {});
  const verify = await ctx.task(verifyPositioningTask, {});
  return { change, review, verify };
}

const applyPositioningTask = defineTask('apply-positioning-refresh', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Refresh Senior Design Engineer positioning',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior Astro content editor and design engineering specialist',
      task: 'Implement the positioning request completely in the existing repository.',
      context: { request: args.request },
      instructions: [
        'Work directly in the current repository; do not create a scratch worktree.',
        'Read src/config/site.ts and the relevant rendered components before editing.',
        'Use src/config/site.ts as the single source of truth for shared copy.',
        'Position Giles primarily as a Senior Design Engineer: a product-minded designer-builder who shapes product problems, interaction design, and frontend systems, with full-stack fluency as supporting range rather than the headline identity.',
        'Keep the narrative grounded in existing case studies and timeline facts; do not invent technologies, employers, or outcomes.',
        'Preserve the existing visual design, routes, links, case studies, testimonials, and form behavior.',
        'Do not add dependencies, new routes, process files, or speculative content.',
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
  labels: ['portfolio', 'positioning', 'content', 'implementation'],
}));

const reviewPositioningTask = defineTask('review-positioning-refresh', (_args, taskCtx) => ({
  kind: 'agent',
  title: 'Review Senior Design Engineer positioning consistency',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Portfolio messaging and design engineering reviewer',
      task: 'Review the resulting site copy for a coherent Senior Design Engineer narrative.',
      instructions: [
        'Read src/config/site.ts and inspect the rendered homepage/about/contact components that consume it.',
        'Check that Senior Design Engineer is the primary identity, with product framing, interaction design, frontend craft, and shipped outcomes leading the narrative.',
        'Check that full-stack fluency remains visible as supporting range, not as the headline role.',
        'Check for stale or contradictory full-stack staff-engineer-only language in the live source.',
        'Check for inflated claims and preserve factual experience, case studies, testimonials, links, and visual behavior.',
        'If a small copy correction is needed, make it directly in the existing config file.',
        'Do not run formatters, linters, or project-wide tests.',
        'Return JSON with findings, filesModified, and recommendation.',
      ],
      outputFormat: 'JSON with findings (array), filesModified (array), recommendation (string)',
    },
    outputSchema: {
      type: 'object',
      required: ['findings', 'filesModified', 'recommendation'],
      properties: {
        findings: { type: 'array' },
        filesModified: { type: 'array', items: { type: 'string' } },
        recommendation: { type: 'string' },
      },
    },
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['portfolio', 'positioning', 'review'],
}));


const verifyPositioningTask = defineTask('verify-positioning-refresh', (_args, taskCtx) => ({
  kind: 'shell',
  title: 'Build and smoke-test Senior Design Engineer positioning',
  shell: {
    command: 'bash /home/exedev/giles.io/.a5c/processes/verify-portfolio.sh',
    expectedExitCode: 0,
    timeout: 300000,
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['astro', 'build', 'smoke-test', 'hard-gate'],
}));
