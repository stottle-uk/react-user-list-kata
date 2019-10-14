import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { GetAllUsersStart, UserListAction } from '../+store/userList/userList.actions';
import { getIsLoadingUsers, getUsers } from '../+store/userList/userList.selectors';
import { ShowUserProfile, UserProfileAction } from '../+store/userProfile/userProfile.actions';
import spinner from '../../shared/icons/spinner.svg';
import { RootState } from '../../store/store.modal';
import { BaseUser } from '../models/User';
import UsersList from './UserList';

interface StoreProps {
  users: BaseUser[];
  isLoading: boolean;
}

interface DispatchProps {
  getUsers: () => void;
  showUserProfile: (user: BaseUser) => void;
}

type AllProps = StoreProps & DispatchProps;

const Users: React.FC<AllProps> = ({ users, isLoading, showUserProfile, getUsers }: AllProps) => {
  const usersDataEffect = () => {
    getUsers();
  };

  useEffect(usersDataEffect, []);

  const renderSpinner = (
    <div className="loading-users">
      <img src={spinner} className="spinner" alt="spinner" />
    </div>
  );

  return isLoading ? renderSpinner : <UsersList users={users} onUserSelected={showUserProfile} />;
};

const mapStateToProps = ({ userList }: RootState): StoreProps => ({
  users: getUsers(userList),
  isLoading: getIsLoadingUsers(userList)
});

const mapDispatchToProps = (dispatch: Dispatch<UserListAction | UserProfileAction>): DispatchProps => ({
  getUsers: () => dispatch(new GetAllUsersStart()),
  showUserProfile: (user: BaseUser) => dispatch(new ShowUserProfile({ user }))
});

export default connect<StoreProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(Users);
