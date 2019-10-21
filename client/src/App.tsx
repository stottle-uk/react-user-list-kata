import { Notification } from '@notifications';
import { Router } from '@router';
import { UserProfileModal } from '@users';
import React from 'react';
import { Container, Section } from 'react-bulma-components';
import './App.css';
import Header from './layout/Header';
import { templateMap } from './router/routes';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container className="has-background-white-ter">
        <Section>
          <Router routeData={{}} templateMap={templateMap}>
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
