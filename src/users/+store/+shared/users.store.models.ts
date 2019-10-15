import { BaseUser, IGetUsers, IUpdateUsers, User } from '../../models/User';

export interface UsersEpicDependencies {
  usersService: IGetUsers & IUpdateUsers;
}

export interface UserListState {
  users: BaseUser[];
  isLoading: boolean;
  isLoaded: boolean;
  errors: any[]; // todo: create typescript interface for errors
}

export interface UserProfileState {
  selectedUser?: User;
  showUserProfileModal: boolean;
  isSubmitted: boolean;
  isLoading: boolean;
  isLoaded: boolean;
  errors: any[]; // todo: create typescript interface for errors
}
