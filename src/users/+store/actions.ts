import { Action } from 'redux';

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
}

export class GetAllUsersFailure implements Action {
  readonly type = UsersActionTypes.GetAllUsersFailure;
}

export type UsersAction = GetAllUsersStart | GetAllUsersSuccess | GetAllUsersFailure;
