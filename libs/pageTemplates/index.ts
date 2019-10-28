import { RouteData } from '@router';
import Home from './components/Home';
import MovieDetail from './components/ItemDetail';
import ListDetailFeatured from './components/ListDetailFeatured';

const homeTemplate = 'Home';
const listDetailTemplate = 'List Detail';
const listDetailFeaturedTemplate = 'List Detail Featured';
const category = 'Category';
const movieDetail = 'Movie Detail';

export const templateMap: Dictionary<React.ComponentType<RouteData>> = {
  [homeTemplate]: Home,
  [listDetailTemplate]: ListDetailFeatured,
  [listDetailFeaturedTemplate]: ListDetailFeatured,
  [category]: Home,
  [movieDetail]: MovieDetail
};
