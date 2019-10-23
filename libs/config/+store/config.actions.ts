import { Action } from 'redux';
import { Navigation } from '../models/config';

export enum ConfigActionTypes {
  SetClientSide = '[Config] Set Client Side',
  AddNavigation = '[Config] Add Navgiations'
}

export class SetClientSide implements Action {
  readonly type = ConfigActionTypes.SetClientSide;
}

export class AddNavigation implements Action {
  readonly type = ConfigActionTypes.AddNavigation;

  constructor(public payload: { navigation: Navigation }) {}
}

export type ConfigAction = SetClientSide | AddNavigation;
