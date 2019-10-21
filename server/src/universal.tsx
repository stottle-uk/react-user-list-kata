import { AddRoutesStart, InitFirstRouteStart } from '@router';
import { HttpService } from '@shared/services/HttpService';
import { configureStore } from '@store';
import { GetAllUsersSuccess, UsersService } from '@users';
import App from 'client/src/App';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { Base64 } from 'js-base64';
import { ConfigService } from 'libs/config/services/ConfigService';
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

      const httpService = new HttpService({
        baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
        defaultMaxRetryCount: 4,
        defaultRetryDelay: 200
      });

      const usersService = new UsersService(httpService);
      const configService = new ConfigService(httpService);

      combineLatest(configService.get(), usersService.getAll())
        .pipe(
          tap(([config, users]) => {
            store.dispatch(new AddRoutesStart({ routes: config.sitemap }));
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
