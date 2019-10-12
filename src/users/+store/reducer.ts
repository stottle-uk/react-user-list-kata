import { UsersAction, UsersActionTypes } from './actions';

export const usersReducer = (state = { isPinging: false }, action: UsersAction) => {
  switch (action.type) {
    case UsersActionTypes.GetAllUsersStart:
      return { isPinging: true };

    case UsersActionTypes.GetAllUsersFailure:
      return { isPinging: false };

    default:
      return state;
  }
};
