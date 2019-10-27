import { Page } from '@pageEntries';
import { PagesAction, PagesActionTypes } from './pages.actions';

export interface PagesState {
  pageIds: string[];
  pages: { [key: string]: Page };
  isLoading: boolean;
  isLoaded: boolean;
  error?: any;
}

const initialState: PagesState = {
  pageIds: [],
  pages: {},
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
      const pages = {
        ...state.pages,
        [action.payload.pageData.path]: action.payload.pageData
      };
      const pageIds = Object.keys(pages);

      return {
        ...state,
        pageIds,
        pages,
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
