import { createContext } from 'react';
import { HttpService } from '../../shared/services/HttpService';
import { UsersService } from './UsersService';

interface UsersServiceContext {
  usersService: UsersService;
}

export const UsersServiceContext = createContext<UsersServiceContext>({
  usersService: new UsersService(
    new HttpService({
      baseUrl: 'http://localhost:3000', // todo: use ENV VARS for these values
      defaultMaxRetryCount: 10,
      defaultRetryDelay: 200
    })
  )
});
