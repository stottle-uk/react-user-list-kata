import { UserProfileState } from '../+shared/users.store.models';
import { UserProfileAction, UserProfileActionTypes } from './userProfile.actions';

const initialState: UserProfileState = {
  showUserProfileModal: false,
  selectedUser: undefined,
  isSubmitted: false,
  isLoading: false,
  isLoaded: false,
  errors: undefined
};

export const userProfileReducer = (state = initialState, action: UserProfileAction): UserProfileState => {
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
        errors: undefined
      };

    case UserProfileActionTypes.UpdateUserStart:
      return {
        ...state,
        isSubmitted: true,
        isLoading: true,
        isLoaded: false,
        errors: undefined
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
        errors: {
          actionType: action.type,
          errors: action.payload.errors
        }
      };

    default:
      return state;
  }
};
