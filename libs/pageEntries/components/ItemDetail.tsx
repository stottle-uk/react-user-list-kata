import { List } from '@lists';
import { pageTemplateEntries } from '@templateEntries';
import React from 'react';
import { Dictionary, PageEntry, PageTemplateData } from '../models/pageEntries';

function renderEntries(
  page: PageEntry,
  lists: Dictionary<List>
): JSX.Element[] {
  const renderTemplate = (
    key: string,
    name: string,
    data: any,
    Template: React.ComponentType<any>
  ) => {
    return (
      <div key={key}>
        {Template ? <Template {...data} /> : <div> {name} not found</div>}
        {/* <Template item5={page.item} /> */}
      </div>
    );
  };

  return page.entries.map(entry => {
    const template = pageTemplateEntries[entry.template];

    if (entry.type === 'ItemDetailEntry') {
      return renderTemplate(entry.id, entry.template, page.item, template);
    }

    const list = entry.type === 'ListDetailEntry' ? page.list : entry.list;

    if (list) {
      const foundList = lists[list.id];

      return renderTemplate(entry.id, entry.template, foundList, template);
    }
    return <span key={entry.id} />;
  });
}

const ItemDetail: React.FC<PageTemplateData> = ({
  pageEntry,
  isLoading,
  lists
}) => {
  return !!pageEntry ? (
    <>
      {pageEntry && renderEntries(pageEntry, lists)}
      {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
    </>
  ) : (
    <span></span>
  );
};

export default ItemDetail;
