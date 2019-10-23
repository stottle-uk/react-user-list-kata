import { getLists } from '@lists';
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
  [getCurrentPath, getPages, getIsLoading, getLists],
  (path, pages, isLoading, lists) => ({
    pageEntry: pages[path],
    isLoading,
    lists,
    listsLoading: false
  })
);
