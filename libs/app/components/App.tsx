import { Notification } from '@notifications';
import { Page } from '@pages';
import { UserProfileModal } from '@users';
import React from 'react';
import { Container, Section } from 'react-bulma-components';
import './App.css';
import Header from './layout/Header';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container className="has-background-white-ter">
        <Section>
          <Page />
        </Section>
      </Container>
      <UserProfileModal />
      <Notification />
    </>
  );
};

export default App;
