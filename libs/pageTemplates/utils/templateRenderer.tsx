import { AllEntryTypes, Entry } from '@pageTemplateEntries';
import { PageTemplate } from '@pageTemplates';
import React from 'react';

export default function configPage<T extends Entry>(
  Page: React.FC<PageTemplate>,
  pageEntryTemplates: AllEntryTypes
): React.FC<PageTemplate> {
  const getTemplate = (template: string) =>
    pageEntryTemplates[template] as React.ComponentType<T>;

  const renderTemplate = (entry: T, Template: React.ComponentType<T>) => (
    <div key={entry.id}>
      {Template ? (
        <Template {...entry} />
      ) : (
        <div>{entry.template} not found</div>
      )}
    </div>
  );

  const renderEntries = (entries: T[]) =>
    entries.map(entry => renderTemplate(entry, getTemplate(entry.template)));

  return props => <Page {...props}>{renderEntries(props.pageEntries)}</Page>;
}

// return props.isLoading ? (
//   <div>LOADING!!!!</div>
// ) : (
//   <Page {...props}>{renderEntries(props.pageEntries)}</Page>
// );
