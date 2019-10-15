import React, { useState } from 'react';
import { BaseUser } from '../models/User';

interface OwnProps {
  users: BaseUser[];
  onUserSelected: (user: BaseUser) => void;
}

const UsersList: React.FC<OwnProps> = ({ users, onUserSelected }) => {
  const [activeCard, setActiveCard] = useState<string>();

  const getCardClass = (id: string) => `card ${id === activeCard ? 'has-background-light' : 'has-background-white'}`;

  const renderUser = (user: BaseUser) => (
    <div
      key={user.id}
      data-e2e="user-list"
      className={getCardClass(user.id)}
      onMouseEnter={() => setActiveCard(user.id)}
      onMouseLeave={() => setActiveCard(undefined)}
      onClick={() => onUserSelected(user)}
    >
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-96x96">
              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-5" data-e2e="user-list-username">
              {user.username}
            </p>
            <p className="subtitle is-7">{user.id}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="content">
        <h1>User List</h1>
      </div>
      {/* todo: add some user filtering */}
      {/* todo: add button to create user*/}
      {users.map(renderUser)}
    </>
  ); // todo: paginate the list and/or load more on scroll down
};

export default UsersList;
