import { BaseUser, User } from '../models/User';
import { UsersAction, UsersActionTypes } from './users.actions';

export interface RootUsersState {
  users: UsersState;
}

export interface UsersState {
  users: BaseUser[];
  showUserProfileModal: boolean;
  selectedUser?: User;
  isLoading: boolean;
  isLoaded: boolean;
  errors: any[]; // todo: create typescript interface for errors
}

const initialState: UsersState = {
  users: [],
  showUserProfileModal: false,
  selectedUser: undefined,
  isLoading: false,
  isLoaded: false,
  errors: []
};

export const usersReducer = (state = initialState, action: UsersAction): UsersState => {
  switch (action.type) {
    case UsersActionTypes.ShowUserProfile:
      return {
        ...state,
        showUserProfileModal: true
      };

    case UsersActionTypes.HideUserProfile:
      return {
        ...state,
        showUserProfileModal: false,
        selectedUser: undefined
      };

    case UsersActionTypes.UpdateUserStart:
    case UsersActionTypes.GetUserByIdStart:
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

    case UsersActionTypes.UpdateUserSuccess:
    case UsersActionTypes.GetUserByIdSuccess:
      return {
        ...state,
        selectedUser: action.payload.user,
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
        errors: action.payload.errors
      };

    default:
      return state;
  }
};
