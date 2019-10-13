import React from 'react';
import { Container, Navbar } from 'react-bulma-components';
import './App.css';
import UserProfile from './users/components/UserProfile';
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
      <UserProfile />
    </>
  );
};

export default App;
