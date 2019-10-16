import { Request, Response } from 'express';
import * as fs from 'fs';
import { Base64 } from 'js-base64';
import * as path from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { tap } from 'rxjs/operators';
import App from '../src/App';
import { HttpService } from '../src/shared/services/HttpService';
import configureStore from '../src/store/configureStore';
import { GetAllUsersSuccess } from '../src/users/+store/userList/userList.actions';
import { UsersService } from '../src/users/services/UsersService';

export default function universalLoader(req: Request, res: Response) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err: NodeJS.ErrnoException | null, htmlData: string) => {
    if (err) {
      // tslint:disable-next-line:no-console
      console.error('read err', err);
      return res.status(404).end();
    }
    const store = configureStore();

    const usersService = new UsersService(
      new HttpService({
        baseUrl: 'http://localhost:3000', // todo: use ENV VARS for these values
        defaultMaxRetryCount: 5,
        defaultRetryDelay: 200
      })
    );

    usersService
      .getAll()
      .pipe(
        tap(users => {
          store.dispatch<any>(new GetAllUsersSuccess({ users }));

          const markup = renderToString(
            <Provider store={store}>
              <App />
            </Provider>
          );

          let storeForClient = store.getState();

          const RenderedApp = htmlData
            .replace('{{ SSR }}', markup)
            .replace('{{WINDOW_DATA}}', Base64.encode(JSON.stringify(storeForClient)));

          res.status(200).send(RenderedApp);
        })
      )
      .subscribe();
  });
}
