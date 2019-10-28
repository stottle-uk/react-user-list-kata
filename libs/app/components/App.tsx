import { Notification } from '@notifications';
import { templateMap } from '@pageTemplates';
import { Router } from '@router';
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
        <Router routeData={{ data: {} }} templateMap={templateMap}>
          <>
            <h1>Not Found</h1>
          </>
        </Router>
      </Container>
      <UserProfileModal />
      <Notification />
    </>
  );
};

export default App;
