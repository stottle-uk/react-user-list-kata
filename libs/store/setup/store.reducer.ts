import { notificationsReducer } from '@notifications';
import { usersReducers } from '@users';
import { routerReducer } from 'libs/router/+store/router.reducer';
import { AnyAction, combineReducers } from 'redux';
import { RootState } from './store.modal';

export const rootReducer = combineReducers<RootState, AnyAction>({
  userList: usersReducers.userListReducer,
  userProfile: usersReducers.userProfileReducer,
  notifications: notificationsReducer,
  router: routerReducer
});
