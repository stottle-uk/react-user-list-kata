import { notificationsReducer } from '@notifications';
import { pagesReducer } from '@pages';
import { routerReducer } from '@router';
import { usersReducers } from '@users';
import { AnyAction, combineReducers } from 'redux';
import { RootState } from './store.modal';

export const rootReducer = combineReducers<RootState, AnyAction>({
  userList: usersReducers.userListReducer,
  userProfile: usersReducers.userProfileReducer,
  notifications: notificationsReducer,
  router: routerReducer,
  pages: pagesReducer
});
