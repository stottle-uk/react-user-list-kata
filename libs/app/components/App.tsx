import { Notification } from '@notifications';
import { Page } from '@pages';
import { UserProfileModal } from '@users';
import React from 'react';
import { Container } from 'react-bulma-components';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import './App.css';
import Header from './layout/Header';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container className="no-margin is-fluid is-gapless has-background-black">
        <Page />
      </Container>
      <UserProfileModal />
      <Notification />
    </>
  );
};

export default App;
