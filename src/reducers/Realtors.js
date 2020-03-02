import { ActionTypes } from "src/actions/Realtors";
import { ActionTypes as AuthActionTypes } from "src/actions/User";

const {
  FETCH_REALTORS_LIST,
  FETCH_REALTORS_LIST_SUCCESS,
  FETCH_REALTORS_LIST_ERROR,
  UPDATE_REALTORS_RATING_SUCCESS,
  CREATE_REALTORS_RATING_SUCCESS
} = ActionTypes;
const { LOGOUT } = AuthActionTypes;

export const defaultState = {
  items: [],
  loading: false,
  error: {},
  totalCount: 0,
  ratedByMeIds: []
};

const fetchRealtorsListSuccess = (state, payload) => {
  return {
    ...state,
    items: payload.items,
    loading: false,
    totalCount: payload.total,
    ratedByMeIds: payload.rated_by_me
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
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
};
