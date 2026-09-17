import PageHeader from './PageHeader.astro';

export default {
  title: 'Portfolio/Layout/Page Header',
  component: PageHeader,
};

export const Default = {
  args: {
    kicker: 'Selected work',
    title: 'A thoughtful page header',
    subtitle: 'A reusable starting point for isolated component development.',
  },
};

export const TitleOnly = {
  args: {
    title: 'A title without supporting copy',
  },
};
