import { Observable } from 'rxjs';

export interface Config {
  sitemap: any[];
}

export interface IGetConfig {
  get: () => Observable<Config>;
}
