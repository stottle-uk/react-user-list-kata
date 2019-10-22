import React from 'react';
import { PageTemplateData } from '../models/PageEntries';

const ListDetailFeatured: React.FC<PageTemplateData> = ({
  pageEntry,
  loading
}) => {
  return (
    <>
      <pre>{JSON.stringify(pageEntry, undefined, 2)} </pre>
    </>
  );
};

export default ListDetailFeatured;
