import Hero from './Hero.astro';

export default {
  title: 'Portfolio/Sections/Hero',
  component: Hero,
};

export const Default = {};

export const WithStickers = {
  parameters: {
    docs: {
      description: {
        story: 'The configured hero canvas with notes, avatars, role/location stickers, availability, and primary CTA.',
      },
    },
  },
};
