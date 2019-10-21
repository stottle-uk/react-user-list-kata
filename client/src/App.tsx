import { Notification } from '@notifications';
import { UserProfileModal } from '@users';
import Router from 'libs/router/components/Router';
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
          <Router routeData={{}}>
            <span>Not Found</span>
          </Router>
        </Section>
      </Container>
      <UserProfileModal />
      <Notification />
    </>
  );
};

export default App;
