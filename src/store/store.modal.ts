import { ProfileState } from '../users/+store/profile/profile.reducer';
import { UsersState } from '../users/+store/users/users.reducer';

export interface RootState {
  users: UsersState;
  profile: ProfileState;
}
