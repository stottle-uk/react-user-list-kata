import { Home, ListDetailFeatured, PageTemplateData } from '@pageEntries';
import { RouterConfigRoute } from '@router';
import { Users } from '@users';
import { Sitemap } from 'libs/config/models/Config';

const homeTemplate = 'Home';
const itemDetailTemplate = 'Item Detail';
const listDetailFeaturedTemplate = 'List Detail Featured';
const category = 'Category';

export const templateMap: {
  [key: string]: React.ComponentType<PageTemplateData>;
} = {
  [homeTemplate]: Home,
  [itemDetailTemplate]: Users,
  [listDetailFeaturedTemplate]: ListDetailFeatured,
  [category]: ListDetailFeatured
};

export const mapSitemapToRoute = (
  sitemap: Sitemap[]
): RouterConfigRoute<PageTemplateData>[] =>
  sitemap.map(s => ({
    name: s.title,
    path: s.path,
    template: s.template
  }));
