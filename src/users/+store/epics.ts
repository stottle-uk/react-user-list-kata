import { Action } from 'redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { delay, mapTo } from 'rxjs/operators';
import { GetAllUsersSuccess, UsersActionTypes } from './actions';

const getAllUsers = (action$: ActionsObservable<Action>): Observable<GetAllUsersSuccess> =>
  action$.pipe(
    ofType(UsersActionTypes.GetAllUsersStart),
    delay(1000),
    mapTo(new GetAllUsersSuccess())
  );

export const usersEpics = [getAllUsers];
