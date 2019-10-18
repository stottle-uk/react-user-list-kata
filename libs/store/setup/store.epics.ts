import { notificationsEpics } from '@notifications';
import { UsersEpicDependencies, usersEpics, UsersService } from '@users';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { HttpService } from '../../shared/services/HttpService';

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

export const rootEpic = combineEpics(...usersEpics, ...notificationsEpics);

export const epicMiddleware = createEpicMiddleware({
  dependencies
});
