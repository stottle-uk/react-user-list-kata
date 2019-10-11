import { Observable } from 'rxjs';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  county: string;
  country: string;
  postcode: string;
}

export interface IGetUsers {
  getAll: () => Observable<User[]>;
  getById: (userId: string) => Observable<User>;
}

export interface IUpdateUsers {
  update: (user: Partial<User>) => Observable<User>;
}
