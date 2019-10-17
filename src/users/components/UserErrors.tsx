import React from 'react';
import { connect } from 'react-redux';
import { UsersError } from '../+store/+shared/users.store.models';
import { getUserListErrors } from '../+store/userList/userList.selectors';
import { getUserProfileErrors } from '../+store/userProfile/userProfile.selectors';
import { RootState } from '../../store/store.modal';

interface OwnProps {
  errorActionType: string;
  retryAction?: () => void;
  retryText?: string;
}

interface StoreProps {
  usersError: UsersError;
}

type AllProps = OwnProps & StoreProps;

const UserErrors: React.FC<AllProps> = ({ usersError, errorActionType, retryText, retryAction }) =>
  usersError.actionType === errorActionType ? (
    <article className="message is-danger is-in-modal">
      <div className="message-body">
        {usersError.errors[usersError.errors.length - 1]
          ? usersError.errors[usersError.errors.length - 1].data
          : 'Unexpected Error (is the API running?)'}
        {!!retryAction && <b onClick={retryAction}>&nbsp;{retryText}</b>}
      </div>
      {/* todo: show something nice when max retries fails */}
    </article>
  ) : (
    <></>
  );

const mapStateToProps = ({ userProfile, userList }: RootState): StoreProps => ({
  usersError: {
    errors: [],
    actionType: '',
    ...getUserProfileErrors(userProfile),
    ...getUserListErrors(userList)
  }
});

export default connect<StoreProps, {}, {}, RootState>(mapStateToProps)(UserErrors);
