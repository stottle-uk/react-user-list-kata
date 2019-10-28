import { templateMap } from '@pageTemplates';
import { Router, RouterConfigRoute } from '@router';
import React from 'react';
import { Container } from 'react-bulma-components';
import './App.scss';
import Header from './layout/Header';
import PageNotFound from './layout/PageNotFound';

const App: React.FC = () => {
  const getNotFound = (route: RouterConfigRoute) => <PageNotFound {...route} />;
  return (
    <>
      <Header />
      <Container className="no-margin is-fluid is-gapless">
        <Router
          routeData={{ data: {} }}
          templateMap={templateMap}
          notFoundRender={getNotFound}
        >
          <span>Will display when there is no current route set</span>
        </Router>
      </Container>
    </>
  );
};

export default App;
