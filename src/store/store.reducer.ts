import { combineReducers } from 'redux';
import { ProfileAction } from '../users/+store/profile/profile.actions';
import { profileReducer } from '../users/+store/profile/profile.reducer';
import { UserListAction } from '../users/+store/userList/userList.actions';
import { userListReducer } from '../users/+store/userList/userList.reducer';
import { RootState } from './store.modal';

type AllActions = UserListAction & ProfileAction;

export const rootReducer = combineReducers<RootState, AllActions>({
  userList: userListReducer,
  profile: profileReducer
});
