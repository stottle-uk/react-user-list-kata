import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
import { BaseUser, User } from '../models/User';
import { GetAllUsersStart, GetAllUsersSuccess } from './users.actions';
import { UsersEpicDependencies, usersEpics } from './users.epics';

const userA: BaseUser = {
  id: '1',
  username: 'A Man'
};
const userB: BaseUser = {
  id: '1',
  username: 'B Man'
};

const dependencies: UsersEpicDependencies = {
  usersService: {
    getAll: () => of([userB, userA]),
    getById: id => of({} as User),
    update: user => of(user as User)
  }
};

const state = of({});

describe('usersEpic', () => {
  it('dispatches actions to get all users and sorts by username', done => {
    const action = ActionsObservable.of(new GetAllUsersStart());
    usersEpics.getAllUsers(action, state, dependencies).subscribe(outputActions => {
      expect(outputActions).toEqual(new GetAllUsersSuccess({ users: [userA, userB] }));
      done();
    });
  });
});
