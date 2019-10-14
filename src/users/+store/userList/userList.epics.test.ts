import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
import { UsersEpicDependencies } from '../+shared/users.store.models';
import { BaseUser, User } from '../../models/User';
import { GetAllUsersStart, GetAllUsersSuccess } from './userList.actions';
import { userListEpics } from './userList.epics';

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
    userListEpics.getAllUsers(action, state, dependencies).subscribe(outputActions => {
      expect(outputActions).toEqual(new GetAllUsersSuccess({ users: [userA, userB] }));
      done();
    });
  });
});
