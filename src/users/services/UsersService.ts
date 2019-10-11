import Axios from 'axios-observable';
import { Observable, throwError, timer } from 'rxjs';
import { delayWhen, map, retryWhen, scan } from 'rxjs/operators';
import { BaseUser, IGetUsers, IUpdateUsers, User } from '../models/User';

export class UsersService implements IGetUsers, IUpdateUsers {
  private baseUrl = 'http://localhost:3000';

  getAll() {
    return this.getWithRetry<BaseUser[]>(`/users`);
  }

  getById(userId: string) {
    return this.getWithRetry<User>(`/users/${userId}`);
  }

  update(user: Partial<User>) {
    return Axios.post<User>(`${this.baseUrl}/users/${user.id}`, user).pipe(map(response => response.data));
  }

  private getWithRetry<T>(url: string): Observable<T> {
    return Axios.get<T>(`${this.baseUrl}${url}`).pipe(
      map(response => response.data),
      retryWhen(errors =>
        errors.pipe(
          scan(errorCount => ++errorCount, 0),
          delayWhen(retryCount =>
            retryCount < 4 ? timer(500) : throwError(`${errors} failed with ${retryCount} retries`)
          )
        )
      )
    );
  }
}
