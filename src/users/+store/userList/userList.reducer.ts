import { UserListState } from '../+shared/users.store.models';
import { UserListAction, UserListActionTypes } from './userList.actions';

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
