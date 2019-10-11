import { createContext } from 'react';
import { UsersService } from './UsersService';

interface UsersServiceContext {
  usersService: UsersService;
}

export const UsersServiceContext = createContext<UsersServiceContext>({
  usersService: new UsersService()
});
