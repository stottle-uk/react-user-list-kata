import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/HttpService';
import { Config, IGetConfig } from '../models/Config';

export class ConfigService implements IGetConfig {
  constructor(private httpService: HttpService) {}

  get(): Observable<Config> {
    return this.httpService.get(`/config`);
  }
}
