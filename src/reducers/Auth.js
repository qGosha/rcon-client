import { ActionTypes } from "src/actions/User";

const {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CHECK_LOGGED_IN,
  CHECK_LOGGED_IN_SUCCESS,
  CHECK_LOGGED_IN_ERROR
} = ActionTypes;

export const defaultState = {
  loggedIn: false,
  initialLoading: false,
  authOrSignupLoading: false,
  errors: null
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
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loggedIn: true, loading: false };
    case LOGIN_ERROR:
      return { ...state, errors: action.payload, loading: false };
    default:
      return state;
  }
};
