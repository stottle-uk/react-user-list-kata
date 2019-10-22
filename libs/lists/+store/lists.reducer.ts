import { List } from '../models/lists';
import { ListsAction, ListsActionTypes } from './lists.actions';

export interface ListsState {
  listIds: string[];
  lists: { [key: string]: List };
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

    case ListsActionTypes.GetListsStart:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: undefined
      };

    case ListsActionTypes.GetListsSuccess:
      const listsAsDictionary = action.payload.lists.reduce(
        (prev, curr) => ({
          ...prev,
          [curr.id]: curr
        }),
        {}
      );
      const listIds = action.payload.lists.map(list => list.id);
      return {
        ...state,
        listIds: [...state.listIds, ...listIds],
        lists: { ...state.lists, ...listsAsDictionary },
        isLoading: false,
        isLoaded: true
      };

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
