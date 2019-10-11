import { AxiosError, AxiosResponse } from 'axios';
import Axios from 'axios-observable';
import { Observable, throwError, timer } from 'rxjs';
import { delayWhen, map, retryWhen, scan, tap } from 'rxjs/operators';
import { BaseUser, IGetUsers, IUpdateUsers, User } from '../models/User';

export class UsersService implements IGetUsers, IUpdateUsers {
  private baseUrl = 'http://localhost:3000';
  private maxRetryCount = 10;
  private defaulDelay = 200;

  getAll(): Observable<BaseUser[]> {
    return this.getWithRetry(`/users`).pipe(tap(console.log));
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
        retryWhen((errors: Observable<AxiosError<T>>) =>
          errors.pipe(
            scan<AxiosError<T>, AxiosError<T>[]>((errorLogs, error) => [...errorLogs, error], []),
            delayWhen(logs => (logs.length < maxRetryCount ? timer(delayTimer) : throwError(logs)))
          )
        )
      );
  }
}
