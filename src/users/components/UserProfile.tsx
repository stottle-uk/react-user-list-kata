import React, { Dispatch } from 'react';
import { Modal } from 'react-bulma-components';
import { connect } from 'react-redux';
import { HideUserProfile, UpdateUserStart, UsersAction } from '../+store/actions';
import { User } from '../models/User';
import UserProfileForm from './UserProfileForm';

interface StoreProps {
  selectedUser: User;
}

interface DispatchProps {
  updateUser: (user: User) => void;
  hideUserProfile: () => void;
}

type AllProps = StoreProps & DispatchProps;

const UserProfile: React.FC<AllProps> = ({ selectedUser, updateUser, hideUserProfile }: AllProps) => {
  const onSubmit = (user: User) => {
    console.log(user);
    updateUser(user);
  };

  return (
    <Modal show={!!selectedUser} onClose={hideUserProfile}>
      {/* <div className="modal-background"></div> */}
      <UserProfileForm user={selectedUser} onCancel={hideUserProfile} onSubmit={onSubmit} />
    </Modal>
  );
};

const mapStateToProps = ({ users }: any): StoreProps => ({
  selectedUser: !!users.selectedUser && users.users.find((u: User) => u.id === users.selectedUser.id)
});

const mapDispatchToProps = (dispatch: Dispatch<UsersAction>): DispatchProps => ({
  updateUser: (user: User) => dispatch(new UpdateUserStart({ user })),
  hideUserProfile: () => dispatch(new HideUserProfile())
});

export default connect<StoreProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
