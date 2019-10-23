import { Navigation } from '@config';
import { ConfigAction, ConfigActionTypes } from './config.actions';

export interface ConfigState {
  navigation?: Navigation;
}

const initialState: ConfigState = {
  navigation: undefined
};

export const configReducer = (
  state = initialState,
  action: ConfigAction
): ConfigState => {
  switch (action.type) {
    case ConfigActionTypes.AddNavigation:
      return {
        ...state,
        navigation: action.payload.navigation
      };

    default:
      return state;
  }
};
