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

    case UsersActionTypes.GetAllUsersFailure:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
};
