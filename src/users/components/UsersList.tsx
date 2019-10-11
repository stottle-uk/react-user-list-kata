import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import { BaseUser } from '../models/User';
import { UsersServiceContext } from '../services/UsersServiceContext';

const UsersList: React.FC = () => {
  const [usersData, setUsersData] = useState<BaseUser[]>([]);
  const { usersService } = useContext(UsersServiceContext);

  const renderUser = (user: BaseUser) => <li key={user.id}>{user.username}</li>;

  const usersDataEffect = () => {
    const subscription = usersService
      .getAll()
      .pipe(tap(users => setUsersData(users)))
      .subscribe();
    return () => subscription.unsubscribe();
  };

  useEffect(usersDataEffect, []);

  return <ul>{usersData.map(renderUser)}</ul>;
};

export default UsersList;
