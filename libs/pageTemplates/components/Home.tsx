import { pageTemplateEntries } from '@pageTemplateEntries';
import { RouteData } from '@router';
import React from 'react';
import configPage from '../utils/templateRenderer';

const Home: React.FC<RouteData> = ({ children }) => {
  return <>{children}</>;
};

export default configPage(Home, pageTemplateEntries);
