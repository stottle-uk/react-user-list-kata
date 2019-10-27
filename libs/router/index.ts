import { routerEpicsAsArray } from './+store/router.epics';
export * from './+store/router.actions';
export * from './+store/router.epics';
export * from './+store/router.reducer';
export * from './+store/router.selectors';
export { default as Back } from './components/Back';
export { default as Link } from './components/Link';
export { default as Router } from './components/Router';
export * from './models/router';
export * from './services/BrowserHistory';
export * from './services/RouteMatcher';

export const routerEpics = routerEpicsAsArray;
