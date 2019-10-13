import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/HttpService';
import { BaseUser, IGetUsers, IUpdateUsers, User } from '../models/User';

export class UsersService implements IGetUsers, IUpdateUsers {
  constructor(private httpService: HttpService) {}

  getAll(): Observable<BaseUser[]> {
    return this.httpService.get<BaseUser[]>(`/users`);
  }

  getById(userId: string): Observable<User> {
    return this.httpService.get(`/users/${userId}`);
  }

  update(user: Partial<User>): Observable<User> {
    return this.httpService.put(`/users/${user.id}`, user);
  }
}
