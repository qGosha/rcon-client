export const ActionTypes = {
  LOGIN: "LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  CHECK_LOGGED_IN: "CHECK_LOGGED_IN",
  CHECK_LOGGED_IN_SUCCESS: "CHECK_LOGGED_IN_SUCCESS",
  CHECK_LOGGED_IN_ERROR: "CHECK_LOGGED_IN_ERROR",
  SIGNUP: "SIGNUP",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_ERROR: "SIGNUP_ERROR",
  LOGOUT: "LOGOUT",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_ERROR: "LOGOUT_ERROR",
  UPDATE_USER: "UPDATE_USER",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_ERROR: "UPDATE_USER_ERROR"
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

export const logout = () => ({
  type: ActionTypes.LOGOUT
});

export const updateUser = payload => ({
  type: ActionTypes.UPDATE_USER,
  payload
});
