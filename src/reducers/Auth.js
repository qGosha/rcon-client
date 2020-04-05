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
  SIGNUP_ERROR,
  DELETE_USER_SUCCESS
} = ActionTypes;

export const defaultState = {
  loggedIn: false,
  initialLoading: false,
  authOrSignupLoading: false,
  signupErrors: {},
  loginErrors: {}
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
      return {
        ...state,
        loggedIn: true,
        authOrSignupLoading: false,
        loginErrors: {}
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        authOrSignupLoading: false,
        signupErrors: {}
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginErrors: action.payload,
        authOrSignupLoading: false
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signupErrors: action.payload,
        authOrSignupLoading: false
      };
    case LOGOUT:
    case DELETE_USER_SUCCESS:
      return defaultState;
    default:
      return state;
  }
};
