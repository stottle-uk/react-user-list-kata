import { BrowserHistory, RouteMatcher } from '@router';
import { HttpService } from '@shared/services/HttpService';
import { UsersService } from '@users';
import { ConfigService } from 'libs/config/services/ConfigService';
import { PagesService } from 'libs/pages/services/PagesService';

const httpService = new HttpService({
  baseUrl: process.env.API_BASE_URL || 'https://cdn.telecineplay.com.br/api/',
  defaultMaxRetryCount: 4,
  defaultRetryDelay: 200
});
export const configService = new ConfigService(httpService);
export const usersService = new UsersService(httpService);
export const pagesService = new PagesService(httpService);
export const browserHistory = new BrowserHistory();
export const routeMatcher = new RouteMatcher();
export { default as App } from './components/App';
export * from './router/routes';
