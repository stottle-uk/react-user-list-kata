import React, { Dispatch, useEffect, useState } from 'react';
import { Modal } from 'react-bulma-components';
import { connect } from 'react-redux';
import { HideUserProfile, ProfileAction, UpdateUserStart } from '../+store/profile/profile.actions';
import spinner from '../../shared/icons/spinner.svg';
import { RootState } from '../../store/store.modal';
import { User } from '../models/User';
import UserProfileForm from './UserProfileForm';

interface StoreProps {
  selectedUser?: User;
  showModal: boolean;
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
  showModal,
  isLoaded,
  errors,
  updateUser,
  hideUserProfile
}: AllProps) => {
  const [isSubmitted, setIsSubmittedStatus] = useState<boolean>(false);

  const resetFormDataEffect = () => {
    setIsSubmittedStatus(false);
  };

  useEffect(resetFormDataEffect, [selectedUser]);

  const onSubmit = (user: User) => {
    updateUser(user);
    setIsSubmittedStatus(true);
  };

  const renderSpinner = (
    <>
      <img src={spinner} className="spinner is-in-modal" alt="logo" />
      {isSubmitted && <p className="is-size-3 has-text-white is-in-modal">Saving</p>}
    </>
  );

  const renderForm = selectedUser ? (
    <UserProfileForm user={selectedUser} errors={errors} onCancel={hideUserProfile} onSubmit={onSubmit} />
  ) : (
    <></>
  );

  const renderModalContent = isLoaded ? renderForm : renderSpinner;

  return (
    <Modal show={showModal} showClose={false} closeOnEsc={true} onClose={hideUserProfile}>
      {renderModalContent}
    </Modal>
  );
};

const mapStateToProps = ({ profile }: RootState): StoreProps => {
  return {
    selectedUser: profile.selectedUser,
    showModal: profile.showUserProfileModal,
    isLoaded: profile.isLoaded,
    errors: profile.errors
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ProfileAction>): DispatchProps => ({
  updateUser: (user: User) => dispatch(new UpdateUserStart({ user })),
  hideUserProfile: () => dispatch(new HideUserProfile())
});

export default connect<StoreProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileModal);
