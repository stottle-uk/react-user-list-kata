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
  ShowUserProfile,
  UsersActionTypes
} from './actions';

export interface UsersDependencies {
  usersService: UsersService;
}

const showUser = (action$: ActionsObservable<Action>): Observable<Action> =>
  action$.pipe(
    ofType<Action, ShowUserProfile>(UsersActionTypes.ShowUserProfile),
    map(action => action.payload.user.id),
    map(userId => new GetUserByIdStart({ userId }))
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

// const updateUser = (
//   action$: ActionsObservable<Action>,
//   state$: Observable<any>,
//   { usersService }: UsersDependencies
// ): Observable<Action> =>
//   action$.pipe(
//     ofType<Action, GetUserByIdStart>(UsersActionTypes.GetUserByIdStart),
//     switchMap(action =>
//       usersService.getById(action.payload.userId).pipe(
//         map(
//           user =>
//             new GetUserByIdSuccess({
//               user
//             })
//         ),
//         catchError(error => of(new GetUserByIdFailure(error)))
//       )
//     )
//   );

export const usersEpics = [showUser, getAllUsers, getUserById];
