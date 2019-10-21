import { Users } from '@users';
import Home from '../layout/Home';

export const routes = [
  {
    name: 'Home',
    path: '/',
    template: Home
  },
  {
    name: 'Home',
    path: '/users',
    template: Users
  }
];
