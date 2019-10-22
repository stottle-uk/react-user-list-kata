import { NotificationsState } from '@notifications';
import { PagesState } from '@pages';
import { RouterState } from '@router';
import { UserListState, UserProfileState } from '@users';

export interface RootState {
  userList: UserListState;
  userProfile: UserProfileState;
  notifications: NotificationsState;
  router: RouterState;
  pages: PagesState;
}
