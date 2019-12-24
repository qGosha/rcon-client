export const ActionTypes = {
  LOGIN: "LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  CHECK_LOGGED_IN: "CHECK_LOGGED_IN",
  CHECK_LOGGED_IN_SUCCESS: "CHECK_LOGGED_IN_SUCCESS",
  CHECK_LOGGED_IN_ERROR: "CHECK_LOGGED_IN_ERROR",
  SIGNUP: "LOGIN",
  SIGNUP_SUCCESS: "LOGIN_SUCCESS",
  SIGNUP_ERROR: "LOGIN_ERROR"
};

export const login = payload => ({
  type: ActionTypes.LOGIN,
  payload
});

export const checkLoggedIn = () => ({
  type: ActionTypes.CHECK_LOGGED_IN
});

export const signup = payload => ({
  type: ActionTypes.SIGNUP,
  payload
});
