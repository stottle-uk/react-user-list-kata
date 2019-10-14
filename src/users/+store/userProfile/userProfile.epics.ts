import { Action } from 'redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UsersEpicDependencies } from '../+shared/users.store.models';
import {
  GetUserByIdFailure,
  GetUserByIdStart,
  GetUserByIdSuccess,
  HideUserProfile,
  ShowUserProfile,
  UpdateUserFailure,
  UpdateUserStart,
  UpdateUserSuccess,
  UserProfileActionTypes
} from './userProfile.actions';

const showUser = (action$: ActionsObservable<Action>): Observable<Action> =>
  action$.pipe(
    ofType<Action, ShowUserProfile>(UserProfileActionTypes.ShowUserProfile),
    map(action => action.payload.user.id),
    map(userId => new GetUserByIdStart({ userId }))
  );

const hideUser = (action$: ActionsObservable<Action>): Observable<Action> =>
  action$.pipe(
    ofType<Action, UpdateUserSuccess>(UserProfileActionTypes.UpdateUserSuccess),
    map(() => new HideUserProfile())
  );

const getUserById = (
  action$: ActionsObservable<Action>,
  state$: Observable<any>,
  { usersService }: UsersEpicDependencies
): Observable<Action> =>
  action$.pipe(
    ofType<Action, GetUserByIdStart>(UserProfileActionTypes.GetUserByIdStart),
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
    ofType<Action, UpdateUserStart>(UserProfileActionTypes.UpdateUserStart),
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

export const userProfileEpics = { showUser, hideUser, getUserById, updateUser };
export const userProfileEpicsAsArray = Object.values(userProfileEpics);
