import { PageEntry } from '../models/Page';
import { PagesAction, PagesActionTypes } from './pages.actions';

export interface PagesState {
  pageData?: PageEntry;
  isLoading: boolean;
  isLoaded: boolean;
  error?: any;
}

const initialState: PagesState = {
  isLoading: false,
  isLoaded: false
};

export const pagesReducer = (
  state = initialState,
  action: PagesAction
): PagesState => {
  switch (action.type) {
    case PagesActionTypes.GetPageStart:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: undefined
      };

    case PagesActionTypes.GetPageSuccess:
      return {
        ...state,
        pageData: action.payload.pageData,
        isLoading: false,
        isLoaded: true
      };

    case PagesActionTypes.GetPageFailure:
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
