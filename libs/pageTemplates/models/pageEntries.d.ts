import { Item, List } from '@lists';
import { Entry, NomralisedEntry } from '@templateEntries';

export interface Dictionary<T> {
  [key: string]: T;
}

export interface PageTemplate {
  isLoading: boolean;
  pageEntries: NomralisedEntry[];
  template: string;
}

export interface Page {
  id: string;
  isStatic: boolean;
  isSystemPage: boolean;
  metadata: Metadata;
  key: string;
  path: string;
  template: string;
  title: string;
  entries: Entry[];
  item?: Item;
  list?: List;
}

export interface Metadata {
  description: string;
  keywords: string[];
}
