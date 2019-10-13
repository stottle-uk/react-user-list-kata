import { Reducer } from 'react';
import { combineReducers } from 'redux';
import { UsersAction } from '../users/+store/actions';
import { usersReducer } from '../users/+store/reducer';
import { RootState } from './store.modal';

type AllActions = UsersAction;

export const rootReducer = combineReducers<Reducer<RootState, AllActions>>({
  users: usersReducer
});
