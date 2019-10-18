import { UserListState, UserProfileState } from '@users';
import { NotificationsState } from '../notifications/+store/notifications.reducer';

export interface RootState {
  userList: UserListState;
  userProfile: UserProfileState;
  notifications: NotificationsState;
}
