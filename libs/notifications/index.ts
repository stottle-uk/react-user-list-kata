import { notificationsEpicsAsArray } from './+store/notifications.epics';

export * from './+store/notifications.actions';
export * from './+store/notifications.reducer';
export { default as Notification } from './components/Notification';
export const notificationsEpics = notificationsEpicsAsArray;
