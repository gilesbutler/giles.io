/**
 * @process specializations/web-development/storybook-component-testing
 * @description Add categorized Storybook stories for every existing Astro component and reserve a separate landing-page story hierarchy.
 * @agent general-purpose
 */

import { defineTask } from '@a5c-ai/babysitter-sdk';

export async function process(inputs, ctx) {
  const implementation = await ctx.task(implementStoriesTask, inputs);
  const verification = await ctx.task(verifyStoriesTask, inputs);
  return { implementation, verification };
}

const implementStoriesTask = defineTask('storybook-component-stories/implement', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Create categorized Astro component stories',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior Astro and Storybook engineer',
      task: 'Add Storybook stories for every Astro component in src/components and organize the Storybook sidebar for future one-off landing pages.',
      context: {
        projectDir: args.projectDir || '/home/exedev/giles.io',
        componentDir: 'src/components',
        existingStory: 'src/components/PageHeader.stories.js',
        storybookConfig: '.storybook/main.js',
      },
      instructions: [
        'Read every .astro file in src/components before editing and inspect the existing PageHeader story.',
        'Create a colocated .stories.js file for every component that does not already have one. Update the existing PageHeader story rather than duplicating it.',
        'Use Storybook CSF3-compatible default exports and named stories. Import each matching .astro component.',
        'Give every story a useful default render and add meaningful prop/state variants where that component accepts props. Do not change production component behavior just to make a story possible.',
        'Categorize all current components under the stable Storybook title prefix Portfolio, with meaningful second-level groups such as Navigation, Layout, Sections, Work, Content, and Forms. Keep categories based on the component role, not incidental filename order.',
        'Reserve a separate hierarchy for future one-off landing pages: configure .storybook/main.js with explicit story globs for src/components/**/*.stories.@(js|jsx|ts|tsx) and src/landing-pages/**/*.stories.@(js|jsx|ts|tsx). Use the title convention Landing Pages/<landing-page-name>/<component-name> for future landing-page stories, without creating placeholder production components.',
        'Preserve existing global styling, static asset serving, Astro framework configuration, and package scripts.',
        'Do not add dependencies, production components, or generated documentation. Do not run formatters, linters, builds, or project-wide tests; verification is a separate task.',
        'Return a concise report listing every story file created or updated and the category assigned to each component.',
      ],
      outputFormat: 'JSON or concise implementation report',
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['storybook', 'astro', 'components', 'implementation'],
}));

const verifyStoriesTask = defineTask('storybook-component-stories/verify', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Build and verify categorized component stories',
  shell: {
    command: [
      `cd ${args.projectDir || '/home/exedev/giles.io'}`,
      "for component in src/components/*.astro; do base=${component%.astro}; test -f \"${base}.stories.js\" || { echo \"Missing story: ${base}.stories.js\"; exit 1; }; done",
      "for story in src/components/*.stories.js; do grep -q \"title: 'Portfolio/\" \"$story\" || { echo \"Uncategorized story: $story\"; exit 1; }; done",
      'test -f .storybook/main.js',
      "grep -q \"../src/components/\\*\\*/\\*.stories\" .storybook/main.js",
      "grep -q \"../src/landing-pages/\\*\\*/\\*.stories\" .storybook/main.js",
      'npm run build-storybook',
      'bash .a5c/processes/verify-portfolio.sh',
    ].join(' && '),
    expectedExitCode: 0,
    timeout: 600000,
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/result.json`,
  },
  labels: ['storybook', 'astro', 'build', 'smoke-test', 'hard-gate'],
}));
