import { List } from '@lists';
import { pageTemplateEntries } from '@templateEntries';
import React from 'react';
import { Dictionary, Entry, PageTemplateData } from '../models/PageEntries';

function renderEntries(
  entries: Entry[],
  lists: Dictionary<List>
): JSX.Element[] {
  return entries.map(entry => {
    if (entry.type === 'ListEntry') {
      const Template = pageTemplateEntries[entry.template];
      const list = lists[entry.list.id];

      return (
        <div key={entry.id} className="row no-gutters">
          <div className="col">
            {Template ? (
              <Template {...list} />
            ) : (
              <div> {entry.template} not found</div>
            )}
          </div>
        </div>
      );
    }
    return <span key={entry.id} />;
  });
}

const Home: React.FC<PageTemplateData> = ({ pageEntry, isLoading, lists }) => {
  return !!pageEntry ? (
    <>
      <h1>{pageEntry.title}</h1>
      {pageEntry.entries && renderEntries(pageEntry.entries, lists)}
      {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
    </>
  ) : (
    <span></span>
  );
};

export default Home;
