import React, { useState } from 'react';
import { Container, Navbar } from 'react-bulma-components';
import './App.css';
import UserProfile from './users/components/UserProfile';
import UsersList from './users/components/UsersList';
import { BaseUser } from './users/models/User';

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<BaseUser>();

  const onUserClick = (user: BaseUser) => setSelectedUser(user);

  const onUserCancel = () => setSelectedUser(undefined);

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
        {!selectedUser && <UsersList onUserClick={onUserClick} />}
        {selectedUser && <UserProfile user={selectedUser} onCancel={onUserCancel} />}
      </Container>
    </>
  );
};

export default App;
