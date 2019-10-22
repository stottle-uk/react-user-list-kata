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

const homeTemplate = 'Home';
const itemDetailTemplate = 'Item Detail';
const listDetailFeaturedTemplate = 'List Detail Featured';

export const templateMap: { [key: string]: React.ComponentType } = {
  [homeTemplate]: Home,
  [itemDetailTemplate]: Users,
  [listDetailFeaturedTemplate]: Users
};
