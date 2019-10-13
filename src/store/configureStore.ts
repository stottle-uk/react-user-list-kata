import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { epicMiddleware, rootEpic } from './store.epics';
import { actionConverter } from './store.middleware';
import { rootReducer } from './store.reducer';

// todo: set dev tools to only run in dev mode

export default function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(actionConverter, epicMiddleware)));

  epicMiddleware.run(rootEpic);

  return store;
}
