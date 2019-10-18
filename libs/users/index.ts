import { userListEpicsAsArray } from './+store/userList/userList.epics';
import { userListReducer } from './+store/userList/userList.reducer';
import { userProfileEpicsAsArray } from './+store/userProfile/userProfile.epics';
import { userProfileReducer } from './+store/userProfile/userProfile.reducer';

export * from './+store/+shared/users.store.models';
export * from './+store/userList/userList.actions';
export { default as UserProfileModal } from './components/UserProfileModal';
export { default as Users } from './components/Users';
export * from './services/UsersService';
export const usersEpics = [...userListEpicsAsArray, ...userProfileEpicsAsArray];
export const usersReducers = {
  userListReducer,
  userProfileReducer
};
