import { combineReducers } from 'redux';
import { UsersAction } from '../users/+store/users.actions';
import { usersReducer } from '../users/+store/users.reducer';
import { RootState } from './store.modal';

type AllActions = UsersAction;

export const rootReducer = combineReducers<RootState, AllActions>({
  users: usersReducer
});
