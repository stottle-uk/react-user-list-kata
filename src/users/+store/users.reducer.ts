import { BaseUser, User } from '../models/User';
import { UsersAction, UsersActionTypes } from './users.actions';

export interface UsersState {
  users: User[];
  selectedUser: BaseUser | undefined;
  isLoading: boolean;
  isLoaded: boolean;
  error: any | undefined;
}

const initialState: UsersState = {
  users: [],
  selectedUser: undefined,
  isLoading: false,
  isLoaded: false,
  error: undefined
};

export const usersReducer = (state = initialState, action: UsersAction) => {
  switch (action.type) {
    case UsersActionTypes.ShowUserProfile:
      return {
        ...state,
        selectedUser: action.payload.user
      };

    case UsersActionTypes.HideUserProfile:
      return {
        ...state,
        selectedUser: undefined
      };

    case UsersActionTypes.UpdateUserStart:
    case UsersActionTypes.GetUserByIdStart:
    case UsersActionTypes.GetAllUsersStart:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: undefined
      };

    case UsersActionTypes.GetAllUsersSuccess:
      return {
        ...state,
        users: action.payload.users,
        isLoading: false,
        isLoaded: true
      };

    case UsersActionTypes.UpdateUserSuccess:
    case UsersActionTypes.GetUserByIdSuccess:
      return {
        ...state,
        users: state.users.map(u => (u.id === action.payload.user.id ? action.payload.user : u)),
        isLoading: false,
        isLoaded: true
      };

    case UsersActionTypes.GetAllUsersFailure:
    case UsersActionTypes.GetUserByIdFailure:
    case UsersActionTypes.UpdateUserFailure:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: action.payload.error
      };

    default:
      return state;
  }
};
