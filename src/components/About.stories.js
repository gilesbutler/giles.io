import About from './About.astro';

export default {
  title: 'Portfolio/Sections/About',
  component: About,
};

export const Default = {};

export const WithWorkspaceSnapshots = {
  parameters: {
    docs: {
      description: {
        story: 'The default profile presentation, including workspace snapshots and capability tags from site configuration.',
      },
    },
  },
};
