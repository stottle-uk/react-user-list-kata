import { browserHistory, pagesService, routeMatcher, usersService } from '@app';
import { notificationsEpics } from '@notifications';
import { pagesEpic } from '@pages';
import { RouterEpicDependencies, routerEpics } from '@router';
import { UsersEpicDependencies, usersEpics } from '@users';
import { PagesEpicDependencies } from 'libs/pages/+store/pages.epics';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

type EpicDependencies = UsersEpicDependencies &
  RouterEpicDependencies &
  PagesEpicDependencies;

const dependencies: EpicDependencies = {
  usersService,
  browserHistory,
  routeMatcher,
  pagesService
};

export const rootEpic = combineEpics(
  ...routerEpics,
  ...usersEpics,
  ...notificationsEpics,
  ...pagesEpic
);

export const epicMiddleware = createEpicMiddleware({
  dependencies
});
