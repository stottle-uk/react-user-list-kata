import { List } from '@lists';
import { pageTemplateEntries } from '@templateEntries';
import React from 'react';
import { Dictionary, PageEntry, PageTemplateData } from '../models/PageEntries';

function renderEntries(
  page: PageEntry,
  lists: Dictionary<List>
): JSX.Element[] {
  return page.entries.map(entry => {
    const Template = pageTemplateEntries[entry.template];
    const list = entry.type === 'ListDetailEntry' ? page.list : entry.list;

    if (list) {
      const foundList = lists[list.id];

      return (
        <div key={entry.id}>
          {/* <pre>{JSON.stringify(foundList, undefined, 2)}</pre> */}
          {Template ? (
            <Template {...foundList} />
          ) : (
            <div> {entry.template} not found</div>
          )}
        </div>
      );
    }
    return <span key={entry.id} />;
  });
}

const ListDetailFeatured: React.FC<PageTemplateData> = ({
  pageEntry,
  isLoading,
  lists
}) => {
  return (
    <>
      {isLoading && <div>isLoading</div>}
      {pageEntry && pageEntry.entries && renderEntries(pageEntry, lists)}
      {/* <pre>{JSON.stringify(pageEntry, undefined, 2)} </pre> */}
    </>
  );
};

export default ListDetailFeatured;
