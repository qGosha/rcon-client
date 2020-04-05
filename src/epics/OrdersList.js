import { from, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";

import { Api } from "src/utils/Api";
import { ActionTypes } from "src/actions/OrdersList";

export const fetchClientOrdersList = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.SEARCH_ORDERS),
    mergeMap(action =>
      from(Api.fetchClientOrdersList(action.payload)).pipe(
        map(data => ({
          type: ActionTypes.SEARCH_ORDERS_SUCCESS,
          payload: data
        })),
        catchError(error => {
          return of({
            type: ActionTypes.SEARCH_ORDERS_ERROR,
            payload: error
          });
        })
      )
    )
  );

export const loadRespondedOrdersList = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.LOAD_RESPONDED_ORDERS_LIST),
    mergeMap(() =>
      from(Api.loadRespondedOrdersList()).pipe(
        map(data => ({
          type: ActionTypes.LOAD_RESPONDED_ORDERS_LIST_SUCCESS,
          payload: data
        })),
        catchError(error => {
          return of({
            type: ActionTypes.LOAD_RESPONDED_ORDERS_LIST_ERROR,
            payload: error
          });
        })
      )
    )
  );
