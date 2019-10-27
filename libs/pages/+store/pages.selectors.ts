import { getIsLoading as getIsListsLoading, getLists, List } from '@lists';
import { Entry, NomralisedEntry } from '@pageTemplateEntries';
import { Dictionary, Page, PageTemplate } from '@pageTemplates';
import { getCurrentPath } from '@router';
import { createSelector } from 'reselect';
import { PagesState } from './pages.reducer';

const getState = (state: PagesState) => state;

export const getPages = createSelector(
  [getState],
  state => state.pages
);

export const getIsLoading = createSelector(
  [getState],
  state => state.isLoading
);

export const getPageData = createSelector(
  [getCurrentPath, getPages, getIsLoading, getLists, getIsListsLoading],
  (path, pages, isLoading, lists, listsLoading) => ({
    pageEntry: pages[path],
    isLoading,
    lists,
    listsLoading
  })
);

export const getPageData2 = createSelector(
  [getCurrentPath, getPages, getIsLoading, getLists],
  (path, pages, isLoading, lists): PageTemplate => ({
    pageEntries: normaliseEntries(pages[path], lists),
    isLoading,
    template: pages[path] && pages[path].template
  })
);

function normaliseEntries(page: Page, lists: Dictionary<List>) {
  const buildEntry = (page: Page, entry: Entry): NomralisedEntry => {
    const defaultList = {
      items: [page.item],
      id: 'dummyId',
      tagline: 'dummyTagline',
      path: 'dummyTagPath',
      paging: {
        page: -1
      }
    };
    if (entry.type === 'ItemDetailEntry' && page.item) {
      return {
        ...entry,
        list: {
          ...defaultList,
          items: [page.item]
        }
      };
    }
    if (entry.type === 'ListDetailEntry') {
      return {
        ...entry,
        list: {
          ...defaultList,
          ...page.list,
          items: page.list ? page.list.items : []
        }
      };
    }

    return entry as NomralisedEntry;
  };

  const getEntry = (page: Page, entry: Entry): NomralisedEntry => {
    const newEntry = buildEntry(page, entry);
    const foundList =
      newEntry.list && lists[newEntry.list.id]
        ? lists[newEntry.list.id]
        : newEntry.list;
    return {
      ...entry,
      list: foundList
    };
  };

  return !!page && !!page.entries
    ? page.entries.map(entry => getEntry(page, entry))
    : [];
}
