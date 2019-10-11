import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import { BaseUser, User } from '../models/User';
import { UsersServiceContext } from '../services/UsersServiceContext';
import UserProfileForm from './UserProfileForm';

interface OwnProps {
  user: BaseUser;
  onCancel: () => void;
}

const UserProfile = ({ user, onCancel }: OwnProps) => {
  const [userData, setUserData] = useState<User>();
  const { usersService } = useContext(UsersServiceContext);

  const onSubmit = (user: User) => {
    console.log(user);
  };

  const userDataEffect = () => {
    const subscription = usersService
      .getById(user.id)
      .pipe(tap(user => setUserData(user)))
      .subscribe();
    return () => subscription.unsubscribe();
  };

  useEffect(userDataEffect, []);

  return userData ? <UserProfileForm user={userData} onCancel={onCancel} onSubmit={onSubmit} /> : <></>;
};

export default UserProfile;
