import { NotificationsState } from '../notifications/+store/notifications.reducer';
import { UserListState, UserProfileState } from '../users/+store/+shared/users.store.models';

export interface RootState {
  userList: UserListState;
  userProfile: UserProfileState;
  notifications: NotificationsState;
}
