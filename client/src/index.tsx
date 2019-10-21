import { AddRoutesStart } from '@router';
import { configureStore } from '@store';
import { GetAllUsersStart } from '@users';
import { Base64 } from 'js-base64';
import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { routes } from './router/routes';
import * as serviceWorker from './serviceWorker';

const initialState =
  (window as any).DATA !== '' && (window as any).DATA !== '{{WINDOW_DATA}}'
    ? Base64.decode((window as any).DATA)
    : '{}';

const parsedInitialState = JSON.parse(initialState);
const store = configureStore(parsedInitialState);

if (initialState === '{}') {
  // Non-server rendered.
  store.dispatch(new AddRoutesStart({ routes }));
  store.dispatch(new GetAllUsersStart());
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
} else {
  // Server rendered hydration
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
