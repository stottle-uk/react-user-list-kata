import { GoSucess, InitFirstRouteSuccess, RouterActionTypes } from '@router';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PagesService } from '../services/PagesService';
import {
  GetPageFailure,
  GetPageStart,
  GetPageSuccess,
  PagesActionTypes
} from './pages.actions';

export interface PagesEpicDependencies {
  pagesService: PagesService;
}

const watchNavigation = (
  action$: ActionsObservable<GoSucess | InitFirstRouteSuccess>
) =>
  action$.pipe(
    tap(console.log),
    ofType(RouterActionTypes.GoSucess, RouterActionTypes.InitFirstRouteSuccess),
    map(action => action.payload.route),
    map(route => route.path),
    map(path => new GetPageStart({ path }))
  );

const getPage = (
  action$: ActionsObservable<GetPageStart>,
  state$: Observable<any>,
  { pagesService }: PagesEpicDependencies
) =>
  action$.pipe(
    ofType(PagesActionTypes.GetPageStart),
    map(action => action.payload.path),
    switchMap(path =>
      pagesService.getPage(path).pipe(
        map(
          pageData =>
            new GetPageSuccess({
              pageData
            })
        ),
        catchError(error => of(new GetPageFailure({ error })))
      )
    )
  );

export const pagesEpics = { watchNavigation, getPage };
export const pagesEpicsAsArray = Object.values(pagesEpics);
