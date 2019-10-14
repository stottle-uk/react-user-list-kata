import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { HttpService } from '../shared/services/HttpService';
import { UsersEpicDependencies } from '../users/+store/+shared/users.store.models';
import { userListEpicsAsArray } from '../users/+store/userList/userList.epics';
import { userProfileEpicsAsArray } from '../users/+store/userProfile/userProfile.epics';
import { UsersService } from '../users/services/UsersService';

const usersService = new UsersService(
  new HttpService({
    baseUrl: 'http://localhost:3000', // todo: use ENV VARS for these values
    defaultMaxRetryCount: 4,
    defaultRetryDelay: 200
  })
);

type EpicDependencies = UsersEpicDependencies;

const dependencies: EpicDependencies = {
  usersService
};

export const rootEpic = combineEpics(...userListEpicsAsArray, ...userProfileEpicsAsArray);

export const epicMiddleware = createEpicMiddleware({
  dependencies
});
