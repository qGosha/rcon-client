import { combineEpics } from "redux-observable";
import {
  deleteOrder,
  editClientOrder,
  loadOrders,
  mailMyOrders,
  sendClientOrder
} from "src/epics/Orders";
import {
  fetchClientOrdersList,
  loadRespondedOrdersList
} from "src/epics/OrdersList";
import {
  editRealtorProfile,
  mailRealtorProfile,
  sendRealtorProfile
} from "src/epics/RealtorProfiles";
import {
  createRating,
  fetchRealtorsList,
  updateRating
} from "src/epics/Realtors";
import {
  checkLoggedIn,
  deleteUser,
  login,
  logout,
  signup,
  updateUser
} from "src/epics/User";

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
  loadRespondedOrdersList,
  mailRealtorProfile,
  mailMyOrders
);
