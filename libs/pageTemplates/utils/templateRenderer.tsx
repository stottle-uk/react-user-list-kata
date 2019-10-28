import { getIsLoading, getPageEntries } from '@pages';
import { AllEntryTypes, Entry } from '@pageTemplateEntries';
import { PageTemplate } from '@pageTemplates';
import { RouteData } from '@router';
import { RootState } from '@store';
import React from 'react';
import { connect } from 'react-redux';

interface StoreProps {
  pageTemplate: PageTemplate;
  isLoading: boolean;
}

type AllProps = RouteData & StoreProps;

export default function configPage<T extends Entry>(
  Page: React.FC<RouteData>,
  pageEntryTemplates: AllEntryTypes
): React.FC<RouteData> {
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

  const mapStateToProps = ({
    pages,
    router,
    lists
  }: RootState): StoreProps => ({
    pageTemplate: getPageEntries({ ...pages, ...router, ...lists }),
    isLoading: getIsLoading(pages)
  });

  const component = (props: AllProps) =>
    props.isLoading ? (
      <div>LOADING!!!!</div>
    ) : (
      <Page {...props}>{renderEntries(props.pageTemplate.pageEntries)}</Page>
    );

  return connect<StoreProps, {}, {}, RootState>(mapStateToProps)(component);
}
