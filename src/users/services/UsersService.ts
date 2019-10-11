import { AxiosResponse } from 'axios';
import Axios from 'axios-observable';
import { Observable, throwError, timer } from 'rxjs';
import { delayWhen, map, retryWhen, scan } from 'rxjs/operators';
import { BaseUser, IGetUsers, IUpdateUsers, User } from '../models/User';

export class UsersService implements IGetUsers, IUpdateUsers {
  private baseUrl = 'http://localhost:3000';
  private maxRetryCount = 5;
  private defaulDelay = 200;

  getAll(): Observable<BaseUser[]> {
    return this.getWithRetry(`/users`);
  }

  getById(userId: string): Observable<User> {
    return this.getWithRetry(`/users/${userId}`);
  }

  update(user: Partial<User>): Observable<User> {
    return this.postWithRetry(`/users/${user.id}`, user);
  }

  private getWithRetry<T>(url: string): Observable<T> {
    return Axios.get<T>(`${this.baseUrl}${url}`).pipe(this.retryStrategy());
  }

  private postWithRetry<T>(url: string, data: Partial<T>): Observable<T> {
    return Axios.post<T>(`${this.baseUrl}${url}`, data).pipe(this.retryStrategy());
  }

  private retryStrategy<T>(
    maxRetryCount = this.maxRetryCount,
    delayTimer = this.defaulDelay
  ): (source: Observable<AxiosResponse<T>>) => Observable<T> {
    return source =>
      source.pipe(
        map(response => response.data),
        retryWhen(errors =>
          errors.pipe(
            scan(errorCount => ++errorCount, 0),
            delayWhen(retryCount =>
              retryCount < maxRetryCount ? timer(delayTimer) : throwError(`${errors} failed with ${retryCount} retries`)
            )
          )
        )
      );
  }
}
