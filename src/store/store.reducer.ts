import { combineReducers } from 'redux';
import { NotificationsAction } from '../notifications/+store/notifications.actions';
import { notificationsReducer } from '../notifications/+store/notifications.reducer';
import { UserListAction } from '../users/+store/userList/userList.actions';
import { userListReducer } from '../users/+store/userList/userList.reducer';
import { UserProfileAction } from '../users/+store/userProfile/userProfile.actions';
import { userProfileReducer } from '../users/+store/userProfile/userProfile.reducer';
import { RootState } from './store.modal';

type AllActions = UserListAction & UserProfileAction & NotificationsAction;

export const rootReducer = combineReducers<RootState, AllActions>({
  userList: userListReducer,
  userProfile: userProfileReducer,
  notifications: notificationsReducer
});
