import { RootState } from 'libs/store/setup/store.modal';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import {
  bufferTime,
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  take
} from 'rxjs/operators';
import { ListsService } from '../services/ListsService';
import {
  AddCompleteList,
  GetListsFailure,
  GetListsStart,
  GetListsSuccess,
  ListsActionTypes,
  ManageList,
  QueueList
} from './lists.actions';

export interface ListsEpicDependencies {
  listsService: ListsService;
}

const manageList = (action$: ActionsObservable<ManageList>) =>
  action$.pipe(
    ofType(ListsActionTypes.ManageList),
    map(action => action.payload.list),
    map(list =>
      list.items.length
        ? new AddCompleteList({ list })
        : new QueueList({ list })
    )
  );

const queueList = (
  action$: ActionsObservable<QueueList>,
  state$: Observable<RootState>
) =>
  action$.pipe(
    ofType(ListsActionTypes.QueueList),
    map(action => action.payload.list),
    switchMap(list =>
      state$.pipe(
        take(1),
        filter(state => !state.lists.listIds.includes(list.id)),
        map(() => list)
      )
    ),
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

export const listsEpics = { manageList, queueList, getLists };
export const listsEpicsAsArray = Object.values(listsEpics);
