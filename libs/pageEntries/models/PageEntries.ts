import { List } from '@lists';

export interface Dictionary<T> {
  [key: string]: T;
}

export interface PageTemplateData {
  loading: boolean;
  listsLoading: boolean;
  pageEntry?: PageEntry;
  lists: Dictionary<List>;
}

export interface PageEntry {
  id: string;
  isStatic: boolean;
  isSystemPage: boolean;
  metadata: any;
  key: string;
  path: string;
  template: string;
  title: string;
  entries: Entry[];
  list?: List;
}

export interface Metadata {
  description: string;
  keywords: string[];
}

export interface Images {
  hero3x1?: string;
  poster?: string;
  wallpaper?: string;
  logo?: string;
  tile?: string;
}

export interface CustomFields2 {
  customTagline?: string;
  assetTitlePosition?: string;
  moreLinkUrl?: string;
}

export interface Entry {
  type: string;
  id: string;
  template: string;
  title: string;
  list: List;
  customFields?: CustomFields2;
}