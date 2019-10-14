import { Action } from 'redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BaseUser, IGetUsers, IUpdateUsers } from '../../models/User';
import { GetAllUsersFailure, GetAllUsersSuccess, UsersActionTypes } from './users.actions';

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

export const usersEpics = { getAllUsers };
export const usersEpicsAsArray = Object.values(usersEpics);
