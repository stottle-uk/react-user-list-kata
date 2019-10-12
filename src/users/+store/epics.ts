import { Action } from 'redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UsersService } from '../services/UsersService';
import { GetAllUsersFailure, GetAllUsersSuccess, UsersActionTypes } from './actions';

interface Dependencies {
  usersService: UsersService;
}

const getAllUsers = (
  action$: ActionsObservable<Action>,
  state$: Observable<any>,
  { usersService }: Dependencies
): Observable<GetAllUsersSuccess | GetAllUsersFailure> =>
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

export const usersEpics = [getAllUsers];
