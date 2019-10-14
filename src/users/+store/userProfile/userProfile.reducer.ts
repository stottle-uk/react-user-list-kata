import { User } from '../../models/User';
import { UserProfileAction, UserProfileActionTypes } from './userProfile.actions';

export interface userProfileState {
  selectedUser?: User;
  showUserProfileModal: boolean;
  isSubmitted: boolean;
  isLoading: boolean;
  isLoaded: boolean;
  errors: any[]; // todo: create typescript interface for errors
}

const initialState: userProfileState = {
  showUserProfileModal: false,
  selectedUser: undefined,
  isSubmitted: false,
  isLoading: false,
  isLoaded: false,
  errors: []
};

export const userProfileReducer = (state = initialState, action: UserProfileAction): userProfileState => {
  switch (action.type) {
    case UserProfileActionTypes.ShowUserProfile:
      return {
        ...state,
        showUserProfileModal: true,
        isSubmitted: false
      };

    case UserProfileActionTypes.HideUserProfile:
      return {
        ...state,
        showUserProfileModal: false,
        selectedUser: undefined
      };

    case UserProfileActionTypes.GetUserByIdStart:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        errors: []
      };

    case UserProfileActionTypes.UpdateUserStart:
      return {
        ...state,
        isSubmitted: true,
        isLoading: true,
        isLoaded: false,
        errors: []
      };

    case UserProfileActionTypes.UpdateUserSuccess:
    case UserProfileActionTypes.GetUserByIdSuccess:
      return {
        ...state,
        selectedUser: action.payload.user,
        isLoading: false,
        isLoaded: true
      };

    case UserProfileActionTypes.GetUserByIdFailure:
    case UserProfileActionTypes.UpdateUserFailure:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        errors: action.payload.errors
      };

    default:
      return state;
  }
};
