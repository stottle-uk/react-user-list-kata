import { Sitemap } from '@config';
import { Home, ListDetailFeatured, PageTemplateData } from '@pageEntries';
import { RouterConfigRoute } from '@router';
import MovieDetail from '../components/ItemDetail';

const homeTemplate = 'Home';
const listDetailTemplate = 'List Detail';
const listDetailFeaturedTemplate = 'List Detail Featured';
const category = 'Category';
const movieDetail = 'Movie Detail';

export const templateMap: {
  [key: string]: React.ComponentType<PageTemplateData>;
} = {
  [homeTemplate]: Home,
  [listDetailTemplate]: ListDetailFeatured,
  [listDetailFeaturedTemplate]: ListDetailFeatured,
  [category]: Home,
  [movieDetail]: MovieDetail
};

export const mapSitemapToRoute = (
  sitemap: Sitemap[]
): RouterConfigRoute<PageTemplateData>[] =>
  sitemap.map(s => ({
    name: s.title,
    path: s.path,
    template: s.template
  }));
