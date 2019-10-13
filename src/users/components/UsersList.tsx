import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GetAllUsersStart, GetUserByIdStart, UsersAction } from '../+store/actions';
import { BaseUser } from '../models/User';

interface OwnProps {
  onUserClick: (user: BaseUser) => void;
}

interface StoreProps {
  users: BaseUser[];
}

interface DispatchProps {
  getUsers: () => void;
  goToUser: (user: BaseUser) => void;
}

type AllProps = OwnProps & StoreProps & DispatchProps;

const UsersList: React.FC<AllProps> = ({ goToUser, getUsers, users }: AllProps) => {
  const [activeCard, setActiveCard] = useState<string>();

  // const byUsername = (a: BaseUser, b: BaseUser) => {
  //   if (a.username < b.username) {
  //     return -1;
  //   }
  //   if (a.username > b.username) {
  //     return 1;
  //   }
  //   return 0;
  // };

  const usersDataEffect = () => {
    getUsers();
  };

  useEffect(usersDataEffect, []);

  const getCardClass = (id: string) => `card ${id === activeCard ? 'has-background-light' : 'has-background-white'}`;

  const renderUser = (user: BaseUser) => (
    <div
      key={user.id}
      className={getCardClass(user.id)}
      onMouseEnter={() => setActiveCard(user.id)}
      onMouseLeave={() => setActiveCard(undefined)}
      onClick={() => goToUser(user)}
    >
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-96x96">
              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-5">{user.username}</p>
            <p className="subtitle is-7">{user.id}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return <>{users.map(renderUser)}</>;
};

const mapStateToProps = ({ users }: any): StoreProps => ({
  users: users.users
});

const mapDispatchToProps = (dispatch: Dispatch<UsersAction>): DispatchProps => ({
  getUsers: () => dispatch(new GetAllUsersStart()),
  goToUser: (user: BaseUser) => dispatch(new GetUserByIdStart({ userId: user.id }))
});

export default connect<StoreProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
