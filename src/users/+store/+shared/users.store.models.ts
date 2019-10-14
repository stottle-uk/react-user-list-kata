import { IGetUsers, IUpdateUsers } from '../../models/User';

export interface UsersEpicDependencies {
  usersService: IGetUsers & IUpdateUsers;
}
