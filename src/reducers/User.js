import { ActionTypes } from "src/actions/User";
import { ActionTypes as AuthActionTypes } from "src/actions/User";
import { ActionTypes as RealtorProfilesActionTypes } from "src/actions/RealtorProfiles";

const {
  LOGIN_SUCCESS,
  CHECK_LOGGED_IN_SUCCESS,
  SIGNUP_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER_SUCCESS
} = ActionTypes;
const { LOGOUT } = AuthActionTypes;
const {
  SEND_REALTOR_PROFILE_SUCCESS,
  EDIT_REALTOR_PROFILE_SUCCESS,
  SEND_REALTOR_PROFILE_ERROR,
  EDIT_REALTOR_PROFILE_ERROR,
  SEND_REALTOR_PROFILE,
  EDIT_REALTOR_PROFILE
} = RealtorProfilesActionTypes;

export const defaultState = {
  user: {},
  errors: {},
  loading: false
};

export const user = (state = defaultState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case LOGIN_SUCCESS:
    case CHECK_LOGGED_IN_SUCCESS:
    case SIGNUP_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return { ...state, user: payload, errors: {} };
    case UPDATE_USER_ERROR:
    case SEND_REALTOR_PROFILE_ERROR:
    case EDIT_REALTOR_PROFILE_ERROR:
      return { ...state, errors: payload, loading: false };
    case LOGOUT:
    case DELETE_USER_SUCCESS:
      return defaultState;
    case SEND_REALTOR_PROFILE:
    case EDIT_REALTOR_PROFILE:
      return { ...state, loading: true };
    case SEND_REALTOR_PROFILE_SUCCESS:
    case EDIT_REALTOR_PROFILE_SUCCESS:
      return {
        ...state,
        user: { ...state.user, realtor_profile: payload },
        errors: {},
        loading: false
      };
    default:
      return state;
  }
};
