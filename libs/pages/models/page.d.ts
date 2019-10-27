import { Page } from '@pageTemplates';
import { Observable } from 'rxjs';

export interface IGetPages {
  getPage: (page: string) => Observable<Page>;
}
