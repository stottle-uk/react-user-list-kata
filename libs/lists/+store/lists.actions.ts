import { Action } from 'redux';
import { List, Paging } from '../models/lists';

export enum ListsActionTypes {
  thing = '',
  ManageList = '[Lists] Manage List',
  AddCompleteList = '[Lists] Add Complete List',
  QueueList = '[Lists] Queue List',
  GetListsStart = '[Lists] Get Lists Start',
  GetListsSuccess = '[Lists] Get Lists Success',
  GetListsFailure = '[Lists] Get Lists Failure',
  GetListNextPageStart = '[Lists] Get List Next Page Start',
  GetListNextPageSuccess = '[Lists] Get List Next Page Success',
  GetListNextPageFailure = '[Lists] Get List Next Page Failure'
}

export class thing implements Action {
  readonly type = ListsActionTypes.thing;
}

export class ManageList implements Action {
  readonly type = ListsActionTypes.ManageList;

  constructor(public payload: { list: List }) {}
}

export class AddCompleteList implements Action {
  readonly type = ListsActionTypes.AddCompleteList;

  constructor(public payload: { list: List }) {}
}

export class QueueList implements Action {
  readonly type = ListsActionTypes.QueueList;

  constructor(public payload: { list: List }) {}
}

export class GetListsStart implements Action {
  readonly type = ListsActionTypes.GetListsStart;

  constructor(public payload: { listIds: string[] }) {}
}

export class GetListsSuccess implements Action {
  readonly type = ListsActionTypes.GetListsSuccess;

  constructor(public payload: { lists: List[] }) {}
}

export class GetListsFailure implements Action {
  readonly type = ListsActionTypes.GetListsFailure;

  constructor(public payload: { error: any }) {}
}

export class GetListNextPageStart implements Action {
  readonly type = ListsActionTypes.GetListNextPageStart;

  constructor(public payload: { paging: Paging }) {}
}

export class GetListNextPageSuccess implements Action {
  readonly type = ListsActionTypes.GetListNextPageSuccess;

  constructor(public payload: { list: List }) {}
}

export class GetListNextPageFailure implements Action {
  readonly type = ListsActionTypes.GetListNextPageFailure;

  constructor(public payload: { error: any }) {}
}

export type ListsAction =
  | thing
  | ManageList
  | AddCompleteList
  | QueueList
  | GetListsStart
  | GetListsSuccess
  | GetListsFailure
  | GetListNextPageStart
  | GetListNextPageSuccess
  | GetListNextPageFailure;
