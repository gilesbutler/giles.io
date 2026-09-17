import ContactForm from './ContactForm.astro';

export default {
  title: 'Portfolio/Forms/Contact Form',
  component: ContactForm,
};

export const Default = {};

export const WithChannels = {
  parameters: {
    docs: {
      description: {
        story: 'Full contact form with required identity/message fields and configured contact channels.',
      },
    },
  },
};
