import { User } from '../../models/User';
import { ProfileAction, ProfileActionTypes } from './profile.actions';

export interface ProfileState {
  selectedUser?: User;
  showUserProfileModal: boolean;
  isSubmitted: boolean;
  isLoading: boolean;
  isLoaded: boolean;
  errors: any[]; // todo: create typescript interface for errors
}

const initialState: ProfileState = {
  showUserProfileModal: false,
  selectedUser: undefined,
  isSubmitted: false,
  isLoading: false,
  isLoaded: false,
  errors: []
};

export const profileReducer = (state = initialState, action: ProfileAction): ProfileState => {
  switch (action.type) {
    case ProfileActionTypes.ShowUserProfile:
      return {
        ...state,
        showUserProfileModal: true,
        isSubmitted: false
      };

    case ProfileActionTypes.HideUserProfile:
      return {
        ...state,
        showUserProfileModal: false,
        selectedUser: undefined
      };

    case ProfileActionTypes.UpdateUserStart:
    case ProfileActionTypes.GetUserByIdStart:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        errors: []
      };

    case ProfileActionTypes.UpdateUserSuccess:
    case ProfileActionTypes.GetUserByIdSuccess:
      return {
        ...state,
        selectedUser: action.payload.user,
        isLoading: false,
        isLoaded: true
      };

    case ProfileActionTypes.GetUserByIdFailure:
    case ProfileActionTypes.UpdateUserFailure:
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
