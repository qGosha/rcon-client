import { from, of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { ofType } from "redux-observable";

import { Api } from "src/utils/Api";
import { ActionTypes } from "src/actions/Orders";

// import history from "src/utils/history"

export const sendClientOrder = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.SEND_CLIENT_ORDER),
    mergeMap(action =>
      from(Api.sendClientOrder(action.payload)).pipe(
        map(order => ({
          type: ActionTypes.SEND_CLIENT_ORDER_SUCCESS,
          payload: order
        })),
        catchError(error => {
          return of({
            type: ActionTypes.SEND_CLIENT_ORDER_ERROR,
            payload: error
          });
        })
      )
    )
  );

export const loadOrders = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.LOAD_ORDERS),
    mergeMap(action =>
      from(Api.loadOrders(action.payload)).pipe(
        map(orders => ({
          type: ActionTypes.LOAD_ORDERS_SUCCESS,
          payload: orders
        })),
        catchError(error => {
          return of({
            type: ActionTypes.LOAD_ORDERS_ERROR,
            payload: error
          });
        })
      )
    )
  );
