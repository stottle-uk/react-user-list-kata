import { List, ManageList } from '@lists';
import { Page } from '@pageTemplates';
import {
  GoSucess,
  InitFirstRouteSuccess,
  PopStateSuccess,
  RouterActionTypes
} from '@router';
import { RootState } from '@store';
import { ActionsObservable, ofType } from 'redux-observable';
import { from, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { PagesService } from '../services/PagesService';
import {
  CheckAndGetPageLists,
  GetPageFailure,
  GetPageLists,
  GetPageStart,
  GetPageSuccess,
  PagesActionTypes
} from './pages.actions';
import { getCurrentPage } from './pages.selectors';

export interface PagesEpicDependencies {
  pagesService: PagesService;
}

const findListsInPage = (page: Page): Observable<List> => {
  const entryLists = page.entries
    ? page.entries
        .filter(e => e.list)
        .filter(e => e.type !== 'UserEntry')
        .map(e => e.list as List)
    : [];

  const lists =
    !!page.list && +page.list.id > 0 ? [page.list, ...entryLists] : entryLists;

  return from(lists);
};

const watchNavigation = (
  action$: ActionsObservable<
    GoSucess | InitFirstRouteSuccess | PopStateSuccess
  >,
  state$: Observable<RootState>
) =>
  action$.pipe(
    ofType(
      RouterActionTypes.GoSucess,
      RouterActionTypes.InitFirstRouteSuccess,
      RouterActionTypes.PopStateSuccess
    ),
    map(action => action.payload.route),
    map(route => route.path),
    switchMap(path =>
      state$.pipe(
        take(1),
        filter(state => !state.pages.pageIds.includes(path)),
        map(() => new GetPageStart({ path }))
      )
    )
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

const queuePageLists = (
  action$: ActionsObservable<GetPageSuccess | GetPageLists>
) =>
  action$.pipe(
    ofType(PagesActionTypes.GetPageSuccess, PagesActionTypes.GetPageLists),
    map(action => action.payload.pageData),
    switchMap(pageData => findListsInPage(pageData)),
    map(list => new ManageList({ list }))
  );

const getPageLists = (
  action$: ActionsObservable<CheckAndGetPageLists>,
  state$: Observable<RootState>
) =>
  action$.pipe(
    ofType(PagesActionTypes.CheckAndGetPageLists),
    switchMap(() =>
      state$.pipe(
        take(1),
        map(state => getCurrentPage({ ...state.pages, ...state.router })),
        filter(currentPage => !!currentPage),
        map(pageData => new GetPageLists({ pageData }))
      )
    )
  );

export const pagesEpics = {
  watchNavigation,
  getPage,
  queuePageLists,
  getPageLists
};
export const pagesEpicsAsArray = Object.values(pagesEpics);
