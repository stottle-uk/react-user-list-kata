export interface RouterConfigRoute {
  name: string;
  path: string;
  template: string;
}

export interface RouteData {
  data: Dictionary<string>;
  children?: React.ReactNode;
}
