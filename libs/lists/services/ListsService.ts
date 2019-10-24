import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/HttpService';
import { IGetLists, List } from '../models/lists';

export class ListsService implements IGetLists {
  constructor(private httpService: HttpService) {}

  getLists(listIds: string[]): Observable<List[]> {
    return this.httpService.get(this.buildListUri(listIds));
  }

  getNextPage(nextPageUrl: string): Observable<List> {
    return this.httpService.get(nextPageUrl);
  }

  private buildListUri(listIds: string[]): string {
    const encodedListIds = encodeURIComponent(
      listIds.map(listId => `${listId}|page_size=24`).join(',')
    );
    return `/lists?device=web_browser&ff=idp,ldp&ids=${encodedListIds}&segments=globo,trial&sub=Subscriber`;
  }
}
