import { getIsClientSide } from '@config';
import { RootState } from 'libs/store/setup/store.modal';
import { ActionsObservable, ofType } from 'redux-observable';
import { iif, Observable, of } from 'rxjs';
import {
  bufferTime,
  catchError,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  switchMap,
  take
} from 'rxjs/operators';
import { ListsService } from '../services/ListsService';
import {
  AddCompleteList,
  GetListNextPageFailure,
  GetListNextPageStart,
  GetListNextPageSuccess,
  GetListsFailure,
  GetListsStart,
  GetListsSuccess,
  ListsActionTypes,
  ManageList,
  QueueList
} from './lists.actions';
import { getListIds } from './lists.selectors';

export interface ListsEpicDependencies {
  listsService: ListsService;
}

const manageList = (
  action$: ActionsObservable<ManageList>,
  state$: Observable<RootState>
) =>
  action$.pipe(
    ofType(ListsActionTypes.ManageList),
    map(action => action.payload.list),
    switchMap(list =>
      state$.pipe(
        take(1),
        map(state => getListIds(state.lists).includes(list.id)),
        filter(inCache => !inCache),
        switchMap(() =>
          iif(
            () => !!list.items.length,
            of(new AddCompleteList({ list })),
            state$.pipe(
              take(1),
              filter(state => getIsClientSide(state.config)),
              map(() => new QueueList({ list }))
            )
          )
        )
      )
    )
  );

const queueList = (action$: ActionsObservable<QueueList>) =>
  action$.pipe(
    ofType(ListsActionTypes.QueueList),
    map(action => action.payload.list),
    bufferTime(200, null, 5),
    filter(lists => !!lists.length),
    map(lists => lists.map(l => l.id)),
    map(listIds => new GetListsStart({ listIds }))
  );

const getLists = (
  action$: ActionsObservable<GetListsStart>,
  state$: Observable<any>,
  { listsService }: ListsEpicDependencies
) =>
  action$.pipe(
    ofType(ListsActionTypes.GetListsStart),
    map(action => action.payload.listIds),
    mergeMap(listIds =>
      listsService.getLists(listIds).pipe(
        map(
          lists =>
            new GetListsSuccess({
              lists
            })
        ),
        catchError(error => of(new GetListsFailure({ error })))
      )
    )
  );

const getMoreListItems = (
  action$: ActionsObservable<GetListNextPageStart>,
  state$: Observable<any>,
  { listsService }: ListsEpicDependencies
) =>
  action$.pipe(
    ofType(ListsActionTypes.GetListNextPageStart),
    map(action => action.payload.paging.next),
    distinctUntilChanged(),
    map(next => `${next}`),
    mergeMap(next =>
      listsService.getNextPage(next).pipe(
        map(
          list =>
            new GetListNextPageSuccess({
              list
            })
        ),
        catchError(error => of(new GetListNextPageFailure({ error })))
      )
    )
  );

export const listsEpics = { getMoreListItems, manageList, queueList, getLists };
export const listsEpicsAsArray = Object.values(listsEpics);
