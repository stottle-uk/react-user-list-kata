import { BrowserHistory, RouteMatcher } from '@router';
import { HttpService } from '@shared/services/HttpService';
import { ConfigService } from 'libs/config/services/ConfigService';
import { UsersService } from 'libs/users/services/UsersService';

const httpService = new HttpService({
  baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
  defaultMaxRetryCount: 4,
  defaultRetryDelay: 200
});
export const configService = new ConfigService(httpService);
export const usersService = new UsersService(httpService);
export const browserHistory = new BrowserHistory();
export const routeMatcher = new RouteMatcher();
