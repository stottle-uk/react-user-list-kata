import { List } from '@lists';
import { Observable } from 'rxjs';

export interface IGetConfig {
  get: () => Observable<Config>;
}

export interface Sitemap {
  isStatic: boolean;
  isSystemPage: boolean;
  key: string;
  id: string;
  path: string;
  template: string;
  title: string;
}

export interface Config {
  // subscription: Subscription;
  // general: General;
  // linear: Linear;
  // classification: Classification;
  sitemap: Sitemap[];
  navigation: Navigation;
  // profileImages: ProfileImages;
  // chromecastReceiver: ChromecastReceiver;
  // version: string;
}

export interface Navigation {
  header: NavEntry[];
  footer?: NavEntry;
  account?: NavEntry;
  copyright?: string;
  customFields?: { [key: string]: any };
}

export interface NavEntry {
  depth?: number;
  label?: string;
  path?: string;
  content?: NavContent;
  children?: NavEntry[];
  featured?: boolean;
  customFields?: { [key: string]: any };
}

export interface NavContent {
  title?: string;
  list?: List;
  imageType?: string;
}
