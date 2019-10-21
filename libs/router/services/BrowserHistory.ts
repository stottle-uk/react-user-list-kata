import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class BrowserHistory {
  get onPopState$(): Observable<string> {
    return fromEvent(window, 'popstate').pipe(
      map(() => this.getLocationPath())
    );
  }

  go(location: string, replace = false): void {
    if (replace) {
      window.history.replaceState({}, window.document.title, location);
    } else {
      window.history.pushState({}, window.document.title, location);
    }
  }

  refresh(): void {
    this.go(this.getLocationPath(), true);
  }

  forward(): void {
    window.history.forward();
  }

  back(): void {
    window.history.back();
  }

  getLocationPath(): string {
    return window.location.pathname + window.location.search;
  }
}
