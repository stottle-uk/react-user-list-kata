import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GetAllUsersStart, ShowUserProfile, UsersAction } from '../+store/users.actions';
import { BaseUser } from '../models/User';

interface StoreProps {
  users: BaseUser[];
  selectedUser: BaseUser;
}

interface DispatchProps {
  getUsers: () => void;
  showUserProfile: (user: BaseUser) => void;
}

type AllProps = StoreProps & DispatchProps;

const UsersList: React.FC<AllProps> = ({ showUserProfile, getUsers, users }: AllProps) => {
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
      onClick={() => showUserProfile(user)}
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
  users: users.users,
  selectedUser: users.selectedUser
});

const mapDispatchToProps = (dispatch: Dispatch<UsersAction>): DispatchProps => ({
  getUsers: () => dispatch(new GetAllUsersStart()),
  showUserProfile: (user: BaseUser) => dispatch(new ShowUserProfile({ user }))
});

export default connect<StoreProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
