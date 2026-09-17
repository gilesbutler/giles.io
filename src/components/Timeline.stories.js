import Timeline from './Timeline.astro';

export default {
  title: 'Portfolio/Content/Timeline',
  component: Timeline,
};

export const Default = {};

export const CareerHistory = {
  parameters: {
    docs: {
      description: {
        story: 'Configured career entries render in chronological order with color-coded milestones.',
      },
    },
  },
};
