import Faq from './Faq.astro';

export default {
  title: 'Portfolio/Content/FAQ',
  component: Faq,
};

export const Default = {};

export const ExpandedQuestions = {
  parameters: {
    docs: {
      description: {
        story: 'Configured questions render as native details elements, ready to expand independently.',
      },
    },
  },
};
