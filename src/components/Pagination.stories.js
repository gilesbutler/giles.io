import Pagination from './Pagination.astro';

export default {
  title: 'Portfolio/Navigation/Pagination',
  component: Pagination,
};

export const MiddlePage = {
  args: {
    currentPage: 3,
    lastPage: 6,
  },
};

export const FirstPage = {
  args: {
    currentPage: 1,
    lastPage: 3,
  },
};

export const LastPage = {
  args: {
    currentPage: 6,
    lastPage: 6,
  },
};

export const SinglePageHidden = {
  args: {
    currentPage: 1,
    lastPage: 1,
  },
};
