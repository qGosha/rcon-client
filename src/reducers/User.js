import { ActionTypes } from "src/actions/User";
import { ActionTypes as AuthActionTypes } from "src/actions/User";

const {
  LOGIN_SUCCESS,
  CHECK_LOGGED_IN_SUCCESS,
  SIGNUP_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR
} = ActionTypes;
const { LOGOUT } = AuthActionTypes;

export const defaultState = {
  user: {},
  errors: {}
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
      return { ...state, errors: payload };
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
};
