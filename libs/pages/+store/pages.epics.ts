import { List, ManageList } from '@lists';
import { PageEntry } from '@pageEntries';
import { GoSucess, InitFirstRouteSuccess, RouterActionTypes } from '@router';
import { ActionsObservable, ofType } from 'redux-observable';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
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

const findListsInPage = (pageEntry: PageEntry): List[] => {
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

  return lists;
};

const watchNavigation = (
  action$: ActionsObservable<GoSucess | InitFirstRouteSuccess>
) =>
  action$.pipe(
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

const queuePageLists = (action$: ActionsObservable<GetPageSuccess>) =>
  action$.pipe(
    ofType(PagesActionTypes.GetPageSuccess),
    map(action => action.payload.pageData),
    switchMap(pageData => from(findListsInPage(pageData))),
    map(list => new ManageList({ list }))
  );

export const pagesEpics = { watchNavigation, getPage, queuePageLists };
export const pagesEpicsAsArray = Object.values(pagesEpics);
