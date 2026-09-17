import BlogGrid from './BlogGrid.astro';

export default {
  title: 'Portfolio/Content/Blog Grid',
  component: BlogGrid,
};

export const LatestPosts = {};

export const CollectionFallback = {
  parameters: {
    docs: {
      description: {
        story: 'Uses the component’s default journal collection query and newest-first ordering.',
      },
    },
  },
};
