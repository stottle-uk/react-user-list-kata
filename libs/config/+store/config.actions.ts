import { Action } from 'redux';
import { Navigation } from '../models/config';

export enum ConfigActionTypes {
  thing = '',
  AddNavigation = '[Pages] Add Navgiations'
}

export class thing implements Action {
  readonly type = ConfigActionTypes.thing;
}

export class AddNavigation implements Action {
  readonly type = ConfigActionTypes.AddNavigation;

  constructor(public payload: { navigation: Navigation }) {}
}

export type ConfigAction = thing | AddNavigation;
