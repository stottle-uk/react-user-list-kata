import React from 'react';
import { TextEntry } from '../../models/pageTemplateEntries';

const TextHeading: React.FC<TextEntry> = ({ text }) => {
  console.log();

  return (
    <div className="content has-background-grey-darker text-heading">
      <h3 className="is-size-2 is-uppercase has-text-white caption">{text}</h3>
    </div>
  );
};

export default TextHeading;
