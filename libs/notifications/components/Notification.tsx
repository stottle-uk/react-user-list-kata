import { RootState } from 'libs/store/setup/store.modal';
import React from 'react';
import { connect } from 'react-redux';
import { getIsVisible, getMessage } from '../+store/notifications.selectors';

interface StoreProps {
  isVisible: boolean;
  message: string;
}

const Notification: React.FC<StoreProps> = ({ isVisible, message }) => {
  const containerClass = `toast-notification ${isVisible && 'visible'}`;
  return (
    <div className={containerClass}>
      <article className="message is-success">
        <div className="message-body">
          <span>{message}</span>
        </div>
      </article>
    </div>
  );
};

const mapStateToProps = ({ notifications }: RootState): StoreProps => ({
  message: getMessage(notifications),
  isVisible: getIsVisible(notifications)
});

export default connect<StoreProps, {}, {}, RootState>(mapStateToProps)(
  Notification
);
