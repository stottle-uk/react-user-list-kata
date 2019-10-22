import { App, configService, usersService } from '@app';
import {
  AddRoutesStart,
  InitFirstRouteStart,
  RouterConfigRoute
} from '@router';
import { configureStore } from '@store';
import { GetAllUsersSuccess } from '@users';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { Base64 } from 'js-base64';
import { Sitemap } from 'libs/config/models/Config';
import * as path from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { combineLatest, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

function mapSitemapToRoute(sitemap: Sitemap[]): RouterConfigRoute<any>[] {
  return sitemap.map(s => ({
    name: s.title,
    path: s.path,
    template: s.template
  }));
}

export default function universalLoader(req: Request, res: Response) {
  const filePath = path.resolve(
    __dirname,
    '..',
    '..',
    'build',
    'client',
    'index.html'
  );

  fs.readFile(
    filePath,
    'utf8',
    (err: NodeJS.ErrnoException | null, htmlData: string) => {
      if (err) {
        // tslint:disable-next-line:no-console
        console.error('read err', err);
        return res.status(404).end();
      }
      const store = configureStore();

      combineLatest(configService.get(), usersService.getAll())
        .pipe(
          tap(([config, users]) => {
            store.dispatch(
              new AddRoutesStart({ routes: mapSitemapToRoute(config.sitemap) })
            );
            store.dispatch(new InitFirstRouteStart({ path: req.url }));
            store.dispatch(new GetAllUsersSuccess({ users }));
          }),
          map(() =>
            renderToString(
              <Provider store={store}>
                <App />
              </Provider>
            )
          ),
          map(markup => ({
            markup,
            storeData: Base64.encode(JSON.stringify(store.getState()))
          })),
          catchError(() =>
            of({
              markup: '',
              storeData: ''
            })
          ),
          map(data =>
            htmlData
              .replace('{{ SSR }}', data.markup)
              .replace('{{WINDOW_DATA}}', data.storeData)
          ),
          tap(renderedApp => res.status(200).send(renderedApp))
        )
        .subscribe();
    }
  );
}
