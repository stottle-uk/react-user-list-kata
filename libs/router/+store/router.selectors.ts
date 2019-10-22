import { createSelector } from 'reselect';
import { RouterState } from './router.reducer';

const getState = (state: RouterState) => state;

export const getHistory = createSelector(
  [getState],
  state => state.history
);

export const getCurrentRoute = createSelector(
  [getState],
  state => state.currentRoute
);

export const getCurrentPath = createSelector(
  [getCurrentRoute],
  route => (route ? route.path : '/')
);
