import { ActionTypes } from "src/actions/User";

const { LOGIN_SUCCESS, CHECK_LOGGED_IN_SUCCESS } = ActionTypes;

export const defaultState = {
  user: null
};

export const user = (state = defaultState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case LOGIN_SUCCESS:
    case CHECK_LOGGED_IN_SUCCESS:
      return { ...state, user: payload };
    default:
      return state;
  }
};
