import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { HttpService } from '../shared/services/HttpService';
import { UsersDependencies, usersEpics } from '../users/+store/users.epics';
import { UsersService } from '../users/services/UsersService';

const usersService = new UsersService(
  new HttpService({
    baseUrl: 'http://localhost:3000', // todo: use ENV VARS for these values
    defaultMaxRetryCount: 10,
    defaultRetryDelay: 200
  })
);

type Dependencies = UsersDependencies;

const dependencies: Dependencies = {
  usersService
};

export const rootEpic = combineEpics(...usersEpics);

export const epicMiddleware = createEpicMiddleware({
  dependencies
});
