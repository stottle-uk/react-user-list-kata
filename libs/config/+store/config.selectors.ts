import { createSelector } from 'reselect';
import { ConfigState } from './config.reducer';

const getState = (state: ConfigState) => state;

export const getNavigation = createSelector(
  [getState],
  state => state.navigation
);

export const getIsClientSide = createSelector(
  [getState],
  state => state.clientSide
);

export const getHeader = createSelector(
  [getNavigation],
  navigation => (navigation ? navigation.header : [])
);
