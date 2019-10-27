import { RouterConfigRoute } from '../models/router';

export class RouteMatcher<T> {
  matchRoute(
    path: string,
    routes: RouterConfigRoute<T>[]
  ): RouterConfigRoute<T> | undefined {
    return routes.find(r => this.findRoute(path, r));
  }

  private findRoute(path: string, route: RouterConfigRoute<T>): boolean {
    if (path.startsWith('/filme/') && route.path === '/filme/{id}') {
      return true;
    }
    if (path.startsWith('/playlist/') && route.path === '/playlist/{id}') {
      return true;
    }
    return route.path === decodeURIComponent(path);
  }
}
