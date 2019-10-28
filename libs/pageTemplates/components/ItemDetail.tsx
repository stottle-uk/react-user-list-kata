import { templateRenderer } from '@pages';
import { pageTemplateEntries } from '@pageTemplateEntries';
import { RouteData } from '@router';
import React from 'react';

const ItemDetail: React.FC<RouteData> = ({ children }) => {
  return <>{children}</>;
};

export default templateRenderer(ItemDetail, pageTemplateEntries);
