import { createSelector } from 'reselect';
import { PagesState } from './pages.reducer';

const getState = (state: PagesState) => state;

export const getPageData = createSelector(
  [getState],
  state => ({
    pageEntry: state.pageData,
    loading: state.isLoading,
    lists: {},
    listsLoading: false
  })
);

export const getIsLoading = createSelector(
  [getState],
  state => state.isLoading
);
