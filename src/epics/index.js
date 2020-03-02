import { combineEpics } from "redux-observable";

import {
  login,
  checkLoggedIn,
  signup,
  logout,
  updateUser
} from "src/epics/User";
import {
  sendClientOrder,
  loadOrders,
  deleteOrder,
  editClientOrder
} from "src/epics/Orders";
import {
  fetchRealtorsList,
  updateRating,
  createRating
} from "src/epics/Realtors";

export const rootEpic = combineEpics(
  login,
  checkLoggedIn,
  signup,
  logout,
  sendClientOrder,
  loadOrders,
  deleteOrder,
  editClientOrder,
  updateUser,
  fetchRealtorsList,
  updateRating,
  createRating
);
