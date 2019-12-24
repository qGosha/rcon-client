import { combineEpics } from "redux-observable";

import { login, checkLoggedIn, signup } from "src/epics/User";

export const rootEpic = combineEpics(login, checkLoggedIn, signup);
