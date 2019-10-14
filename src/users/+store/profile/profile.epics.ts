import { Action } from 'redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UsersEpicDependencies } from '../users/users.epics';
import {
  GetUserByIdFailure,
  GetUserByIdStart,
  GetUserByIdSuccess,
  HideUserProfile,
  ProfileActionTypes,
  ShowUserProfile,
  UpdateUserFailure,
  UpdateUserStart,
  UpdateUserSuccess
} from './profile.actions';

const showUser = (action$: ActionsObservable<Action>): Observable<Action> =>
  action$.pipe(
    ofType<Action, ShowUserProfile>(ProfileActionTypes.ShowUserProfile),
    map(action => action.payload.user.id),
    map(userId => new GetUserByIdStart({ userId }))
  );

const hideUser = (action$: ActionsObservable<Action>): Observable<Action> =>
  action$.pipe(
    ofType<Action, UpdateUserSuccess>(ProfileActionTypes.UpdateUserSuccess),
    map(() => new HideUserProfile())
  );

const getUserById = (
  action$: ActionsObservable<Action>,
  state$: Observable<any>,
  { usersService }: UsersEpicDependencies
): Observable<Action> =>
  action$.pipe(
    ofType<Action, GetUserByIdStart>(ProfileActionTypes.GetUserByIdStart),
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
    ofType<Action, UpdateUserStart>(ProfileActionTypes.UpdateUserStart),
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

export const profileEpics = { showUser, hideUser, getUserById, updateUser };
export const profileEpicsAsArray = Object.values(profileEpics);
