import { Action } from 'redux';
import { RouterConfigRoute } from '../models/router';

export enum RouterActionTypes {
  InitRouterOnClient = '[Router] Init Router',
  StartPopStateListner = '[Router] Start Pop State Listner',
  AddRoutesStart = '[Router] Add Routes Start',
  AddRoutesSuccess = '[Router] Add Routes Success',
  AddRoutesFailure = '[Router] Add Routes Failure',
  InitFirstRouteStart = '[Router] Init First Route Start',
  InitFirstRouteSuccess = '[Router] Init First Route Success',
  InitFirstRouteFailure = '[Router] Init First Route Failure',
  PopStateStart = '[Router] Pop State Start',
  PopStateSuccess = '[Router] Pop State Success',
  PopStateFailure = '[Router] Pop State Failure',
  GoStart = '[Router] Go Start',
  GoSucess = '[Router] Go Success',
  GoFailure = '[Router] Go Failure',
  BackStart = '[Router] Back Start',
  BackSuccess = '[Router] Back Success',
  BackFailure = '[Router] Back Failure',
  Forward = '[Router] Forward',
  NavigateToPath = '[Router] Navigate To Path',
  NavigationCancelled = '[Router] Navigation Cancelled',
  RouteNotFound = '[Router] Path Not Found'
}

export class InitRouterOnClient implements Action {
  readonly type = RouterActionTypes.InitRouterOnClient;
}

export class StartPopStateListner implements Action {
  readonly type = RouterActionTypes.StartPopStateListner;
}

export class AddRoutesStart implements Action {
  readonly type = RouterActionTypes.AddRoutesStart;

  constructor(public payload: { routes: RouterConfigRoute<any>[] }) {}
}

export class AddRoutesSuccess implements Action {
  readonly type = RouterActionTypes.AddRoutesSuccess;

  constructor(public payload: { routes: RouterConfigRoute<any>[] }) {}
}

export class AddRoutesFailure implements Action {
  readonly type = RouterActionTypes.AddRoutesFailure;

  constructor(public payload: { error: any }) {}
}

export class InitFirstRouteStart implements Action {
  readonly type = RouterActionTypes.InitFirstRouteStart;

  constructor(public payload: { path: string }) {}
}

export class InitFirstRouteSuccess implements Action {
  readonly type = RouterActionTypes.InitFirstRouteSuccess;

  constructor(public payload: { route: RouterConfigRoute<any> }) {}
}

export class InitFirstRouteFailure implements Action {
  readonly type = RouterActionTypes.InitFirstRouteFailure;

  constructor(public payload: { error: any }) {}
}

export class PopStateStart implements Action {
  readonly type = RouterActionTypes.PopStateStart;

  constructor(public payload: { path: string }) {}
}

export class PopStateSuccess implements Action {
  readonly type = RouterActionTypes.PopStateSuccess;

  constructor(public payload: { route: RouterConfigRoute<any> }) {}
}

export class PopStateFailure implements Action {
  readonly type = RouterActionTypes.PopStateFailure;

  constructor(public payload: { error: any }) {}
}

export class GoStart implements Action {
  readonly type = RouterActionTypes.GoStart;

  constructor(public payload: { path: string }) {}
}

export class GoSucess implements Action {
  readonly type = RouterActionTypes.GoSucess;

  constructor(public payload: { route: RouterConfigRoute<any> }) {}
}

export class GoFailure implements Action {
  readonly type = RouterActionTypes.GoFailure;

  constructor(public payload: { error: any }) {}
}

export class Forward implements Action {
  readonly type = RouterActionTypes.Forward;
}

export class BackStart implements Action {
  readonly type = RouterActionTypes.BackStart;
}

export class BackSuccess implements Action {
  readonly type = RouterActionTypes.BackSuccess;
}

export class BackFailure implements Action {
  readonly type = RouterActionTypes.BackFailure;

  constructor(public payload: { error: any }) {}
}

export class NavigateToPath implements Action {
  readonly type = RouterActionTypes.NavigateToPath;

  constructor(public payload: { path: string }) {}
}

export class NavigationCancelled implements Action {
  readonly type = RouterActionTypes.NavigationCancelled;
}

export class RouteNotFound implements Action {
  readonly type = RouterActionTypes.RouteNotFound;
}

export type RouterAction =
  | InitRouterOnClient
  | StartPopStateListner
  | AddRoutesStart
  | AddRoutesSuccess
  | AddRoutesFailure
  | InitFirstRouteStart
  | InitFirstRouteSuccess
  | InitFirstRouteFailure
  | PopStateStart
  | PopStateSuccess
  | PopStateFailure
  | GoStart
  | GoSucess
  | GoFailure
  | BackStart
  | BackSuccess
  | BackFailure
  | Forward
  | NavigateToPath
  | NavigationCancelled
  | RouteNotFound;
