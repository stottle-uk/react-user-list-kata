import { notificationsReducer } from '@notifications';
import { usersReducers } from '@users';
import { AnyAction, combineReducers } from 'redux';
import { RootState } from './store.modal';

export const rootReducer = combineReducers<RootState, AnyAction>({
  userList: usersReducers.userListReducer,
  userProfile: usersReducers.userProfileReducer,
  notifications: notificationsReducer
});
