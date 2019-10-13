import { BaseUser, User } from '../models/User';
import { UsersAction, UsersActionTypes } from './actions';

export interface UsersState {
  users: User[];
  selectedUser: BaseUser | undefined;
  error: any | undefined;
}

const initialState: UsersState = {
  users: [],
  selectedUser: undefined,
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

    case UsersActionTypes.GetAllUsersSuccess:
      return {
        ...state,
        users: action.payload.users
      };

    case UsersActionTypes.UpdateUserSuccess:
    case UsersActionTypes.GetUserByIdSuccess:
      return {
        ...state,
        users: state.users.map(u => (u.id === action.payload.user.id ? action.payload.user : u))
      };

    case UsersActionTypes.GetAllUsersFailure:
    case UsersActionTypes.GetUserByIdFailure:
    case UsersActionTypes.UpdateUserFailure:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
};
