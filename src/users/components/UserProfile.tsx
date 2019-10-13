import React, { Dispatch, useState } from 'react';
import { Modal } from 'react-bulma-components';
import { connect } from 'react-redux';
import { HideUserProfile, UpdateUserStart, UsersAction } from '../+store/users.actions';
import { FormStatus } from '../../shared/forms/Form';
import spinner from '../../shared/icons/spinner.svg';
import { User } from '../models/User';
import UserProfileForm from './UserProfileForm';

interface StoreProps {
  selectedUser: User;
  isLoading: false;
  isLoaded: false;
}

interface DispatchProps {
  updateUser: (user: User) => void;
  hideUserProfile: () => void;
}

type AllProps = StoreProps & DispatchProps;

const UserProfile: React.FC<AllProps> = ({
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

  const renderForm = (
    <UserProfileForm user={selectedUser} formStatus={formStatus} onCancel={hideUserProfile} onSubmit={onSubmit} />
  );

  const renderModalContent = isLoaded ? renderForm : renderSpinner;

  return (
    <Modal show={!!selectedUser} onClose={hideUserProfile}>
      {/* <div className="modal-background"></div> */}
      {renderModalContent}
    </Modal>
  );
};

const mapStateToProps = ({ users }: any): StoreProps => ({
  selectedUser: !!users.selectedUser && users.users.find((u: User) => u.id === users.selectedUser.id),
  isLoading: users.isLoading,
  isLoaded: users.isLoaded
});

const mapDispatchToProps = (dispatch: Dispatch<UsersAction>): DispatchProps => ({
  updateUser: (user: User) => dispatch(new UpdateUserStart({ user })),
  hideUserProfile: () => dispatch(new HideUserProfile())
});

export default connect<StoreProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
