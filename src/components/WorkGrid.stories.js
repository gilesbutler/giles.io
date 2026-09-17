import WorkGrid from './WorkGrid.astro';

export default {
  title: 'Portfolio/Work/Work Grid',
  component: WorkGrid,
};

export const Default = {};

export const AllProjects = {
  parameters: {
    docs: {
      description: {
        story: 'Uses the published work collection and renders ordered project cards with dates, descriptions, tags, and links.',
      },
    },
  },
};
