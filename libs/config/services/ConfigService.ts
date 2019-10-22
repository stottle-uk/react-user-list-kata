import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/HttpService';
import { Config, IGetConfig } from '../models/Config';

export class ConfigService implements IGetConfig {
  constructor(private httpService: HttpService) {}

  get(): Observable<Config> {
    return this.httpService.get(
      `/config?device=web_browser&ff=idp%2Cldp&include=classification%2Csubscription%2Csitemap%2Cnavigation%2CprofileImages%2Cgeneral%2Calerts%2CchromecastReceiver%2Clinear`
    );
  }

  getPage(path: string): Observable<any> {
    return this.httpService.get<any>(this.buildPageUrl(path));
  }

  private buildPageUrl(path: string): string {
    const encodePath = encodeURIComponent(path);

    return `/page?device=web_browser&ff=idp%2Cldp&list_page_size=24&max_list_prefetch=3&path=${encodePath}&segments=globo%2Ctrial&sub=Subscriber&text_entry_format=html`;
  }
}
