import React, { Dispatch } from 'react';
import { Modal } from 'react-bulma-components';
import { connect } from 'react-redux';
import { HideUserProfile, UpdateUserStart, UserProfileAction } from '../+store/userProfile/userProfile.actions';
import {
  getIsLoaded,
  getIsSubmitted,
  getSelectedUser,
  getShowUserProfileModal,
  getUserProfileErrors
} from '../+store/userProfile/userProfile.selectors';
import spinner from '../../shared/icons/spinner.svg';
import { RootState } from '../../store/store.modal';
import { User } from '../models/User';
import UserErrors from './UserErrors';
import UserProfileForm from './UserProfileForm';

interface StoreProps {
  selectedUser?: User;
  isModalVisible: boolean;
  isSubmitted: boolean;
  isLoaded: boolean;
  errors: any[];
}

interface DispatchProps {
  updateUser: (user: User) => void;
  hideUserProfile: () => void;
}

type AllProps = StoreProps & DispatchProps;

const UserProfileModal: React.FC<AllProps> = ({
  selectedUser,
  isModalVisible,
  isSubmitted,
  isLoaded,
  errors,
  updateUser,
  hideUserProfile
}: AllProps) => {
  const renderSpinner = (
    <>
      <img src={spinner} className="spinner is-in-modal" alt="spinner" />
      {isSubmitted && <p className="is-size-3 has-text-white is-in-modal">Saving</p>}
    </>
  );

  const renderForm = selectedUser ? (
    <UserProfileForm user={selectedUser} errors={errors} onCancel={hideUserProfile} onSubmit={updateUser} />
  ) : (
    <UserErrors errors={errors} retry={hideUserProfile} retryText="Click to close" />
  );

  const renderModalContent = isLoaded ? renderForm : renderSpinner;

  return (
    <Modal show={isModalVisible} showClose={false} closeOnEsc={true} onClose={hideUserProfile}>
      {renderModalContent}
    </Modal>
  );
};

const mapStateToProps = ({ userProfile }: RootState): StoreProps => {
  return {
    selectedUser: getSelectedUser(userProfile),
    isModalVisible: getShowUserProfileModal(userProfile),
    isSubmitted: getIsSubmitted(userProfile),
    isLoaded: getIsLoaded(userProfile),
    errors: getUserProfileErrors(userProfile)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<UserProfileAction>): DispatchProps => ({
  updateUser: (user: User) => dispatch(new UpdateUserStart({ user })),
  hideUserProfile: () => dispatch(new HideUserProfile())
});

export default connect<StoreProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileModal);
