import { PageEntry } from '@pageEntries';
import { Action } from 'redux';

export enum PagesActionTypes {
  thing = '',
  GetPageStart = '[Pages] Get Page Start',
  GetPageSuccess = '[Pages] Get Page Success',
  GetPageFailure = '[Pages] Get Page Failure'
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

  constructor(public payload: { pageData: PageEntry }) {}
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
