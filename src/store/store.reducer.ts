import { AnyAction, combineReducers } from 'redux';
import { notificationsReducer } from '../notifications/+store/notifications.reducer';
import { userListReducer } from '../users/+store/userList/userList.reducer';
import { userProfileReducer } from '../users/+store/userProfile/userProfile.reducer';
import { RootState } from './store.modal';

export const rootReducer = combineReducers<RootState, AnyAction>({
  userList: userListReducer,
  userProfile: userProfileReducer,
  notifications: notificationsReducer
});
