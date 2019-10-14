import React from 'react';
import { Container } from 'react-bulma-components';
import './App.css';
import Header from './shared/layout/Header';
import UserProfileModal from './users/components/UserProfileModal';
import Users from './users/components/Users';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Users />
      </Container>
      <UserProfileModal />
    </>
  );
};

export default App;
