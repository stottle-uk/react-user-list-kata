import React from 'react';
import { Container, Section } from 'react-bulma-components';
import './App.css';
import Header from './shared/layout/Header';
import UserProfileModal from './users/components/UserProfileModal';
import Users from './users/components/Users';

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
    </>
  );
};

export default App;
