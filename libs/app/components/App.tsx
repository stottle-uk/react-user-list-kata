import { Notification } from '@notifications';
import { Page } from '@pages';
import { UserProfileModal } from '@users';
import React from 'react';
import { Container } from 'react-bulma-components';
import './App.scss';
import Header from './layout/Header';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container className="no-margin is-fluid is-gapless">
        <Page />
      </Container>
      <UserProfileModal />
      <Notification />
    </>
  );
};

export default App;
