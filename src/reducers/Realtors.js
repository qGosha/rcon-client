import { ActionTypes as OrdersActionTypes } from "src/actions/Orders";
import { ActionTypes } from "src/actions/Realtors";
import { ActionTypes as AuthActionTypes } from "src/actions/User";

const {
  FETCH_REALTORS_LIST,
  FETCH_REALTORS_LIST_SUCCESS,
  FETCH_REALTORS_LIST_ERROR,
  UPDATE_REALTORS_RATING_SUCCESS,
  CREATE_REALTORS_RATING_SUCCESS
} = ActionTypes;
const { LOGOUT, DELETE_USER_SUCCESS } = AuthActionTypes;
const { MAIL_MY_ORDERS_SUCCESS } = OrdersActionTypes;

export const defaultState = {
  items: [],
  loading: false,
  error: {},
  totalCount: 0,
  ratedByMeIds: [],
  sentOrdersToIds: []
};

const fetchRealtorsListSuccess = (state, payload) => {
  return {
    ...state,
    items: payload.items,
    loading: false,
    totalCount: payload.total,
    ratedByMeIds: payload.rated_by_me,
    sentOrdersToIds: payload.responded_or_sent_orders || state.sentOrdersToIds
  };
};

const updateRealtorsRatingSuccess = (state, payload) => {
  return {
    ...state,
    items: state.items.map(item => {
      if (item.id === payload.id) {
        return payload;
      }
      return item;
    }),
    ratedByMeIds: [...new Set([...state.ratedByMeIds, payload.id])]
  };
};

export const realtors = (state = defaultState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case FETCH_REALTORS_LIST:
      return { ...state, loading: true };
    case FETCH_REALTORS_LIST_ERROR:
      return { ...state, loading: false, error: payload };
    case FETCH_REALTORS_LIST_SUCCESS:
      return fetchRealtorsListSuccess(state, payload);
    case UPDATE_REALTORS_RATING_SUCCESS:
    case CREATE_REALTORS_RATING_SUCCESS:
      return updateRealtorsRatingSuccess(state, payload);
    case MAIL_MY_ORDERS_SUCCESS:
      return { ...state, sentOrdersToIds: [...state.sentOrdersToIds, payload] };
    case LOGOUT:
    case DELETE_USER_SUCCESS:
      return defaultState;
    default:
      return state;
  }
};
