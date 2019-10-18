import { Action } from 'redux';
import { BaseUser, User } from '../../models/User';

export enum UserProfileActionTypes {
  ShowUserProfile = '[UserProfile] Show User Profile',
  HideUserProfile = '[UserProfile] Hide User Profile',
  GetUserByIdStart = '[UserProfile] Get User By Id Start',
  GetUserByIdSuccess = '[UserProfile] Get User By Id Success',
  GetUserByIdFailure = '[UserProfile] Get User By Id Failre',
  UpdateUserStart = '[UserProfile] Update User Start',
  UpdateUserSuccess = '[UserProfile] Update User Success',
  UpdateUserFailure = '[UserProfile] Update User Failre'
}

export class ShowUserProfile implements Action {
  readonly type = UserProfileActionTypes.ShowUserProfile;

  constructor(public payload: { user: BaseUser }) {}
}

export class HideUserProfile implements Action {
  readonly type = UserProfileActionTypes.HideUserProfile;
}

export class GetUserByIdStart implements Action {
  readonly type = UserProfileActionTypes.GetUserByIdStart;

  constructor(public payload: { userId: string }) {}
}

export class GetUserByIdSuccess implements Action {
  readonly type = UserProfileActionTypes.GetUserByIdSuccess;

  constructor(public payload: { user: User }) {}
}

export class GetUserByIdFailure implements Action {
  readonly type = UserProfileActionTypes.GetUserByIdFailure;

  constructor(public payload: { errors: any[] }) {}
}

export class UpdateUserStart implements Action {
  readonly type = UserProfileActionTypes.UpdateUserStart;

  constructor(public payload: { user: User }) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UserProfileActionTypes.UpdateUserSuccess;

  constructor(public payload: { user: User }) {}
}

export class UpdateUserFailure implements Action {
  readonly type = UserProfileActionTypes.UpdateUserFailure;

  constructor(public payload: { errors: any[] }) {}
}

export type UserProfileAction =
  | ShowUserProfile
  | HideUserProfile
  | GetUserByIdStart
  | GetUserByIdSuccess
  | GetUserByIdFailure
  | UpdateUserStart
  | UpdateUserSuccess
  | UpdateUserFailure;
