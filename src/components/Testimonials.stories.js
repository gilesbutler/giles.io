import Testimonials from './Testimonials.astro';

export default {
  title: 'Portfolio/Content/Testimonials',
  component: Testimonials,
};

export const Default = {};

export const ClientQuotes = {
  parameters: {
    docs: {
      description: {
        story: 'Configured client quotes render as color-coded cards with avatars, names, and roles.',
      },
    },
  },
};
