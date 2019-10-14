import { Action } from 'redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UsersEpicDependencies } from '../+shared/users.store.models';
import { BaseUser } from '../../models/User';
import { GetAllUsersFailure, GetAllUsersSuccess, UserListActionTypes } from './userList.actions';

const byUsername = (a: BaseUser, b: BaseUser) => {
  if (a.username < b.username) {
    return -1;
  }
  if (a.username > b.username) {
    return 1;
  }
  return 0;
};

const getAllUsers = (
  action$: ActionsObservable<Action>,
  state$: Observable<any>,
  { usersService }: UsersEpicDependencies
): Observable<Action> =>
  action$.pipe(
    ofType(UserListActionTypes.GetAllUsersStart),
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

export const userListEpics = { getAllUsers };
export const userListEpicsAsArray = Object.values(userListEpics);
