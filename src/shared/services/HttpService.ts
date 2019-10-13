import { AxiosError, AxiosResponse } from 'axios';
import Axios from 'axios-observable';
import { Observable, throwError, timer } from 'rxjs';
import { delay, delayWhen, map, retryWhen, scan } from 'rxjs/operators';

export interface HttpServiceOptions {
  baseUrl: string;
  defaultMaxRetryCount: number;
  defaultRetryDelay: number;
}

export class HttpService {
  constructor(private options: HttpServiceOptions) {}

  get<T>(url: string): Observable<T> {
    return this.getWithRetry(url);
  }

  put<T>(url: string, data: Partial<T>): Observable<T> {
    return this.postWithRetry(url, data);
  }

  private getWithRetry<T>(url: string): Observable<T> {
    return Axios.get<T>(`${this.options.baseUrl}${url}`).pipe(this.retryStrategy());
  }

  private postWithRetry<T>(url: string, data: Partial<T>): Observable<T> {
    return Axios.post<T>(`${this.options.baseUrl}${url}`, data).pipe(this.retryStrategy());
  }

  private retryStrategy<T>(
    maxRetryCount = this.options.defaultMaxRetryCount,
    delayTimer = this.options.defaultRetryDelay
  ): (source: Observable<AxiosResponse<T>>) => Observable<T> {
    return source =>
      source.pipe(
        map(response => response.data),
        delay(500),
        retryWhen((errors: Observable<AxiosError<T>>) =>
          errors.pipe(
            scan<AxiosError<T>, AxiosError<T>[]>((errorLogs, error) => [...errorLogs, error], []),
            delayWhen(logs => (logs.length < maxRetryCount ? timer(delayTimer) : throwError(logs)))
          )
        )
      );
  }
}
