import React, { useContext, useEffect, useState } from 'react';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseUser } from '../models/User';
import { UsersServiceContext } from '../services/UsersServiceContext';

interface OwnProps {
  onUserClick: (user: BaseUser) => void;
}

interface CardState {}

const UsersList: React.FC<OwnProps> = ({ onUserClick }: OwnProps) => {
  const [usersData, setUsersData] = useState<BaseUser[]>([]);
  const [activeCard, setActiveCard] = useState<string>();

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

  const getCardClass = (id: string) => `card ${id === activeCard ? 'has-background-light' : 'has-background-white'}`;

  const renderUser = (user: BaseUser) => (
    <div
      key={user.id}
      className={getCardClass(user.id)}
      onMouseEnter={() => setActiveCard(user.id)}
      onMouseLeave={() => setActiveCard(undefined)}
      onClick={() => onUserClick(user)}
    >
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-96x96">
              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-5"> {user.username}</p>
            <p className="subtitle is-7">{user.id}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return <>{usersData.map(renderUser)}</>;
};

export default UsersList;
