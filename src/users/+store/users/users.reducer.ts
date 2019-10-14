import { BaseUser } from '../../models/User';
import { UsersAction, UsersActionTypes } from './users.actions';

export interface UsersState {
  users: BaseUser[];
  isLoading: boolean;
  isLoaded: boolean;
  errors: any[]; // todo: create typescript interface for errors
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  isLoaded: false,
  errors: []
};

export const usersReducer = (state = initialState, action: UsersAction): UsersState => {
  switch (action.type) {
    case UsersActionTypes.GetAllUsersStart:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        errors: []
      };

    case UsersActionTypes.GetAllUsersSuccess:
      return {
        ...state,
        users: action.payload.users,
        isLoading: false,
        isLoaded: true
      };

    case UsersActionTypes.GetAllUsersFailure:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        errors: action.payload.errors
      };

    default:
      return state;
  }
};
