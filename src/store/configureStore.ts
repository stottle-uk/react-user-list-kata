import { Reducer } from 'react';
import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { HttpService } from '../shared/services/HttpService';
import { UsersAction } from '../users/+store/actions';
import { UsersDependencies, usersEpics } from '../users/+store/epics';
import { usersReducer, UsersState } from '../users/+store/reducer';
import { UsersService } from '../users/services/UsersService';

export interface RootState {
  users: UsersState;
}

const usersService = new UsersService(
  new HttpService({
    baseUrl: 'http://localhost:3000', // todo: use ENV VARS for these values
    defaultMaxRetryCount: 10,
    defaultRetryDelay: 200
  })
);

type Dependencies = UsersDependencies;
type AllActions = UsersAction;

const dependencies: Dependencies = {
  usersService
};

export const rootEpic = combineEpics(...usersEpics);

export const rootReducer = combineReducers<Reducer<RootState, AllActions>>({
  users: usersReducer
});

const epicMiddleware = createEpicMiddleware({
  dependencies
});

const actionConverter = () => (next: any) => (action: Action) => next(Object.assign({}, action));

export default function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(actionConverter, epicMiddleware)));

  epicMiddleware.run(rootEpic);

  return store;
}
