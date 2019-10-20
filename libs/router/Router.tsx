import React, { useContext, useEffect, useState } from 'react';
import { map, tap } from 'rxjs/operators';
import { BrowserRouter } from './services/BrowserRouter';
import { RouterConfigRoute } from './types/router';

interface RouterProps<T> {
  routeData: T;
  routerContext: React.Context<BrowserRouter<T>>;
  children: React.ReactElement;
}

export const Router = <T extends {}>({
  children,
  routeData,
  routerContext
}: RouterProps<T>) => {
  const { history, matchRoute } = useContext(routerContext);
  const [route, setRoute] = useState<RouterConfigRoute<T>>();

  const routerListenerEffect = () => {
    const subscription = history.activatedPath$
      .pipe(
        map(path => matchRoute(path)),
        tap(route => setRoute(route))
      )
      .subscribe();
    return () => subscription.unsubscribe();
  };

  useEffect(routerListenerEffect, []);

  return route ? <route.template {...routeData} /> : children;
};

export default Router;
