import { NotificationsState } from '@notifications';
import { UserListState, UserProfileState } from '@users';

export interface RootState {
  userList: UserListState;
  userProfile: UserProfileState;
  notifications: NotificationsState;
}
