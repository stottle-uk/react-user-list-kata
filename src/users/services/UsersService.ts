import Axios from 'axios-observable';
import { Observable, throwError, timer } from 'rxjs';
import { delayWhen, map, retryWhen, scan } from 'rxjs/operators';
import { User } from '../models/User';

interface IGetUsers {
  getAll: () => Observable<User[]>;
  getById: (userId: string) => Observable<User>;
}

interface IUpdateUsers {
  updateUser: (user: Partial<User>) => Observable<User>;
}

export class UsersService implements IGetUsers, IUpdateUsers {
  private baseUrl = 'http://localhost:3000';

  getAll() {
    return this.getWithRetry<User[]>(`/users`);
  }

  getById(userId: string) {
    return this.getWithRetry<User>(`/users/${userId}`);
  }

  updateUser(user: Partial<User>) {
    return Observable.create(user);
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
