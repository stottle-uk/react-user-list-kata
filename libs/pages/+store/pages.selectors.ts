import { getIsLoading as getIsListsLoading, getLists } from '@lists';
import { getCurrentPath } from '@router';
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
  [getCurrentPath, getPages, getIsLoading, getLists, getIsListsLoading],
  (path, pages, isLoading, lists, listsLoading) => ({
    pageEntry: pages[path],
    isLoading,
    lists,
    listsLoading
  })
);
