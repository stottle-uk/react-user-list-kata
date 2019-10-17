import { createSelector } from 'reselect';
import { UserListState } from '../+shared/users.store.models';
import { BaseUser } from '../../models/User';

const byUsername = (a: BaseUser, b: BaseUser) => {
  if (a.username < b.username) {
    return -1;
  }
  if (a.username > b.username) {
    return 1;
  }
  return 0;
};

const getState = (state: UserListState) => state;

export const getUsers = createSelector(
  [getState],
  state => state.users // todo: the sorting could be done here
);

export const getUsersSorted = createSelector(
  [getUsers],
  users => users.sort(byUsername) // todo: the sorting could be done here
);

export const getIsLoadingUsers = createSelector(
  [getState],
  state => state.isLoading
);

export const getUserListErrors = createSelector(
  [getState],
  state => state.errors
);
