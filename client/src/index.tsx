import { App, configService } from '@app';
import {
  AddRoutesStart,
  InitRouterOnClient,
  StartPopStateListner
} from '@router';
import { configureStore } from '@store';
import { GetAllUsersStart } from '@users';
import { Base64 } from 'js-base64';
import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { tap } from 'rxjs/operators';
import './index.css';
import * as serviceWorker from './serviceWorker';

const initialState =
  (window as any).DATA !== '' && (window as any).DATA !== '{{WINDOW_DATA}}'
    ? Base64.decode((window as any).DATA)
    : '{}';

const parsedInitialState = JSON.parse(initialState);
const store = configureStore(parsedInitialState);

if (initialState === '{}') {
  // Non-server rendered.
  configService
    .get()
    .pipe(
      tap(config => {
        store.dispatch(new AddRoutesStart({ routes: config.sitemap }));
        store.dispatch(new InitRouterOnClient());
        store.dispatch(new GetAllUsersStart());
      }),
      tap(() =>
        ReactDOM.render(
          <Provider store={store}>
            <App />
          </Provider>,
          document.getElementById('root')
        )
      )
    )
    .subscribe();
} else {
  // Server rendered hydration
  store.dispatch(new StartPopStateListner());

  ReactDOM.hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
