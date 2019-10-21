import { RouterConfigRoute } from '@router';
import { Users } from '@users';
import Home from '../components/layout/Home';

export const routes: RouterConfigRoute<any>[] = [
  {
    name: 'Home',
    path: '/',
    template: 'home'
  },
  {
    name: 'Users',
    path: '/users',
    template: 'users'
  }
];

export const templateMap: { [key: string]: React.ComponentType } = {
  home: Home,
  users: Users
};
