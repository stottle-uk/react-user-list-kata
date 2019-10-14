import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { HttpService } from '../shared/services/HttpService';
import { profileEpicsAsArray } from '../users/+store/profile/profile.epics';
import { UsersEpicDependencies, usersEpicsAsArray } from '../users/+store/users/users.epics';
import { UsersService } from '../users/services/UsersService';

const usersService = new UsersService(
  new HttpService({
    baseUrl: 'http://localhost:3000', // todo: use ENV VARS for these values
    defaultMaxRetryCount: 10,
    defaultRetryDelay: 200
  })
);

type EpicDependencies = UsersEpicDependencies;

const dependencies: EpicDependencies = {
  usersService
};

export const rootEpic = combineEpics(...usersEpicsAsArray, ...profileEpicsAsArray);

export const epicMiddleware = createEpicMiddleware({
  dependencies
});
