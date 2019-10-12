import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { usersEpics } from '../users/+store/epics';
import { usersReducer } from '../users/+store/reducer';

const actionConverter = () => (next: any) => (action: Action) => next(Object.assign({}, action));

export const rootEpic = combineEpics(...usersEpics);

export const rootReducer = combineReducers({
  users: usersReducer
});

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(actionConverter, epicMiddleware)));

  epicMiddleware.run(rootEpic);

  return store;
}
