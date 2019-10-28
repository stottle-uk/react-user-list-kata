import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/HttpService';
import { Config, IGetConfig } from '../models/config.d';

export class ConfigService implements IGetConfig {
  constructor(private httpService: HttpService) {}

  get(): Observable<Config> {
    return this.httpService.get(
      `/config?device=web_browser&ff=idp%2Cldp&include=classification%2Csubscription%2Csitemap%2Cnavigation%2CprofileImages%2Cgeneral%2Calerts%2CchromecastReceiver%2Clinear`
    );
  }
}
