import { User } from '../models/User';
import { UsersAction, UsersActionTypes } from './actions';

export interface UsersState {
  users: User[];
  error: any;
}

const initialState: UsersState = {
  users: [],
  error: undefined
};

export const usersReducer = (state = initialState, action: UsersAction) => {
  switch (action.type) {
    case UsersActionTypes.GetAllUsersSuccess:
      return {
        ...state,
        users: action.payload.users
      };

    case UsersActionTypes.GetUserByIdSuccess:
      return {
        ...state,
        users: state.users.map(u => (u.id === action.payload.user.id ? action.payload.user : u))
      };

    case UsersActionTypes.GetAllUsersFailure:
    case UsersActionTypes.GetUserByIdFailure:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
};
