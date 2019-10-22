import { Action } from 'redux';

export enum PagesActionTypes {
  thing = '',
  GetPageStart = '[UserList] Get Page Start',
  GetPageSuccess = '[UserList] Get Page Success',
  GetPageFailure = '[UserList] Get Page Failure'
}

export class thing implements Action {
  readonly type = PagesActionTypes.thing;
}

export class GetPageStart implements Action {
  readonly type = PagesActionTypes.GetPageStart;

  constructor(public payload: { path: string }) {}
}

export class GetPageSuccess implements Action {
  readonly type = PagesActionTypes.GetPageSuccess;

  constructor(public payload: { pageData: any }) {}
}

export class GetPageFailure implements Action {
  readonly type = PagesActionTypes.GetPageFailure;

  constructor(public payload: { error: any }) {}
}

export type PagesAction =
  | thing
  | GetPageStart
  | GetPageSuccess
  | GetPageFailure;
