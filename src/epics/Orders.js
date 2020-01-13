import { from, of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { ofType } from "redux-observable";

import { Api } from "src/utils/Api";
import { ActionTypes } from "src/actions/Orders";

import history from "src/utils/history";

export const sendClientOrder = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.SEND_CLIENT_ORDER),
    mergeMap(action =>
      from(Api.sendClientOrder(action.payload)).pipe(
        map(order => ({
          type: ActionTypes.SEND_CLIENT_ORDER_SUCCESS,
          payload: order
        })),
        tap(() => history.push("/dashboard/orders")),
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
    mergeMap(() =>
      from(Api.loadOrders()).pipe(
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

export const deleteOrder = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.DELETE_ORDER),
    mergeMap(action =>
      from(Api.deleteOrder(action.payload)).pipe(
        map(() => ({
          type: ActionTypes.DELETE_ORDER_SUCCESS,
          payload: action.payload
        })),
        catchError(error => {
          return of({
            type: ActionTypes.DELETE_ORDER_ERROR,
            payload: error
          });
        })
      )
    )
  );

export const editClientOrder = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.EDIT_CLIENT_ORDER),
    mergeMap(action =>
      from(Api.editClientOrder(action.payload)).pipe(
        map(order => ({
          type: ActionTypes.EDIT_CLIENT_ORDER_SUCCESS,
          payload: order
        })),
        tap(() => history.push("/dashboard/orders")),
        catchError(error => {
          return of({
            type: ActionTypes.EDIT_CLIENT_ORDER_ERROR,
            payload: error
          });
        })
      )
    )
  );
