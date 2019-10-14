import { combineReducers } from 'redux';
import { ProfileAction } from '../users/+store/profile/profile.actions';
import { profileReducer } from '../users/+store/profile/profile.reducer';
import { UsersAction } from '../users/+store/users/users.actions';
import { usersReducer } from '../users/+store/users/users.reducer';
import { RootState } from './store.modal';

type AllActions = UsersAction & ProfileAction;

export const rootReducer = combineReducers<RootState, AllActions>({
  users: usersReducer,
  profile: profileReducer
});
