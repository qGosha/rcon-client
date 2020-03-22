import { from, of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { ofType } from "redux-observable";

import { Api } from "src/utils/Api";
import { ActionTypes } from "src/actions/RealtorProfiles";

import history from "src/utils/history";

export const sendRealtorProfile = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.SEND_REALTOR_PROFILE),
    mergeMap(action =>
      from(Api.sendRealtorProfile(action.payload)).pipe(
        map(realtorProfile => ({
          type: ActionTypes.SEND_REALTOR_PROFILE_SUCCESS,
          payload: realtorProfile
        })),
        catchError(error => {
          return of({
            type: ActionTypes.SEND_REALTOR_PROFILE_ERROR,
            payload: error
          });
        })
      )
    )
  );

export const editRealtorProfile = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.EDIT_REALTOR_PROFILE),
    mergeMap(action =>
      from(Api.editRealtorProfile(action.payload)).pipe(
        map(realtorProfile => ({
          type: ActionTypes.EDIT_REALTOR_PROFILE_SUCCESS,
          payload: realtorProfile
        })),
        tap(() => history.push("/dashboard/")),
        catchError(error => {
          return of({
            type: ActionTypes.EDIT_REALTOR_PROFILE_ERROR,
            payload: error
          });
        })
      )
    )
  );
