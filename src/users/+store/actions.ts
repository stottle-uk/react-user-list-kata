import { Action } from 'redux';
import { BaseUser } from '../models/User';

export enum UsersActionTypes {
  GetAllUsersStart = '[Users] Get All Users Start',
  GetAllUsersSuccess = '[Users] Get All Users Success',
  GetAllUsersFailure = '[Users] Get All Users Failre'
}

export class GetAllUsersStart implements Action {
  readonly type = UsersActionTypes.GetAllUsersStart;
}

export class GetAllUsersSuccess implements Action {
  readonly type = UsersActionTypes.GetAllUsersSuccess;

  constructor(public payload: { users: BaseUser[] }) {}
}

export class GetAllUsersFailure implements Action {
  readonly type = UsersActionTypes.GetAllUsersFailure;

  constructor(public payload: { error: any }) {}
}

export type UsersAction = GetAllUsersStart | GetAllUsersSuccess | GetAllUsersFailure;
