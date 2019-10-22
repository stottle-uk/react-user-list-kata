import { getCurrentPath } from 'libs/router/+store/router.selectors';
import { createSelector } from 'reselect';
import { PagesState } from './pages.reducer';

const getState = (state: PagesState) => state;

export const getPages = createSelector(
  [getState],
  state => state.pages
);

export const getIsLoading = createSelector(
  [getState],
  state => state.isLoading
);

export const getPageData = createSelector(
  [getCurrentPath, getPages, getIsLoading],
  (path, pages, isLoading) => ({
    pageEntry: pages[path],
    loading: isLoading,
    lists: {},
    listsLoading: false
  })
);
