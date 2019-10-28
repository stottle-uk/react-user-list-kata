import { pageTemplateEntries } from '@pageTemplateEntries';
import { RouteData } from '@router';
import React from 'react';
import configPage from '../utils/templateRenderer';

const ListDetailFeatured: React.FC<RouteData> = ({ children }) => {
  return <>{children}</>;
};

export default configPage(ListDetailFeatured, pageTemplateEntries);
