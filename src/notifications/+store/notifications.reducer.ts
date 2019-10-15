import { NotificationActionTypes, NotificationsAction } from './notifications.actions';

export interface NotificationsState {
  isVisible: boolean;
  message: string;
}

const initialState: NotificationsState = {
  isVisible: false,
  message: '&nbsp;'
};

export const notificationsReducer = (state = initialState, action: NotificationsAction): NotificationsState => {
  switch (action.type) {
    case NotificationActionTypes.ShowNotification:
      return {
        ...state,
        isVisible: true,
        message: action.payload.message
      };

    case NotificationActionTypes.HideNotification:
      return {
        ...state,
        isVisible: false
      };

    default:
      return state;
  }
};
