import React, { useState } from 'react';
import { Container } from 'react-bulma-components';
import './App.css';
import UserProfile from './users/components/UserProfile';
import UsersList from './users/components/UsersList';
import { BaseUser } from './users/models/User';

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<BaseUser>();

  const onUserClick = (user: BaseUser) => setSelectedUser(user);

  const onUserCancel = () => setSelectedUser(undefined);

  return (
    <Container>
      {!selectedUser && <UsersList onUserClick={onUserClick} />}
      {selectedUser && <UserProfile user={selectedUser} onCancel={onUserCancel} />}
    </Container>
  );
};

export default App;
