import { Action } from 'redux';
import { Page } from '../models/page';

export enum PagesActionTypes {
  CheckAndGetPageLists = '[Pages] Check And Get Page Lists',
  GetPageLists = '[Pages] Get Page Lists',
  GetPageStart = '[Pages] Get Page Start',
  GetPageSuccess = '[Pages] Get Page Success',
  GetPageFailure = '[Pages] Get Page Failure'
}

export class CheckAndGetPageLists implements Action {
  readonly type = PagesActionTypes.CheckAndGetPageLists;
}

export class GetPageLists implements Action {
  readonly type = PagesActionTypes.GetPageLists;

  constructor(public payload: { pageData: Page }) {}
}

export class GetPageStart implements Action {
  readonly type = PagesActionTypes.GetPageStart;

  constructor(public payload: { path: string }) {}
}

export class GetPageSuccess implements Action {
  readonly type = PagesActionTypes.GetPageSuccess;

  constructor(public payload: { pageData: Page }) {}
}

export class GetPageFailure implements Action {
  readonly type = PagesActionTypes.GetPageFailure;

  constructor(public payload: { error: any }) {}
}

export type PagesAction =
  | CheckAndGetPageLists
  | GetPageLists
  | GetPageStart
  | GetPageSuccess
  | GetPageFailure;
