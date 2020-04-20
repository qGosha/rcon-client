export const ActionTypes = {
  SEND_CLIENT_ORDER: "SEND_CLIENT_ORDER",
  SEND_CLIENT_ORDER_SUCCESS: "SEND_CLIENT_ORDER_SUCCESS",
  SEND_CLIENT_ORDER_ERROR: "SEND_CLIENT_ORDER_ERROR",
  LOAD_ORDERS: "LOAD_ORDERS",
  LOAD_ORDERS_SUCCESS: "LOAD_ORDERS_SUCCESS",
  LOAD_ORDERS_ERROR: "LOAD_ORDERS_ERROR",
  DELETE_ORDER: "DELETE_ORDER",
  DELETE_ORDER_SUCCESS: "DELETE_ORDER_SUCCESS",
  DELETE_ORDER_ERROR: "DELETE_ORDER_ERROR",
  EDIT_CLIENT_ORDER: "EDIT_CLIENT_ORDER",
  EDIT_CLIENT_ORDER_SUCCESS: "EDIT_CLIENT_ORDER_SUCCESS",
  EDIT_CLIENT_ORDER_ERROR: "EDIT_CLIENT_ORDER_ERROR",
  MAIL_MY_ORDERS: "MAIL_MY_ORDERS",
  MAIL_MY_ORDERS_SUCCESS: "MAIL_MY_ORDERS_SUCCESS",
  MAIL_MY_ORDERS_ERROR: "MAIL_MY_ORDERS_ERROR"
};

export const sendClientOrder = payload => ({
  type: ActionTypes.SEND_CLIENT_ORDER,
  payload
});

export const loadOrders = () => ({
  type: ActionTypes.LOAD_ORDERS
});

export const deleteOrder = payload => ({
  type: ActionTypes.DELETE_ORDER,
  payload
});

export const editClientOrder = payload => ({
  type: ActionTypes.EDIT_CLIENT_ORDER,
  payload
});

export const mailMyOrders = payload => ({
  type: ActionTypes.MAIL_MY_ORDERS,
  payload
});
