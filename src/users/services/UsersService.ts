import Axios from 'axios-observable';
import { Observable, throwError, timer } from 'rxjs';
import { delayWhen, retryWhen, scan } from 'rxjs/operators';

interface IGetUsers {
  getAll: () => Observable<any>;
  getById: (userId: string) => Observable<any>;
}

interface IUpdateUsers {
  updateUser: (user: any) => Observable<any>;
}

export class UsersService implements IGetUsers, IUpdateUsers {
  private baseUrl = 'http://localhost:3000';

  getAll() {
    return this.getWithRetry(`${this.baseUrl}/users`);
  }

  getById() {
    return new Observable();
  }

  updateUser() {
    return new Observable();
  }

  private getWithRetry(url: string): Observable<any> {
    return Axios.get(`${this.baseUrl}/users`).pipe(
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
