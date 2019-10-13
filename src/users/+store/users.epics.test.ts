import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
import { User } from '../models/User';
import { GetAllUsersStart, GetAllUsersSuccess } from './users.actions';
import { UsersDependencies, usersEpics } from './users.epics';

const dependencies: UsersDependencies = {
  usersService: { getAll: () => of([]), getById: id => of({} as User), update: user => of(user as User) }
};

const state = of({});

describe('usersEpic', () => {
  it('dispatches actions to get all users', done => {
    const action = ActionsObservable.of(new GetAllUsersStart());
    usersEpics.getAllUsers(action, state, dependencies).subscribe(outputActions => {
      expect(outputActions).toEqual(new GetAllUsersSuccess({ users: [] }));
      done();
    });
  });
});
