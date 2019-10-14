import { createSelector } from 'reselect';
import { UserProfileState } from './userProfile.reducer';

const getState = (state: UserProfileState) => state;

export const getSelectedUser = createSelector(
  [getState],
  state => state.selectedUser
);

export const getIsSubmitted = createSelector(
  [getState],
  state => state.isSubmitted
);

export const getErrors = createSelector(
  [getState],
  state => state.errors
);
