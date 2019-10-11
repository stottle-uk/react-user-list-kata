import { Observable } from 'rxjs';

export interface BaseUser {
  id: string;
  username: string;
}

export interface User extends BaseUser {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  county: string;
  country: string;
  postcode: string;
}

export interface IGetUsers {
  getAll: () => Observable<BaseUser[]>;
  getById: (userId: string) => Observable<User>;
}

export interface IUpdateUsers {
  update: (user: Partial<User>) => Observable<User>;
}
