import { Action } from 'redux';
import { BaseUser } from '../../models/User';

export enum UserListActionTypes {
  GetAllUsersStart = '[UserList] Get All Users Start',
  GetAllUsersSuccess = '[UserList] Get All Users Success',
  GetAllUsersFailure = '[UserList] Get All Users Failure'
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
