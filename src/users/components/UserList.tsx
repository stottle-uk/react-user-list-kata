import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ProfileAction, ShowUserProfile } from '../+store/profile/profile.actions';
import { GetAllUsersStart, UserListAction } from '../+store/userList/userList.actions';
import { RootState } from '../../store/store.modal';
import { BaseUser } from '../models/User';

interface StoreProps {
  users: BaseUser[];
}

interface DispatchProps {
  getUsers: () => void;
  showUserProfile: (user: BaseUser) => void;
}

type AllProps = StoreProps & DispatchProps;

const UsersList: React.FC<AllProps> = ({ showUserProfile, getUsers, users }: AllProps) => {
  const [activeCard, setActiveCard] = useState<string>();

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

const mapStateToProps = ({ userList: users }: RootState): StoreProps => ({
  users: users.users
});

const mapDispatchToProps = (dispatch: Dispatch<UserListAction | ProfileAction>): DispatchProps => ({
  getUsers: () => dispatch(new GetAllUsersStart()),
  showUserProfile: (user: BaseUser) => dispatch(new ShowUserProfile({ user }))
});

export default connect<StoreProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
