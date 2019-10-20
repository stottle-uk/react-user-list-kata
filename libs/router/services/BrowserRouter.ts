import { RouterConfigRoute } from '../types/router';
import { BrowserHistory } from './BrowserHistory';
import { RouteMatcher } from './RouteMatcher';

export class BrowserRouter<T> {
  private routerConfig: RouterConfigRoute<T>[] = [];

  constructor(
    public history = new BrowserHistory(),
    private routerMatcher = new RouteMatcher<T>()
  ) {}

  addRoutes(routes: RouterConfigRoute<T>[]): void {
    this.routerConfig = [...this.routerConfig, ...routes];
  }

  matchRoute = (path: string): RouterConfigRoute<T> | undefined => {
    return this.routerMatcher.matchRoute(path, this.routerConfig);
  };
}
