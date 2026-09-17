import Stats from './Stats.astro';

export default {
  title: 'Portfolio/Content/Stats',
  component: Stats,
};

export const Default = {};

export const WithWebsitePopover = {
  parameters: {
    docs: {
      description: {
        story: 'Configured metrics include the interactive explanation popover for the websites-created statistic.',
      },
    },
  },
};
