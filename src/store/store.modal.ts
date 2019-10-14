import { UserListState } from '../users/+store/userList/userList.reducer';
import { UserProfileState } from '../users/+store/userProfile/userProfile.reducer';

export interface RootState {
  userList: UserListState;
  userProfile: UserProfileState;
}
