import { Observable } from 'rxjs';

export interface IGetLists {
  getLists: (listIds: string[]) => Observable<List[]>;
}

export interface List {
  id: string;
  itemTypes?: string[];
  description?: string;
  tagline: string;
  title?: string;
  shortDescription?: string;
  path: string;
  items: Item[];
  size?: number;
  paging: Paging;
  images?: Images2;
}

export interface Item {
  images: Images;
  duration?: number;
  releaseYear?: number;
  offers?: Offer[];
  scopes?: string[];
  categories?: string[];
  customFields?: any;
  customId?: string;
  genres?: string[];
  id?: string;
  type?: string;
  mouseOverDescription?: string;
  shortDescription?: string;
  description?: string;
  contextualTitle?: string;
  title?: string;
  classification?: Classification;
  totalUserRatings?: number;
  path: string;
  watchPath?: string;
  averageUserRating?: number;
  badge?: string;
  tagline?: string;
}

export interface Paging {
  total?: number;
  page: number;
  size?: number;
  options?: Options;
  next?: string;
  authorization?: Authorization;
}

export interface Images2 {
  wallpaper: string;
}

export interface Offer {
  deliveryType: string;
  scopes: string[];
  resolution: string;
  availability: string;
  ownership: string;
  price: number;
}

export interface Authorization {
  type: string;
  scope: string;
}

export interface Classification {
  code: string;
  name: string;
}

export interface Options {
  pageSize: number;
}
