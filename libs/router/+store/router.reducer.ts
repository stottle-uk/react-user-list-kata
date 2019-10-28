import { RouterConfigRoute } from '../models/router';
import { RouterAction, RouterActionTypes } from './router.actions';

export interface RouterState {
  routes: RouterConfigRoute[];
  history: string[];
  requestedPath?: string;
  currentRoute?: RouterConfigRoute;
  routeNotFound: boolean;
}

const initialState: RouterState = {
  routes: [],
  history: [],
  routeNotFound: false
};

export const routerReducer = (
  state = initialState,
  action: RouterAction
): RouterState => {
  switch (action.type) {
    case RouterActionTypes.AddRoutesSuccess:
      return {
        ...state,
        routes: action.payload.routes
      };

    case RouterActionTypes.PopStateStart:
    case RouterActionTypes.InitFirstRouteStart:
    case RouterActionTypes.GoStart:
      return {
        ...state,
        requestedPath: action.payload.path,
        routeNotFound: false
      };

    case RouterActionTypes.PopStateSuccess:
    case RouterActionTypes.InitFirstRouteSuccess:
    case RouterActionTypes.GoSucess:
      return {
        ...state,
        currentRoute: action.payload.route,
        history: [...state.history, action.payload.route.path]
      };

    case RouterActionTypes.RouteNotFound:
      return {
        ...state,
        routeNotFound: true
      };

    case RouterActionTypes.Forward:
      return {
        ...state
      };

    default:
      return state;
  }
};
