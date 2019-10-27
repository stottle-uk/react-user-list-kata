import { App, configService, pagesService } from '@app';
import { AddNavigation } from '@config';
import { GetPageSuccess } from '@pages';
import { mapSitemapToRoute } from '@pageTemplates';
import { AddRoutesStart, InitFirstRouteStart } from '@router';
import { configureStore } from '@store';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { Base64 } from 'js-base64';
import * as path from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { combineLatest, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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

      combineLatest(configService.get(), pagesService.getPage(req.url))
        .pipe(
          tap(([config, pageData]) => {
            store.dispatch(
              new AddRoutesStart({ routes: mapSitemapToRoute(config.sitemap) })
            );
            store.dispatch(
              new AddNavigation({ navigation: config.navigation })
            );
            store.dispatch(new InitFirstRouteStart({ path: req.url }));
            store.dispatch(new GetPageSuccess({ pageData }));
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
          catchError(error => {
            console.error(error);
            return of({
              markup: JSON.stringify(error, undefined, 2),
              storeData: ''
            });
          }),
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
