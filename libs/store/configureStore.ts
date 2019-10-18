import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { epicMiddleware, rootEpic } from './setup/store.epics';
import { actionConverter } from './setup/store.middleware';
import { RootState } from './setup/store.modal';
import { rootReducer } from './setup/store.reducer';

// todo: set dev tools to only run in dev mode

export default function configureStore(initData: RootState | {} = {}) {
  const store = createStore(
    rootReducer,
    initData,
    composeWithDevTools(applyMiddleware(actionConverter, epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
