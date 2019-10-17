import { Action } from 'redux';

export enum NotificationActionTypes {
  ShowNotification = '[Notifications] Show Notifications',
  HideNotification = '[Notifications] Hide Notifications'
}

export class ShowNotification implements Action {
  readonly type = NotificationActionTypes.ShowNotification;

  constructor(public payload: { message: string }) {}
}

export class HideNotification implements Action {
  readonly type = NotificationActionTypes.HideNotification;
}

export type NotificationsAction = ShowNotification | HideNotification;
