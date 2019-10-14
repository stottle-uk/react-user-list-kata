import { UserListState } from '../users/+store/userList/userList.reducer';
import { userProfileState } from '../users/+store/userProfile/userProfile.reducer';

export interface RootState {
  userList: UserListState;
  userProfile: userProfileState;
}
