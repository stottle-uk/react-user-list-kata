import { Action } from 'redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UsersService } from '../services/UsersService';
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

export interface UsersDependencies {
  usersService: UsersService;
}

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
  { usersService }: UsersDependencies
): Observable<Action> =>
  action$.pipe(
    ofType(UsersActionTypes.GetAllUsersStart),
    switchMap(() =>
      usersService.getAll().pipe(
        map(
          users =>
            new GetAllUsersSuccess({
              users
            })
        ),
        catchError(error => of(new GetAllUsersFailure({ error })))
      )
    )
  );

const getUserById = (
  action$: ActionsObservable<Action>,
  state$: Observable<any>,
  { usersService }: UsersDependencies
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
        catchError(error => of(new GetUserByIdFailure({ error })))
      )
    )
  );

const updateUser = (
  action$: ActionsObservable<Action>,
  state$: Observable<any>,
  { usersService }: UsersDependencies
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
        catchError(error => of(new UpdateUserFailure({ error })))
      )
    )
  );

export const usersEpics = [showUser, hideUser, getAllUsers, getUserById, updateUser];
