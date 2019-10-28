import { getLists, List } from '@lists';
import { Entry, ItemEntry, ListEntry } from '@pageTemplateEntries';
import { getCurrentPath } from '@router';
import { createSelector } from 'reselect';
import { Page, PageTemplate } from '../models/page';
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

export const getCurrentPage = createSelector(
  [getCurrentPath, getPages],
  (path, pages) => pages[path]
);

export const getPageEntries = createSelector(
  [getCurrentPage, getLists],
  (page, lists): PageTemplate => ({
    pageEntries: normaliseEntries(page, lists),
    templateName: page && page.template
  })
);

function normaliseEntries(page: Page, lists: Dictionary<List>) {
  const buildEntry = (page: Page, entry: Entry) => {
    if (entry.type === 'ItemDetailEntry' && page.item) {
      return {
        ...entry,
        item: page.item
      } as ItemEntry;
    }
    if (entry.type === 'ListDetailEntry' && page.list) {
      return {
        ...entry,
        list: page.list
      } as ListEntry;
    }
    return entry;
  };

  const getEntry = (page: Page, entry: Entry): Entry => {
    const newEntry = buildEntry(page, entry);
    const foundList =
      newEntry.list && lists[newEntry.list.id]
        ? lists[newEntry.list.id]
        : (newEntry.list as List);

    if (foundList) {
      return {
        ...newEntry,
        list: foundList
      };
    } else {
      return newEntry;
    }
  };

  return !!page && !!page.entries
    ? page.entries.map(entry => getEntry(page, entry))
    : [];
}
