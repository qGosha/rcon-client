import { ActionTypes } from "src/actions/User";

const { LOGIN_SUCCESS, CHECK_LOGGED_IN_SUCCESS, SIGNUP_SUCCESS } = ActionTypes;

export const defaultState = {
  user: {}
};

export const user = (state = defaultState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case LOGIN_SUCCESS:
    case CHECK_LOGGED_IN_SUCCESS:
    case SIGNUP_SUCCESS:
      return { ...state, user: payload };
    default:
      return state;
  }
};
