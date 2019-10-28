import { RouterConfigRoute } from '../models/router';

export class RouteMatcher {
  matchRoute(
    path: string,
    routes: RouterConfigRoute[]
  ): RouterConfigRoute | undefined {
    return routes.find(r => this.findRoute(path, r));
  }

  private findRoute(path: string, route: RouterConfigRoute): boolean {
    if (path.startsWith('/filme/') && route.path === '/filme/{id}') {
      return true;
    }
    if (path.startsWith('/playlist/') && route.path === '/playlist/{id}') {
      return true;
    }
    return route.path === decodeURIComponent(path);
  }
}
