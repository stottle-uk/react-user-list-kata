import {
  AddRoutesStart,
  InitRouterOnClient,
  StartPopStateListner
} from '@router';
import { HttpService } from '@shared/services/HttpService';
import { configureStore } from '@store';
import { GetAllUsersStart } from '@users';
import { Base64 } from 'js-base64';
import { ConfigService } from 'libs/config/services/ConfigService';
import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { tap } from 'rxjs/operators';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

const initialState =
  (window as any).DATA !== '' && (window as any).DATA !== '{{WINDOW_DATA}}'
    ? Base64.decode((window as any).DATA)
    : '{}';

const parsedInitialState = JSON.parse(initialState);
const store = configureStore(parsedInitialState);

if (initialState === '{}') {
  const http = new HttpService({
    baseUrl: 'http://localhost:3000', // todo: use ENV VARS for these values
    defaultMaxRetryCount: 4,
    defaultRetryDelay: 200
  });
  const configService = new ConfigService(http);

  configService
    .get()
    .pipe(
      tap(config => {
        store.dispatch(new AddRoutesStart({ routes: config.sitemap }));
        store.dispatch(new InitRouterOnClient());
        store.dispatch(new GetAllUsersStart());
        ReactDOM.render(
          <Provider store={store}>
            <App />
          </Provider>,
          document.getElementById('root')
        );
      })
    )
    .subscribe();
  // Non-server rendered.
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
