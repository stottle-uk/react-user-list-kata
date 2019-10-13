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
  UsersActionTypes
} from './actions';

export interface UsersDependencies {
  usersService: UsersService;
}

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
        catchError(error => of(new GetAllUsersFailure(error)))
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
        catchError(error => of(new GetUserByIdFailure(error)))
      )
    )
  );

const updateUser = (
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
        catchError(error => of(new GetUserByIdFailure(error)))
      )
    )
  );

export const usersEpics = [getAllUsers, getUserById, updateUser];
