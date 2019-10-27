import { NomralisedEntry } from '@pageTemplateEntries';
import { PageTemplate } from '@pageTemplates';
import React from 'react';

export default function configPage(
  Page: React.FC<PageTemplate>,
  pageEntryTemplates: Dictionary<React.ComponentType<NomralisedEntry>>
): React.FC<PageTemplate> {
  function renderEntries(entries: NomralisedEntry[]) {
    return entries.map(entry => {
      const template = pageEntryTemplates[entry.template];
      return renderTemplate(entry, template);
    });
  }

  const renderTemplate = (
    entry: NomralisedEntry,
    Template: React.ComponentType<NomralisedEntry>
  ) => {
    return (
      <div key={entry.id}>
        {Template ? (
          <Template {...entry} />
        ) : (
          <div>{entry.template} not found</div>
        )}
      </div>
    );
  };

  return props => {
    return props.isLoading ? (
      <div>LOADING!!!!</div>
    ) : (
      <Page {...props}>{renderEntries(props.pageEntries)}</Page>
    );
  };
}
