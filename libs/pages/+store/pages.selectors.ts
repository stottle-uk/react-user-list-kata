import { createSelector } from 'reselect';
import { PagesState } from './pages.reducer';

const getState = (state: PagesState) => state;

export const getPageData = createSelector(
  [getState],
  state => state.pageData // todo: the sorting could be done here
);

export const getIsLoading = createSelector(
  [getState],
  state => state.isLoading
);
