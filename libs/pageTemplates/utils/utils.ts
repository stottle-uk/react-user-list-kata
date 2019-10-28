import { Sitemap } from '@config';
import { RouteData, RouterConfigRoute } from '@router';

export const mapSitemapToRoute = (
  sitemap: Sitemap[]
): RouterConfigRoute<RouteData>[] =>
  sitemap.map(s => ({
    name: s.title,
    path: s.path,
    template: s.template
  }));
