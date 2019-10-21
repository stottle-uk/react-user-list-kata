import { AddRoutesStart, InitFirstRouteStart } from '@router';
import { HttpService } from '@shared/services/HttpService';
import { configureStore } from '@store';
import { GetAllUsersSuccess, UsersService } from '@users';
import App from 'client/src/App';
import { routes } from 'client/src/router/routes';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { Base64 } from 'js-base64';
import * as path from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { of } from 'rxjs';
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

      const usersService = new UsersService(
        new HttpService({
          baseUrl: process.env.API_BASE_URL || 'http://localhost:3000', // todo: use ENV VARS for these values
          defaultMaxRetryCount: 5,
          defaultRetryDelay: 200
        })
      );

      store.dispatch(new AddRoutesStart({ routes }));
      store.dispatch(new InitFirstRouteStart({ path: req.url }));

      usersService
        .getAll()
        .pipe(
          tap(users => store.dispatch(new GetAllUsersSuccess({ users }))),
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
