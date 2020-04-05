import { ActionTypes } from "src/actions/OrdersList";
import { ActionTypes as AuthActionTypes } from "src/actions/User";

const {
  SEARCH_ORDERS,
  SEARCH_ORDERS_SUCCESS,
  SEARCH_ORDERS_ERROR,
  LOAD_RESPONDED_ORDERS_LIST_SUCCESS
} = ActionTypes;
const { LOGOUT, DELETE_USER_SUCCESS } = AuthActionTypes;

export const defaultState = {
  items: [],
  loading: false,
  error: {},
  ordersTotal: 0,
  respondedTo: [],
  respondedToOrders: []
};

export const ordersList = (state = defaultState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case SEARCH_ORDERS:
      return { ...state, loading: true };
    case SEARCH_ORDERS_SUCCESS:
      return {
        ...state,
        items: payload.items || [],
        loading: false,
        ordersTotal: payload.total,
        respondedTo: payload.responded_to
      };
    case SEARCH_ORDERS_ERROR:
      return { ...state, loading: false, error: payload };
    case LOAD_RESPONDED_ORDERS_LIST_SUCCESS:
      return { ...state, respondedToOrders: payload };
    case LOGOUT:
    case DELETE_USER_SUCCESS:
      return defaultState;
    default:
      return state;
  }
};
