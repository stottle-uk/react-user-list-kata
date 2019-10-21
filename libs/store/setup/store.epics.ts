import { notificationsEpics } from '@notifications';
import {
  BrowserHistory,
  RouteMatcher,
  RouterEpicDependencies,
  routerEpics
} from '@router';
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

const browserHistory = new BrowserHistory();
const routeMatcher = new RouteMatcher();

type EpicDependencies = UsersEpicDependencies & RouterEpicDependencies;

const dependencies: EpicDependencies = {
  usersService,
  browserHistory,
  routeMatcher
};

export const rootEpic = combineEpics(
  ...routerEpics,
  ...usersEpics,
  ...notificationsEpics
);

export const epicMiddleware = createEpicMiddleware({
  dependencies
});
