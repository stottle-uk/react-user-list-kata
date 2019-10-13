import { Action } from 'redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BaseUser, IGetUsers, IUpdateUsers } from '../models/User';
import {
  GetAllUsersFailure,
  GetAllUsersSuccess,
  GetUserByIdFailure,
  GetUserByIdStart,
  GetUserByIdSuccess,
  HideUserProfile,
  ShowUserProfile,
  UpdateUserFailure,
  UpdateUserStart,
  UpdateUserSuccess,
  UsersActionTypes
} from './users.actions';

export interface UsersEpicDependencies {
  usersService: IGetUsers & IUpdateUsers;
}

const byUsername = (a: BaseUser, b: BaseUser) => {
  if (a.username < b.username) {
    return -1;
  }
  if (a.username > b.username) {
    return 1;
  }
  return 0;
};

const showUser = (action$: ActionsObservable<Action>): Observable<Action> =>
  action$.pipe(
    ofType<Action, ShowUserProfile>(UsersActionTypes.ShowUserProfile),
    map(action => action.payload.user.id),
    map(userId => new GetUserByIdStart({ userId }))
  );

const hideUser = (action$: ActionsObservable<Action>): Observable<Action> =>
  action$.pipe(
    ofType<Action, UpdateUserSuccess>(UsersActionTypes.UpdateUserSuccess),
    map(() => new HideUserProfile())
  );

const getAllUsers = (
  action$: ActionsObservable<Action>,
  state$: Observable<any>,
  { usersService }: UsersEpicDependencies
): Observable<Action> =>
  action$.pipe(
    ofType(UsersActionTypes.GetAllUsersStart),
    switchMap(() =>
      usersService.getAll().pipe(
        map(users => users.sort(byUsername)), // FYI, sorting here
        map(
          users =>
            new GetAllUsersSuccess({
              users
            })
        ),
        catchError(errors => of(new GetAllUsersFailure({ errors })))
      )
    )
  );

const getUserById = (
  action$: ActionsObservable<Action>,
  state$: Observable<any>,
  { usersService }: UsersEpicDependencies
): Observable<Action> =>
  action$.pipe(
    ofType<Action, GetUserByIdStart>(UsersActionTypes.GetUserByIdStart),
    switchMap(action =>
      usersService.getById(action.payload.userId).pipe(
        map(
          user =>
            new GetUserByIdSuccess({
              user
            })
        ),
        catchError(errors => of(new GetUserByIdFailure({ errors })))
      )
    )
  );

const updateUser = (
  action$: ActionsObservable<Action>,
  state$: Observable<any>,
  { usersService }: UsersEpicDependencies
): Observable<Action> =>
  action$.pipe(
    ofType<Action, UpdateUserStart>(UsersActionTypes.UpdateUserStart),
    switchMap(action =>
      usersService.update(action.payload.user).pipe(
        map(
          user =>
            new UpdateUserSuccess({
              user
            })
        ),
        catchError(errors => of(new UpdateUserFailure({ errors })))
      )
    )
  );

export const usersEpics = { showUser, hideUser, getAllUsers, getUserById, updateUser };
export const usersEpicsAsArray = Object.values(usersEpics);
