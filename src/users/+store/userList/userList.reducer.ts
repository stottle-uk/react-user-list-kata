import { BaseUser } from '../../models/User';
import { UserListAction, UserListActionTypes } from './userList.actions';

export interface UserListState {
  users: BaseUser[];
  isLoading: boolean;
  isLoaded: boolean;
  errors: any[]; // todo: create typescript interface for errors
}

const initialState: UserListState = {
  users: [],
  isLoading: false,
  isLoaded: false,
  errors: []
};

export const userListReducer = (state = initialState, action: UserListAction): UserListState => {
  switch (action.type) {
    case UserListActionTypes.GetAllUsersStart:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        errors: []
      };

    case UserListActionTypes.GetAllUsersSuccess:
      return {
        ...state,
        users: action.payload.users,
        isLoading: false,
        isLoaded: true
      };

    case UserListActionTypes.GetAllUsersFailure:
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
