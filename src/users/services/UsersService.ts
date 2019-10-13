import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../shared/services/HttpService';
import { BaseUser, IGetUsers, IUpdateUsers, User } from '../models/User';

export class UsersService implements IGetUsers, IUpdateUsers {
  constructor(private httpService: HttpService) {}

  getAll(): Observable<BaseUser[]> {
    return this.httpService.get<BaseUser[]>(`/users`).pipe(map(users => users.sort(this.byUsername)));
  }

  getById(userId: string): Observable<User> {
    return this.httpService.get(`/users/${userId}`);
  }

  update(user: Partial<User>): Observable<User> {
    return this.httpService.put(`/users/${user.id}`, user);
  }

  private byUsername = (a: BaseUser, b: BaseUser) => {
    if (a.username < b.username) {
      return -1;
    }
    if (a.username > b.username) {
      return 1;
    }
    return 0;
  };
}
