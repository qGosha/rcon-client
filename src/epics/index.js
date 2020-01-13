import { combineEpics } from "redux-observable";

import { login, checkLoggedIn, signup, logout } from "src/epics/User";
import {
  sendClientOrder,
  loadOrders,
  deleteOrder,
  editClientOrder
} from "src/epics/Orders";

export const rootEpic = combineEpics(
  login,
  checkLoggedIn,
  signup,
  logout,
  sendClientOrder,
  loadOrders,
  deleteOrder,
  editClientOrder
);
