import '@fontsource-variable/inter';
import '@fontsource-variable/rubik';
import '@fontsource/dm-mono/400.css';
import '@fontsource/dm-mono/500.css';
import '@fontsource/just-me-again-down-here';
import './preview.css';
import { siteConfig } from '../src/config/site';

// Standalone stories need the optional data sections used by these components.
// Keep fixtures in Storybook only so production config remains unchanged.
siteConfig.gallery ??= {
  kicker: 'Selected images',
  heading: 'A closer look',
  subtitle: 'A small selection of work and process.',
  items: [{ image: '/work/mixo-prompt.webp', caption: 'Product interface detail', label: 'mixo-prompt.webp' }],
};

siteConfig.newsletter ??= {
  provider: 'formspree',
  formspreeId: 'storybook-preview',
  convertkitFormId: '',
  buttondownUser: '',
  mailchimpAction: '',
  kicker: 'Stay in the loop',
  heading: 'Occasional notes on product, design, and engineering.',
  subtitle: '',
  placeholder: 'you@example.com',
  buttonLabel: 'Subscribe',
  note: 'No noise. Unsubscribe any time.',
};


const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
  },
};

export default preview;
