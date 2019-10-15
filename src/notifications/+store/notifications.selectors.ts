import { createSelector } from 'reselect';
import { NotificationsState } from './notifications.reducer';

const getState = (state: NotificationsState) => state;

export const getMessage = createSelector(
  [getState],
  state => state.message // todo: the sorting could be done here
);

export const getIsVisible = createSelector(
  [getState],
  state => state.isVisible
);
