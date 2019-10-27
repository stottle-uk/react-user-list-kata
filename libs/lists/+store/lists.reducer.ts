import { Item, List } from '../models/lists';
import { ListsAction, ListsActionTypes } from './lists.actions';

export interface ListsState {
  listIds: string[];
  lists: Dictionary<List>;
  isLoading: boolean;
  isLoaded: boolean;
  error?: any;
}

const initialState: ListsState = {
  listIds: [],
  lists: {},
  isLoading: false,
  isLoaded: false
};

export const listsReducer = (
  state = initialState,
  action: ListsAction
): ListsState => {
  switch (action.type) {
    case ListsActionTypes.AddCompleteList:
      return {
        ...state,
        listIds: [...state.listIds, action.payload.list.id],
        lists: {
          ...state.lists,
          [action.payload.list.id]: action.payload.list
        }
      };

    case ListsActionTypes.GetListNextPageStart:
    case ListsActionTypes.GetListsStart:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: undefined
      };

    case ListsActionTypes.GetListsSuccess:
      return {
        ...state,
        ...updateLists(state.lists, ...action.payload.lists),
        isLoading: false,
        isLoaded: true
      };

    case ListsActionTypes.GetListNextPageSuccess:
      return {
        ...state,
        ...updateLists(state.lists, action.payload.list),
        isLoading: false,
        isLoaded: true
      };

    case ListsActionTypes.GetListNextPageFailure:
    case ListsActionTypes.GetListsFailure:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error
      };

    default:
      return state;
  }
};

function updateLists(cachedLists: Dictionary<List>, ...lists: List[]) {
  const updatedLists = lists.reduce(
    (cache, currentList) => ({
      ...cache,
      [currentList.id]: {
        ...cache[currentList.id],
        ...currentList,
        items: concatAndRemoveDuplicates(cache, currentList)
      }
    }),
    cachedLists
  );
  const updatedListIds = Object.keys(updatedLists);
  return { listIds: updatedListIds, lists: updatedLists };
}

function concatAndRemoveDuplicates(
  cachedLists: Dictionary<List>,
  list: List
): Item[] {
  const cachedItems = cachedLists[list.id] ? cachedLists[list.id].items : [];
  return [...cachedItems, ...list.items].filter(
    (item, i, arr) => arr.findIndex(a => item.id === a.id) === i
  );
}
