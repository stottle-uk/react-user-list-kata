import React, { Dispatch } from 'react';
import { Modal } from 'react-bulma-components';
import { connect } from 'react-redux';
import { HideUserProfile, UsersAction } from '../+store/actions';
import { User } from '../models/User';
import UserProfileForm from './UserProfileForm';

interface StoreProps {
  selectedUser: User;
}

interface DispatchProps {
  hideUserProfile: () => void;
}

type AllProps = StoreProps & DispatchProps;

const UserProfile: React.FC<AllProps> = ({ selectedUser, hideUserProfile }: AllProps) => {
  const onSubmit = (user: User) => {}; //usersService.update(user).pipe(tap(() => onCancel()));

  return (
    <Modal show={!!selectedUser} onClose={hideUserProfile}>
      {/* <div className="modal-background"></div> */}
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <UserProfileForm user={selectedUser} onCancel={hideUserProfile} onSubmit={onSubmit} />
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
          <button className="button">Cancel</button>
        </footer>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ users }: any): StoreProps => ({
  selectedUser: !!users.selectedUser && users.users.find((u: User) => u.id === users.selectedUser.id)
});

const mapDispatchToProps = (dispatch: Dispatch<UsersAction>): DispatchProps => ({
  hideUserProfile: () => dispatch(new HideUserProfile())
});

export default connect<StoreProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
