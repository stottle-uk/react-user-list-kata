import { createSelector } from 'reselect';
import { UserListState } from './userList.reducer';

const getState = (state: UserListState) => state;

export const getUsers = createSelector(
  [getState],
  state => state.users // todo: the sorting could be done here
);

export const getIsLoadingUsers = createSelector(
  [getState],
  state => state.isLoading
);
