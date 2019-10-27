import { pageTemplateEntries } from '@templateEntries';
import React from 'react';
import { PageTemplate } from '../models/pageEntries';
import configPage from '../utils/templateRenderer';

const ListDetailFeatured: React.FC<PageTemplate> = ({ children }) => {
  return <>{children}</>;
};

export default configPage(ListDetailFeatured, pageTemplateEntries);
