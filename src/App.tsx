import React from 'react';
import { Container, Navbar } from 'react-bulma-components';
import './App.css';
import UserProfileModal from './users/components/UserProfileModal';
import UsersList from './users/components/UsersList';

const App: React.FC = () => {
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
      <UserProfileModal />
    </>
  );
};

export default App;
