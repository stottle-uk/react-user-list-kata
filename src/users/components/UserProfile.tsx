import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import { BaseUser, User } from '../models/User';
import { UsersServiceContext } from '../services/UsersServiceContext';
import UserProfileForm from './UserProfileForm';

interface OwnProps {
  user: BaseUser;
  onCancel: () => void;
}

const UserProfile: React.FC<OwnProps> = ({ user, onCancel }: OwnProps) => {
  const [userData, setUserData] = useState<User>();
  const { usersService } = useContext(UsersServiceContext);

  const onSubmit = (user: User) => usersService.update(user).pipe(tap(() => onCancel()));

  const userDataEffect = () => {
    const subscription = usersService
      .getById(user.id)
      .pipe(tap(user => setUserData(user)))
      .subscribe();
    return () => subscription.unsubscribe();
  };

  useEffect(userDataEffect, []);

  return (
    <div className="section">
      <div className="content">
        <h1>{user.username}</h1>
      </div>
      {userData && <UserProfileForm user={userData} onCancel={onCancel} onSubmit={onSubmit} />}{' '}
    </div>
  );
};

export default UserProfile;
