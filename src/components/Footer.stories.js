import Footer from './Footer.astro';

export default {
  title: 'Portfolio/Layout/Footer',
  component: Footer,
};

export const Default = {};

export const WithSocialLinks = {
  parameters: {
    docs: {
      description: {
        story: 'Configured footer identity, navigation columns, social links, and availability status.',
      },
    },
  },
};
