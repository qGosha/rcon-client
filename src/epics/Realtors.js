import { from, of } from "rxjs";
import { catchError, map, mergeMap, debounceTime } from "rxjs/operators";
import { ofType } from "redux-observable";

import { Api } from "src/utils/Api";
import { ActionTypes } from "src/actions/Realtors";

export const fetchRealtorsList = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.FETCH_REALTORS_LIST),
    mergeMap(action =>
      from(Api.fetchRealtorsList(action.payload)).pipe(
        map(data => ({
          type: ActionTypes.FETCH_REALTORS_LIST_SUCCESS,
          payload: data
        })),
        catchError(error => {
          return of({
            type: ActionTypes.FETCH_REALTORS_LIST_ERROR,
            payload: error
          });
        })
      )
    )
  );

export const updateRating = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.UPDATE_REALTORS_RATING),
    debounceTime(350),
    mergeMap(action =>
      from(Api.updateRating(action.payload)).pipe(
        map(data => ({
          type: ActionTypes.UPDATE_REALTORS_RATING_SUCCESS,
          payload: data
        })),
        catchError(error => {
          return of({
            type: ActionTypes.UPDATE_REALTORS_RATING_ERROR,
            payload: error
          });
        })
      )
    )
  );

export const createRating = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.CREATE_REALTORS_RATING),
    mergeMap(action =>
      from(Api.createRating(action.payload)).pipe(
        map(data => ({
          type: ActionTypes.CREATE_REALTORS_RATING_SUCCESS,
          payload: data
        })),
        catchError(error => {
          return of({
            type: ActionTypes.CREATE_REALTORS_RATING_ERROR,
            payload: error
          });
        })
      )
    )
  );
