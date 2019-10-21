import { routerEpicsAsArray } from './+store/router.epics';
export * from './+store/router.actions';
export * from './+store/router.epics';
export * from './+store/router.reducer';
export { default as Link } from './components/Link';
export { default as Router } from './components/Router';
export * from './services/BrowserHistory';
export * from './services/RouteMatcher';
export * from './types/router.d';

export const routerEpics = routerEpicsAsArray;
