import { createSelector } from 'reselect';
import { ListsState } from './lists.reducer';

const getState = (state: ListsState) => state;

export const getLists = createSelector(
  [getState],
  state => state.lists
);

export const getIsLoading = createSelector(
  [getState],
  state => state.isLoading
);