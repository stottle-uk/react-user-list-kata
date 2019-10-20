import { RouterConfigRoute } from '../types/router';

export class RouteMatcher<T> {
  matchRoute(
    path: string,
    routes: RouterConfigRoute<T>[]
  ): RouterConfigRoute<T> | undefined {
    return routes.find(r => this.findRoute(path, r));
  }

  private findRoute(path: string, route: RouterConfigRoute<T>): boolean {
    return route.path === decodeURIComponent(path);
  }
}
