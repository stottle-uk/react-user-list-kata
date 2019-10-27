import { Page } from '@pageEntries';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from '../../shared/services/HttpService';
import { IGetPages } from '../models/page.t';

export class PagesService implements IGetPages {
  constructor(private httpService: HttpService) {}

  getPage(path: string): Observable<Page> {
    return this.httpService.get<Page>(this.buildPageUrl(path)).pipe(
      tap(page => {
        const t = page.entries.map(e => {
          return {
            title: page.title,
            page: page.template,
            template: e.template,
            type: e.type,
            hasList: !!e.list
          };
        });

        console.log('page', t);
      })
    );
  }

  private buildPageUrl(path: string): string {
    const encodePath = encodeURIComponent(path);

    return `page?device=web_browser&ff=idp%2Cldp&list_page_size=24&max_list_prefetch=3&path=${encodePath}&text_entry_format=html`;
  }
}
