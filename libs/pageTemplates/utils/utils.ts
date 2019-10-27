import { Sitemap } from '@config';
import { RouterConfigRoute } from '@router';
import Home from '../components/Home';
import MovieDetail from '../components/ItemDetail';
import ListDetailFeatured from '../components/ListDetailFeatured';
import { PageTemplate } from '../models/pageEntries';

const homeTemplate = 'Home';
const listDetailTemplate = 'List Detail';
const listDetailFeaturedTemplate = 'List Detail Featured';
const category = 'Category';
const movieDetail = 'Movie Detail';

export const templateMap: Dictionary<React.ComponentType<PageTemplate>> = {
  [homeTemplate]: Home,
  [listDetailTemplate]: ListDetailFeatured,
  [listDetailFeaturedTemplate]: ListDetailFeatured,
  [category]: Home,
  [movieDetail]: MovieDetail
};

export const mapSitemapToRoute = (
  sitemap: Sitemap[]
): RouterConfigRoute<PageTemplate>[] =>
  sitemap.map(s => ({
    name: s.title,
    path: s.path,
    template: s.template
  }));
