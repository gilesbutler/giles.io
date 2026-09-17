import FeaturedWorks from './FeaturedWorks.astro';

export default {
  title: 'Portfolio/Work/Featured Works',
  component: FeaturedWorks,
};

export const Default = {};

export const StackedCaseStudies = {
  parameters: {
    docs: {
      description: {
        story: 'The configured work collection displayed as a stacked folder-card case-study deck.',
      },
    },
  },
};
