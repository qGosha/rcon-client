export const ActionTypes = {
  SEARCH_ORDERS: "SEARCH_ORDERS",
  SEARCH_ORDERS_SUCCESS: "SEARCH_ORDERS_SUCCESS",
  SEARCH_ORDERS_ERROR: "SEARCH_ORDERS_ERROR",
  LOAD_RESPONDED_ORDERS_LIST: "LOAD_RESPONDED_ORDERS_LIST",
  LOAD_RESPONDED_ORDERS_LIST_SUCCESS: "LOAD_RESPONDED_ORDERS_LIST_SUCCESS",
  LOAD_RESPONDED_ORDERS_LIST_ERROR: "LOAD_RESPONDED_ORDERS_LIST_ERROR"
};

export const fetchClientOrdersList = payload => ({
  type: ActionTypes.SEARCH_ORDERS,
  payload
});

export const loadRespondedOrdersList = () => ({
  type: ActionTypes.LOAD_RESPONDED_ORDERS_LIST
});
