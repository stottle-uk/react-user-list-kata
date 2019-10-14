import { Action } from 'redux';
import { BaseUser, User } from '../../models/User';

export enum ProfileActionTypes {
  ShowUserProfile = '[Profile] Show User Profile',
  HideUserProfile = '[Profile] Hide User Profile',
  GetUserByIdStart = '[Profile] Get User By Id Start',
  GetUserByIdSuccess = '[Profile] Get User By Id Success',
  GetUserByIdFailure = '[Profile] Get User By Id Failre',
  UpdateUserStart = '[Profile] Update User Start',
  UpdateUserSuccess = '[Profile] Update User Success',
  UpdateUserFailure = '[Profile] Update User Failre'
}

export class ShowUserProfile implements Action {
  readonly type = ProfileActionTypes.ShowUserProfile;

  constructor(public payload: { user: BaseUser }) {}
}

export class HideUserProfile implements Action {
  readonly type = ProfileActionTypes.HideUserProfile;
}

export class GetUserByIdStart implements Action {
  readonly type = ProfileActionTypes.GetUserByIdStart;

  constructor(public payload: { userId: string }) {}
}

export class GetUserByIdSuccess implements Action {
  readonly type = ProfileActionTypes.GetUserByIdSuccess;

  constructor(public payload: { user: User }) {}
}

export class GetUserByIdFailure implements Action {
  readonly type = ProfileActionTypes.GetUserByIdFailure;

  constructor(public payload: { errors: any[] }) {}
}

export class UpdateUserStart implements Action {
  readonly type = ProfileActionTypes.UpdateUserStart;

  constructor(public payload: { user: User }) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = ProfileActionTypes.UpdateUserSuccess;

  constructor(public payload: { user: User }) {}
}

export class UpdateUserFailure implements Action {
  readonly type = ProfileActionTypes.UpdateUserFailure;

  constructor(public payload: { errors: any[] }) {}
}

export type ProfileAction =
  | ShowUserProfile
  | HideUserProfile
  | GetUserByIdStart
  | GetUserByIdSuccess
  | GetUserByIdFailure
  | UpdateUserStart
  | UpdateUserSuccess
  | UpdateUserFailure;
