import React from 'react';
import './App.css';
import UsersList from './users/components/UsersList';

const App: React.FC = () => {
  return (
    <div className="App">
      <UsersList></UsersList>
    </div>
  );
};

export default App;
