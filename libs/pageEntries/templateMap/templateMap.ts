import { Home, ListDetailFeatured, PageTemplateData } from '@pageEntries';
import { Users } from '@users';

const homeTemplate = 'Home';
const itemDetailTemplate = 'Item Detail';
const listDetailFeaturedTemplate = 'List Detail Featured';

export const templateMap: {
  [key: string]: React.ComponentType<PageTemplateData>;
} = {
  [homeTemplate]: Home,
  [itemDetailTemplate]: Users,
  [listDetailFeaturedTemplate]: ListDetailFeatured
};
