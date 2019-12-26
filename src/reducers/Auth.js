import { ActionTypes } from "src/actions/User";

const {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CHECK_LOGGED_IN,
  CHECK_LOGGED_IN_SUCCESS,
  CHECK_LOGGED_IN_ERROR,
  LOGOUT,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} = ActionTypes;

export const defaultState = {
  loggedIn: false,
  initialLoading: false,
  authOrSignupLoading: false,
  errors: {}
};

export const auth = (state = defaultState, action) => {
  switch (action.type) {
    case CHECK_LOGGED_IN:
      return { ...state, initialLoading: true };
    case CHECK_LOGGED_IN_SUCCESS:
      return { ...state, loggedIn: true, initialLoading: false };
    case CHECK_LOGGED_IN_ERROR:
      return { ...state, initialLoading: false };
    case LOGIN:
    case SIGNUP:
      return { ...state, authOrSignupLoading: true, errors: {} };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        authOrSignupLoading: false,
        errors: {}
      };
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
      return { ...state, errors: action.payload, authOrSignupLoading: false };
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
};
