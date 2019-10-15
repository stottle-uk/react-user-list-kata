import { ActionsObservable, ofType } from 'redux-observable';
import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HideNotification, NotificationActionTypes, ShowNotification } from './notifications.actions';

const showNotification = (action$: ActionsObservable<ShowNotification>) =>
  action$.pipe(
    ofType(NotificationActionTypes.ShowNotification),
    switchMap(() => timer(3000).pipe(map(() => new HideNotification())))
  );

export const notificationsEpics = { showNotification };
export const notificationsEpicsAsArray = Object.values(notificationsEpics);
