import { RootState } from 'libs/store/setup/store.modal';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { BrowserHistory } from '../services/BrowserHistory';
import { RouteMatcher } from '../services/RouteMatcher';
import {
  AddRoutesFailure,
  AddRoutesStart,
  AddRoutesSuccess,
  Back,
  GoFailure,
  GoStart,
  GoSucess,
  InitFirstRouteFailure,
  InitFirstRouteStart,
  InitFirstRouteSuccess,
  NavigateToPath,
  NavigationCancelled,
  PopStateFailure,
  PopStateStart,
  PopStateSuccess,
  RouteNotFound,
  RouterActionTypes,
  StartPopStateListner
} from './router.actions';

export interface RouterEpicDependencies {
  browserHistory: BrowserHistory;
  routeMatcher: RouteMatcher<any>;
}

const addRoutes = (action$: ActionsObservable<AddRoutesStart>) =>
  action$.pipe(
    ofType(RouterActionTypes.AddRoutesStart),
    map(action => action.payload.routes),
    // todo: Validate routes here
    map(routes => new AddRoutesSuccess({ routes })),
    catchError(error => of(new AddRoutesFailure({ error })))
  );

const initRouter = (
  action$: ActionsObservable<AddRoutesSuccess>,
  state$: Observable<RootState>,
  { browserHistory }: RouterEpicDependencies
) =>
  action$.pipe(
    ofType(RouterActionTypes.AddRoutesSuccess),
    map(() => browserHistory.getLocationPath()),
    switchMap(path => [
      new StartPopStateListner(),
      new InitFirstRouteStart({ path })
    ])
  );

const initFirstRoute = (
  action$: ActionsObservable<InitFirstRouteStart>,
  state$: Observable<RootState>,
  { routeMatcher }: RouterEpicDependencies
) =>
  action$.pipe(
    ofType(RouterActionTypes.InitFirstRouteStart),
    map(action => action.payload.path),
    switchMap(path =>
      state$.pipe(
        take(1),
        map(state => routeMatcher.matchRoute(path, state.router.routes)),
        map(route =>
          route ? new InitFirstRouteSuccess({ route }) : new RouteNotFound()
        ),
        catchError(error => of(new InitFirstRouteFailure({ error })))
      )
    )
  );

const startPopStateListner = (
  action$: ActionsObservable<StartPopStateListner>,
  state$: Observable<RootState>,
  { browserHistory }: RouterEpicDependencies
) =>
  action$.pipe(
    ofType(RouterActionTypes.StartPopStateListner),
    switchMap(() =>
      browserHistory.onPopState$.pipe(map(path => new PopStateStart({ path })))
    )
  );

const popState = (
  action$: ActionsObservable<PopStateStart>,
  state$: Observable<RootState>,
  { routeMatcher }: RouterEpicDependencies
) =>
  action$.pipe(
    ofType(RouterActionTypes.PopStateStart),
    map(action => action.payload.path),
    switchMap(path =>
      state$.pipe(
        take(1),
        map(state => routeMatcher.matchRoute(path, state.router.routes)),
        map(route =>
          route ? new PopStateSuccess({ route }) : new RouteNotFound()
        ),
        catchError(error => of(new PopStateFailure({ error })))
      )
    )
  );

const go = (
  action$: ActionsObservable<GoStart>,
  state$: Observable<RootState>,
  { routeMatcher, browserHistory }: RouterEpicDependencies
) =>
  action$.pipe(
    ofType(RouterActionTypes.GoStart),
    map(action => action.payload.path),
    switchMap(path =>
      state$.pipe(
        take(1),
        map(state => routeMatcher.matchRoute(path, state.router.routes)),
        map(route => {
          if (!!route) {
            browserHistory.go(route.path);
            return new GoSucess({ route });
          }
          return new RouteNotFound();
        }),

        catchError(error => of(new GoFailure({ error })))
      )
    )
  );

const navigateToPath = (
  action$: ActionsObservable<NavigateToPath>,
  state$: Observable<any>,
  { browserHistory }: RouterEpicDependencies
) =>
  action$.pipe(
    ofType(RouterActionTypes.NavigateToPath),
    map(action => action.payload.path),
    map(path =>
      path !== browserHistory.getLocationPath()
        ? new GoStart({ path })
        : new NavigationCancelled()
    )
  );

const back = (
  action$: ActionsObservable<Back>,
  state$: Observable<any>,
  { browserHistory, routeMatcher }: RouterEpicDependencies
) =>
  action$.pipe(
    ofType(RouterActionTypes.Back),
    tap(() => browserHistory.back()),
    map(() => browserHistory.getLocationPath()),
    switchMap(path =>
      state$.pipe(
        take(1),
        map(state => routeMatcher.matchRoute(path, state.router.routes)),
        map(route => (route ? new GoSucess({ route }) : new RouteNotFound()))
      )
    )
  );

export const routerEpics = {
  addRoutes,
  initRouter,
  initFirstRoute,
  startPopStateListner,
  popState,
  navigateToUrl: navigateToPath,
  go,
  back
};
export const routerEpicsAsArray = Object.values(routerEpics);
