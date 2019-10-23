import { List, ManageList } from '@lists';
import { PageEntry } from '@pageEntries';
import { GoSucess, InitFirstRouteSuccess, RouterActionTypes } from '@router';
import { RootState } from 'libs/store/setup/store.modal';
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
import { getPageData } from './pages.selectors';

export interface PagesEpicDependencies {
  pagesService: PagesService;
}

const findListsInPage = (pageEntry: PageEntry): Observable<List> => {
  const entryLists = pageEntry.entries
    ? pageEntry.entries
        .filter(e => e.list)
        .filter(e => e.type !== 'UserEntry')
        .map(e => e.list)
    : [];

  const lists =
    !!pageEntry.list && +pageEntry.list.id > 0
      ? [pageEntry.list, ...entryLists]
      : entryLists;

  return from(lists);
};

const watchNavigation = (
  action$: ActionsObservable<GoSucess | InitFirstRouteSuccess>,
  state$: Observable<RootState>
) =>
  action$.pipe(
    ofType(RouterActionTypes.GoSucess, RouterActionTypes.InitFirstRouteSuccess),
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
        map(state => getPageData({ ...state.pages, ...state.router })),
        filter(pageData => pageData && !!pageData.pageEntry),
        map(pageData => pageData && pageData.pageEntry),
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
