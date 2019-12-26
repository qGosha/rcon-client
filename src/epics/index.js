import { combineEpics } from "redux-observable";

import { login, checkLoggedIn, signup, logout } from "src/epics/User";

export const rootEpic = combineEpics(login, checkLoggedIn, signup, logout);
