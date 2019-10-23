import {
  browserHistory,
  listsService,
  pagesService,
  routeMatcher,
  usersService
} from '@app';
import { ListsEpicDependencies, listsEpicsAsArray } from '@lists';
import { notificationsEpics } from '@notifications';
import { pagesEpics } from '@pages';
import { RouterEpicDependencies, routerEpics } from '@router';
import { UsersEpicDependencies, usersEpics } from '@users';
import { PagesEpicDependencies } from 'libs/pages/+store/pages.epics';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

type EpicDependencies = UsersEpicDependencies &
  RouterEpicDependencies &
  PagesEpicDependencies &
  ListsEpicDependencies;

const dependencies: EpicDependencies = {
  usersService,
  browserHistory,
  routeMatcher,
  pagesService,
  listsService
};

export const rootEpic = combineEpics(
  ...routerEpics,
  ...usersEpics,
  ...notificationsEpics,
  ...pagesEpics,
  ...listsEpicsAsArray
);

export const epicMiddleware = createEpicMiddleware({
  dependencies
});
