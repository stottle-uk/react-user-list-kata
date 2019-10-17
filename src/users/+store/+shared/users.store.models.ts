import { BaseUser, IGetUsers, IUpdateUsers, User } from '../../models/User';

export interface UsersEpicDependencies {
  usersService: IGetUsers & IUpdateUsers;
}

export interface UsersError {
  actionType: string;
  errors: any[]; // todo: create typescript interface for errors
}

export interface UserListState {
  users: BaseUser[];
  isLoading: boolean;
  isLoaded: boolean;
  errors?: UsersError;
}

export interface UserProfileState {
  selectedUser?: User;
  showUserProfileModal: boolean;
  isSubmitted: boolean;
  isLoading: boolean;
  isLoaded: boolean;
  errors?: UsersError;
}
