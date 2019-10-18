import { Action } from 'redux';

export const actionConverter = () => (next: any) => (action: Action) => next(Object.assign({}, action));
