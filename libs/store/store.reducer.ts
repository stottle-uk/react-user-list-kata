import { usersReducers } from '@users';
import { AnyAction, combineReducers } from 'redux';
import { notificationsReducer } from '../notifications/+store/notifications.reducer';
import { RootState } from './store.modal';

export const rootReducer = combineReducers<RootState, AnyAction>({
  userList: usersReducers.userListReducer,
  userProfile: usersReducers.userProfileReducer,
  notifications: notificationsReducer
});
