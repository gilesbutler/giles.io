import Gallery from './Gallery.astro';

export default {
  title: 'Portfolio/Content/Gallery',
  component: Gallery,
};

export const Default = {};

export const LightboxReady = {
  parameters: {
    docs: {
      description: {
        story: 'Configured gallery frames can open the full-size image viewer with captions, counts, and keyboard navigation.',
      },
    },
  },
};
