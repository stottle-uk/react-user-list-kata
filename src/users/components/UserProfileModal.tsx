import React, { Dispatch, useState } from 'react';
import { Modal } from 'react-bulma-components';
import { connect } from 'react-redux';
import { HideUserProfile, UpdateUserStart, UsersAction } from '../+store/users.actions';
import { FormStatus } from '../../shared/forms/Form';
import spinner from '../../shared/icons/spinner.svg';
import { RootState } from '../../store/store.modal';
import { User } from '../models/User';
import UserProfileForm from './UserProfileForm';

interface StoreProps {
  selectedUser?: User;
  isLoading: boolean;
  isLoaded: boolean;
}

interface DispatchProps {
  updateUser: (user: User) => void;
  hideUserProfile: () => void;
}

type AllProps = StoreProps & DispatchProps;

const UserProfileModal: React.FC<AllProps> = ({
  selectedUser,
  isLoading,
  isLoaded,
  updateUser,
  hideUserProfile
}: AllProps) => {
  const [formStatus, setFormStatus] = useState<FormStatus>({
    isSubmitting: false,
    isSubmitted: false,
    isDirty: false
  });

  const onSubmit = (user: User) => {
    console.log(user);
    updateUser(user);
    setFormStatus({ ...formStatus, isSubmitted: true });
  };

  const renderSpinner = (
    <>
      <img src={spinner} className="spinner is-in-modal" alt="logo" />
      {formStatus.isSubmitted && <p className="is-size-3 has-text-white is-in-modal">Saving</p>}
    </>
  );

  const renderForm = selectedUser && (
    <UserProfileForm user={selectedUser} formStatus={formStatus} onCancel={hideUserProfile} onSubmit={onSubmit} />
  );

  const renderModalContent = isLoaded ? renderForm : renderSpinner;

  return (
    <Modal show={!!selectedUser} showClose={false} onClose={hideUserProfile}>
      {/* <div className="modal-background"></div> */}
      {renderModalContent}
    </Modal>
  );
};

const mapStateToProps = ({ users }: RootState): StoreProps => {
  return {
    selectedUser: users.users.find((u: User) => !!users.selectedUser && u.id === users.selectedUser.id),
    isLoading: users.isLoading,
    isLoaded: users.isLoaded
  };
};

const mapDispatchToProps = (dispatch: Dispatch<UsersAction>): DispatchProps => ({
  updateUser: (user: User) => dispatch(new UpdateUserStart({ user })),
  hideUserProfile: () => dispatch(new HideUserProfile())
});

export default connect<StoreProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileModal);
