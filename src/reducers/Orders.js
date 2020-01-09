import { ActionTypes } from "src/actions/Orders";

const {
  SEND_CLIENT_ORDER_SUCCESS,
  SEND_CLIENT_ORDER_ERROR,
  LOAD_ORDERS,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_ERROR
} = ActionTypes;

export const defaultState = {
  items: [],
  sendClientOrderErrors: {}
};

export const orders = (state = defaultState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case SEND_CLIENT_ORDER_SUCCESS:
      return { ...state, items: [...state.items, payload] };
    case SEND_CLIENT_ORDER_ERROR:
      return { ...state, sendClientOrderErrors: payload };
    case LOAD_ORDERS:
      return { ...state, loading: true };
    case LOAD_ORDERS_SUCCESS:
      return { ...state, items: payload, loading: false };
    case LOAD_ORDERS_ERROR:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
