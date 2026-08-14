import { defineTask } from '@a5c-ai/babysitter-sdk';

export async function process(inputs, ctx) {
  const plan = await ctx.task(openspecPlanTask, { change: inputs.change });
  const apply = await ctx.task(applyContentTask, {});
  const build = await ctx.task(buildVerifyTask, {});
  return { plan, apply, build };
}

const openspecPlanTask = defineTask('openspec-plan', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Validate OpenSpec portfolio change',
  shell: {
    command: 'openspec validate ' + args.change + ' --strict && openspec status --change ' + args.change,
    expectedExitCode: 0,
    timeout: 120000,
  },
  io: {
    inputJsonPath: 'tasks/' + taskCtx.effectId + '/input.json',
    outputJsonPath: 'tasks/' + taskCtx.effectId + '/result.json',
  },
  labels: ['openspec', 'planning', 'hard-gate'],
}));

const applyContentTask = defineTask('apply-portfolio-content', (_args, taskCtx) => ({
  kind: 'shell',
  title: 'Apply Giles Butler portfolio content',
  shell: {
    command: 'bash /home/exedev/giles.io/.a5c/processes/apply-portfolio.sh',
    expectedExitCode: 0,
    timeout: 240000,
  },
  io: {
    inputJsonPath: 'tasks/' + taskCtx.effectId + '/input.json',
    outputJsonPath: 'tasks/' + taskCtx.effectId + '/result.json',
  },
  labels: ['portfolio', 'apply', 'hard-gate'],
}));

const buildVerifyTask = defineTask('verify-portfolio-build', (_args, taskCtx) => ({
  kind: 'shell',
  title: 'Build and verify portfolio site',
  shell: {
    command: 'bash /home/exedev/giles.io/.a5c/processes/verify-portfolio.sh',
    expectedExitCode: 0,
    timeout: 300000,
  },
  io: {
    inputJsonPath: 'tasks/' + taskCtx.effectId + '/input.json',
    outputJsonPath: 'tasks/' + taskCtx.effectId + '/result.json',
  },
  labels: ['astro', 'build', 'smoke-test', 'hard-gate'],
}));
