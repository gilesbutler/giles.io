import Nav from './Nav.astro';

export default {
  title: 'Portfolio/Navigation/Nav',
  component: Nav,
};

export const Default = {};

export const WithThemeToggle = {
  parameters: {
    docs: {
      description: {
        story: 'Configured navigation with active-link detection, theme toggle, contact CTA, and mobile menu markup.',
      },
    },
  },
};
