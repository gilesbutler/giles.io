import Clients from './Clients.astro';

export default {
  title: 'Portfolio/Sections/Clients',
  component: Clients,
};

export const Default = {};

export const MarqueeLoop = {
  parameters: {
    docs: {
      description: {
        story: 'Displays the configured client list duplicated for a seamless marquee loop.',
      },
    },
  },
};
