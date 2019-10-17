import { createSelector } from 'reselect';
import { UserProfileState } from '../+shared/users.store.models';

const getState = (state: UserProfileState) => state;

export const getSelectedUser = createSelector(
  [getState],
  state => state.selectedUser
);

export const getIsSubmitted = createSelector(
  [getState],
  state => state.isSubmitted
);

export const getShowUserProfileModal = createSelector(
  [getState],
  state => state.showUserProfileModal
);

export const getIsLoaded = createSelector(
  [getState],
  state => state.isLoaded
);

export const getUserProfileErrors = createSelector(
  [getState],
  state => state.errors
);
