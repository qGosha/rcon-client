import { ActionTypes } from "src/actions/Orders";

const {
  SEND_CLIENT_ORDER_SUCCESS,
  SEND_CLIENT_ORDER_ERROR,
  LOAD_ORDERS,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_ERROR,
  DELETE_ORDER_SUCCESS,
  EDIT_CLIENT_ORDER_SUCCESS,
  EDIT_CLIENT_ORDER_ERROR
} = ActionTypes;

export const defaultState = {
  items: [],
  apiClientOrderErrors: {},
  ordersHaveBeenLoaded: false,
  loading: false,
  error: {}
};

const editClientOrderSuccess = (state, payload) => ({
  ...state,
  items: state.items.map(order => {
    if (order.id == payload.id) {
      return payload;
    }
    return order;
  })
});

export const orders = (state = defaultState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case SEND_CLIENT_ORDER_SUCCESS:
      return { ...state, items: [...state.items, payload] };
    case SEND_CLIENT_ORDER_ERROR:
    case EDIT_CLIENT_ORDER_ERROR:
      return { ...state, apiClientOrderErrors: payload };
    case EDIT_CLIENT_ORDER_SUCCESS:
      return editClientOrderSuccess(state, payload);
    case LOAD_ORDERS:
      return { ...state, loading: true };
    case LOAD_ORDERS_SUCCESS:
      return {
        ...state,
        items: payload,
        loading: false,
        ordersHaveBeenLoaded: true
      };
    case LOAD_ORDERS_ERROR:
      return { ...state, loading: false, error: payload };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        items: state.items.filter(order => order.id !== payload)
      };
    default:
      return state;
  }
};
