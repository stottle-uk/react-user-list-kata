import { notificationsEpics } from '@notifications';
import { RouterEpicDependencies, routerEpics } from '@router';
import { UsersEpicDependencies, usersEpics } from '@users';
import { browserHistory, routeMatcher, usersService } from 'libs/app';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

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
