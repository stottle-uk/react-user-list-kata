import { createSelector } from 'reselect';
import { UserListState } from '../+shared/users.store.models';

const getState = (state: UserListState) => state;

export const getUsers = createSelector(
  [getState],
  state => state.users // todo: the sorting could be done here
);

export const getIsLoadingUsers = createSelector(
  [getState],
  state => state.isLoading
);

export const getUserListErrors = createSelector(
  [getState],
  state => state.errors
);
