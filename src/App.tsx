import React from 'react';
import { Container, Modal, Navbar } from 'react-bulma-components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import './App.css';
import { HideUserProfile, UsersAction } from './users/+store/actions';
import UserProfile from './users/components/UserProfile';
import UsersList from './users/components/UsersList';
import { BaseUser } from './users/models/User';

interface StoreProps {
  selectedUser: BaseUser;
}

interface DispatchProps {
  hideUserProfile: () => void;
}

type AllProps = StoreProps & DispatchProps;

const App: React.FC<AllProps> = ({ selectedUser, hideUserProfile }: AllProps) => {
  const onUserCancel = () => hideUserProfile();

  return (
    <>
      <Navbar className="is-fixed-top has-shadow">
        <Container>
          <div className="navbar-start">
            <div className="navbar-brand">
              <span className="navbar-item">User List Kata</span>
            </div>
          </div>
        </Container>
      </Navbar>
      <Container>
        <UsersList />
      </Container>
      <Modal show={!!selectedUser} onClose={hideUserProfile}>
        {/* <div className="modal-background"></div> */}
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <UserProfile user={selectedUser} onCancel={onUserCancel} />
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success">Save changes</button>
            <button className="button">Cancel</button>
          </footer>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ users }: any): StoreProps => ({
  selectedUser: users.selectedUser
});

const mapDispatchToProps = (dispatch: Dispatch<UsersAction>): DispatchProps => ({
  hideUserProfile: () => dispatch(new HideUserProfile())
});

export default connect<StoreProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
