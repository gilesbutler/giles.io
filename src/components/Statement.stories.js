import Statement from './Statement.astro';

export default {
  title: 'Portfolio/Sections/Statement',
  component: Statement,
};

export const Default = {};

export const WithCallToAction = {
  parameters: {
    docs: {
      description: {
        story: 'Configured positioning statement with accent glyphs and a contact CTA.',
      },
    },
  },
};
