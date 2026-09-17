import Contact from './Contact.astro';

export default {
  title: 'Portfolio/Forms/Contact',
  component: Contact,
};

export const Default = {};

export const CallToAction = {
  parameters: {
    docs: {
      description: {
        story: 'The configured invitation to start a conversation, with a link to the contact page.',
      },
    },
  },
};
