import { Item, List } from '@lists';
import { Entry, ItemEntry } from '@pageTemplateEntries';
import { Observable } from 'rxjs';

export interface IGetPages {
  getPage: (page: string) => Observable<Page>;
}

export interface PageTemplate {
  pageEntries: (ListEntry | ItemEntry)[];
  templateName: string;
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
