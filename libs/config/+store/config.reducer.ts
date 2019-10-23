import { Navigation } from '@config';
import { ConfigAction, ConfigActionTypes } from './config.actions';

export interface ConfigState {
  clientSide: boolean;
  navigation?: Navigation;
}

const initialState: ConfigState = {
  clientSide: false,
  navigation: undefined
};

export const configReducer = (
  state = initialState,
  action: ConfigAction
): ConfigState => {
  switch (action.type) {
    case ConfigActionTypes.SetClientSide:
      return {
        ...state,
        clientSide: true
      };

    case ConfigActionTypes.AddNavigation:
      return {
        ...state,
        navigation: action.payload.navigation
      };

    default:
      return state;
  }
};
