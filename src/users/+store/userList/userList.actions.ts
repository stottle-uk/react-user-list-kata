import { Action } from 'redux';
import { BaseUser } from '../../models/User';

export enum UserListActionTypes {
  GetAllUsersStart = '[Users] Get All Users Start',
  GetAllUsersSuccess = '[Users] Get All Users Success',
  GetAllUsersFailure = '[Users] Get All Users Failre'
}

export class GetAllUsersStart implements Action {
  readonly type = UserListActionTypes.GetAllUsersStart;
}

export class GetAllUsersSuccess implements Action {
  readonly type = UserListActionTypes.GetAllUsersSuccess;

  constructor(public payload: { users: BaseUser[] }) {}
}

export class GetAllUsersFailure implements Action {
  readonly type = UserListActionTypes.GetAllUsersFailure;

  constructor(public payload: { errors: any[] }) {}
}

export type UserListAction = GetAllUsersStart | GetAllUsersSuccess | GetAllUsersFailure;
