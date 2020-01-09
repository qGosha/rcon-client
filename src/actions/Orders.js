export const ActionTypes = {
  SEND_CLIENT_ORDER: "SEND_CLIENT_ORDER",
  SEND_CLIENT_ORDER_SUCCESS: "SEND_CLIENT_ORDER_SUCCESS",
  SEND_CLIENT_ORDER_ERROR: "SEND_CLIENT_ORDER_ERROR",
  LOAD_ORDERS: "LOAD_ORDERS"
};

export const sendClientOrder = payload => ({
  type: ActionTypes.SEND_CLIENT_ORDER,
  payload
});

export const loadOrders = () => ({
  type: ActionTypes.LOAD_ORDERS
});
