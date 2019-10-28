import React from 'react';
import { ListEntry } from '../../models/pageTemplateEntries';

const LH1TemplateEntry: React.FC<ListEntry> = ({ list }) => (
  <div className="card">
    <div className="card-content">
      <h1 className="is-size-3">{list.title}</h1>
      <h2 className="is-size-5">{list.tagline}</h2>
    </div>
  </div>
);

export default LH1TemplateEntry;
