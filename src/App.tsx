import React, { useState } from 'react';
import './App.css';
import UserProfile from './users/components/UserProfile';
import UsersList from './users/components/UsersList';
import { BaseUser } from './users/models/User';

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<BaseUser>();

  const onUserClick = (user: BaseUser) => setSelectedUser(user);

  const onUserCancel = () => setSelectedUser(undefined);

  return (
    <div className="App">
      {!selectedUser && <UsersList onUserClick={onUserClick} />}
      {selectedUser && <UserProfile user={selectedUser} onCancel={onUserCancel} />}
    </div>
  );
};

export default App;
