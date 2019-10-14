import { ProfileState } from '../users/+store/profile/profile.reducer';
import { UserListState } from '../users/+store/userList/userList.reducer';

export interface RootState {
  userList: UserListState;
  profile: ProfileState;
}
