import { Users } from '@users';
import React from 'react';
import { BrowserHistory } from '../../../libs/router/services/BrowserHistory';
import { BrowserRouter } from '../../../libs/router/services/BrowserRouter';
import { RouteMatcher } from '../../../libs/router/services/RouteMatcher';
import Home from '../layout/Home';

export const router = new BrowserRouter<any>(
  new BrowserHistory(),
  new RouteMatcher()
);
router.addRoutes([
  {
    name: 'Home',
    path: '/',
    template: Home
  },
  {
    name: 'Home',
    path: '/users',
    template: Users
  }
]);
export const routerContext = React.createContext<BrowserRouter<{}>>(router);
