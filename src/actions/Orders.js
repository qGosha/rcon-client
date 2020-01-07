export const ActionTypes = {
  SEND_CLIENT_ORDER: "SEND_CLIENT_ORDER",
  SEND_CLIENT_ORDER_SUCCESS: "SEND_CLIENT_ORDER_SUCCESS",
  SEND_CLIENT_ORDER_ERROR: "SEND_CLIENT_ORDER_ERROR"
};

export const sendClientOrder = payload => ({
  type: ActionTypes.SEND_CLIENT_ORDER,
  payload
});
