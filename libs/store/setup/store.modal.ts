import { NotificationsState } from '@notifications';
import { UserListState, UserProfileState } from '@users';
import { RouterState } from 'libs/router/+store/router.reducer';

export interface RootState {
  userList: UserListState;
  userProfile: UserProfileState;
  notifications: NotificationsState;
  router: RouterState;
}
