import { Action } from 'redux';
import { BaseUser, User } from '../models/User';

export enum UsersActionTypes {
  ShowUserProfile = '[Users] Show User Profile',
  HideUserProfile = '[Users] Hide User Profile',
  GetAllUsersStart = '[Users] Get All Users Start',
  GetAllUsersSuccess = '[Users] Get All Users Success',
  GetAllUsersFailure = '[Users] Get All Users Failre',
  GetUserByIdStart = '[Users] Get User By Id Start',
  GetUserByIdSuccess = '[Users] Get User By Id Success',
  GetUserByIdFailure = '[Users] Get User By Id Failre',
  UpdateUserStart = '[Users] Update User Start',
  UpdateUserSuccess = '[Users] Update User Success',
  UpdateUserFailure = '[Users] Update User Failre'
}

export class ShowUserProfile implements Action {
  readonly type = UsersActionTypes.ShowUserProfile;

  constructor(public payload: { user: BaseUser }) {}
}

export class HideUserProfile implements Action {
  readonly type = UsersActionTypes.HideUserProfile;
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

  constructor(public payload: { errors: any[] }) {}
}

export class GetUserByIdStart implements Action {
  readonly type = UsersActionTypes.GetUserByIdStart;

  constructor(public payload: { userId: string }) {}
}

export class GetUserByIdSuccess implements Action {
  readonly type = UsersActionTypes.GetUserByIdSuccess;

  constructor(public payload: { user: User }) {}
}

export class GetUserByIdFailure implements Action {
  readonly type = UsersActionTypes.GetUserByIdFailure;

  constructor(public payload: { errors: any[] }) {}
}

export class UpdateUserStart implements Action {
  readonly type = UsersActionTypes.UpdateUserStart;

  constructor(public payload: { user: User }) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UsersActionTypes.UpdateUserSuccess;

  constructor(public payload: { user: User }) {}
}

export class UpdateUserFailure implements Action {
  readonly type = UsersActionTypes.UpdateUserFailure;

  constructor(public payload: { errors: any[] }) {}
}

export type UsersAction =
  | ShowUserProfile
  | HideUserProfile
  | GetAllUsersStart
  | GetAllUsersSuccess
  | GetAllUsersFailure
  | GetUserByIdStart
  | GetUserByIdSuccess
  | GetUserByIdFailure
  | UpdateUserStart
  | UpdateUserSuccess
  | UpdateUserFailure;
