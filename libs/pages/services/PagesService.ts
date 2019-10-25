import { PageEntry } from '@pageEntries';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/HttpService';
import { IGetPages } from '../models/Page';

export class PagesService implements IGetPages {
  constructor(private httpService: HttpService) {}

  getPage(path: string): Observable<PageEntry> {
    return this.httpService.get(this.buildPageUrl(path));
  }

  private buildPageUrl(path: string): string {
    const encodePath = encodeURIComponent(path);

    return `page?device=web_browser&ff=idp%2Cldp&list_page_size=24&max_list_prefetch=3&path=${encodePath}&text_entry_format=html`;
  }
}
