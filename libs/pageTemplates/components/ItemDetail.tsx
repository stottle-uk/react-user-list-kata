import { pageTemplateEntries } from '@pageTemplateEntries';
import React from 'react';
import { PageTemplate } from '../models/pageEntries';
import configPage from '../utils/templateRenderer';

const ItemDetail: React.FC<PageTemplate> = ({ children }) => {
  return <>{children}</>;
};

export default configPage(ItemDetail, pageTemplateEntries);
