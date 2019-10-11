import React, { useContext, useEffect, useState } from 'react';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseUser } from '../models/User';
import { UsersServiceContext } from '../services/UsersServiceContext';

interface OwnProps {
  onUserClick: (user: BaseUser) => void;
}

const UsersList: React.FC<OwnProps> = ({ onUserClick }: OwnProps) => {
  const [usersData, setUsersData] = useState<BaseUser[]>([]);
  const { usersService } = useContext(UsersServiceContext);

  const byUsername = (a: BaseUser, b: BaseUser) => {
    if (a.username < b.username) {
      return -1;
    }
    if (a.username > b.username) {
      return 1;
    }
    return 0;
  };

  const renderUser = (user: BaseUser) => (
    <li key={user.id} onClick={() => onUserClick(user)}>
      {user.username}
    </li>
  );

  const usersDataEffect = () => {
    const subscription = usersService
      .getAll()
      .pipe(
        catchError(error => {
          console.log(error);
          return of([]);
        }),
        map(users => users.sort(byUsername)),
        tap(users => setUsersData(users))
      )
      .subscribe();
    return () => subscription.unsubscribe();
  };

  useEffect(usersDataEffect, []);

  return <ul>{usersData.map(renderUser)}</ul>;
};

export default UsersList;
