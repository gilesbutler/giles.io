import Newsletter from './Newsletter.astro';

export default {
  title: 'Portfolio/Forms/Newsletter',
  component: Newsletter,
};

export const Default = {};

export const WithProviderForm = {
  parameters: {
    docs: {
      description: {
        story: 'Configured newsletter signup with provider-specific action, email field name, optional subtitle, and note.',
      },
    },
  },
};
