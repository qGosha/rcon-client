import { ActionTypes } from "src/actions/Orders";

const { SEND_CLIENT_ORDER_SUCCESS, SEND_CLIENT_ORDER_ERROR } = ActionTypes;

export const defaultState = {
  myOrders: [],
  sendClientOrderErrors: {}
};

export const orders = (state = defaultState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case SEND_CLIENT_ORDER_SUCCESS:
      return { ...state, myOrders: [...state.myOrders, payload] };
    case SEND_CLIENT_ORDER_ERROR:
      return { ...state, sendClientOrderErrors: payload };
    default:
      return state;
  }
};
