import { NotificationsState } from '@notifications';
import { RouterState } from '@router';
import { UserListState, UserProfileState } from '@users';

export interface RootState {
  userList: UserListState;
  userProfile: UserProfileState;
  notifications: NotificationsState;
  router: RouterState;
}
