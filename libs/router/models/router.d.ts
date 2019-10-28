export interface RouterConfigRoute<T> {
  name: string;
  path: string;
  template: string;
}

export interface RouteData {
  data: Dictionary<string>;
  children?: React.ReactNode;
}
