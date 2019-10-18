import Notification from 'libs/notifications/components/Notification';
import Header from 'libs/shared/layout/Header';
import UserProfileModal from 'libs/users/components/UserProfileModal';
import Users from 'libs/users/components/Users';
import React from 'react';
import { Container, Section } from 'react-bulma-components';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container className="has-background-white-ter">
        <Section>
          <Users />
        </Section>
      </Container>
      <UserProfileModal />
      <Notification />
    </>
  );
};

export default App;
