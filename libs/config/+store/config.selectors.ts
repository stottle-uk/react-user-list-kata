import { createSelector } from 'reselect';
import { ConfigState } from './config.reducer';

const getState = (state: ConfigState) => state;

export const getNavigation = createSelector(
  [getState],
  state => state.navigation
);
