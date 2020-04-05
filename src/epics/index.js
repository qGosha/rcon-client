import { combineEpics } from "redux-observable";

import {
  login,
  checkLoggedIn,
  signup,
  logout,
  updateUser,
  deleteUser
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
import {
  sendRealtorProfile,
  editRealtorProfile
} from "src/epics/RealtorProfiles";

import {
  fetchClientOrdersList,
  loadRespondedOrdersList
} from "src/epics/Orderslist";

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
  createRating,
  sendRealtorProfile,
  editRealtorProfile,
  deleteUser,
  fetchClientOrdersList,
  loadRespondedOrdersList
);
