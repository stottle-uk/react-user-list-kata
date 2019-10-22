import { PageEntry } from '@pageEntries';
import { Observable } from 'rxjs';

export interface IGetPages {
  getPage: (page: string) => Observable<PageEntry>;
}
