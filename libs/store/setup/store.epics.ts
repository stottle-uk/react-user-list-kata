import { notificationsEpics } from '@notifications';
import { UsersEpicDependencies, usersEpics, UsersService } from '@users';
import {
  RouterEpicDependencies,
  routerEpicsAsArray
} from 'libs/router/+store/router.epics';
import { BrowserHistory } from 'libs/router/services/BrowserHistory';
import { RouteMatcher } from 'libs/router/services/RouteMatcher';
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
  ...routerEpicsAsArray,
  ...usersEpics,
  ...notificationsEpics
);

export const epicMiddleware = createEpicMiddleware({
  dependencies
});
