import { from, of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { ofType } from "redux-observable";

import { Api } from "src/utils/Api";
import { ActionTypes } from "src/actions/User";

import history from "src/utils/history";

export const login = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.LOGIN),
    mergeMap(action =>
      from(Api.login(action.payload)).pipe(
        map(user => ({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: user
        })),
        catchError(() => {
          return of({
            type: ActionTypes.LOGIN_ERROR,
            payload: { login: "Credtials are incorrect" }
          });
        })
      )
    )
  );

export const checkLoggedIn = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.CHECK_LOGGED_IN),
    mergeMap(() =>
      from(Api.checkLoggedIn()).pipe(
        map(user => ({
          type: ActionTypes.CHECK_LOGGED_IN_SUCCESS,
          payload: user
        })),
        catchError(() => {
          return of({
            type: ActionTypes.CHECK_LOGGED_IN_ERROR
          });
        })
      )
    )
  );

export const signup = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.SIGNUP),
    mergeMap(action =>
      from(Api.signup(action.payload)).pipe(
        map(user => ({
          type: ActionTypes.SIGNUP_SUCCESS,
          payload: user
        })),
        tap(() => history.push("/")),
        catchError(error => {
          return of({
            type: ActionTypes.SIGNUP_ERROR,
            payload: error
          });
        })
      )
    )
  );

export const logout = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.LOGOUT),
    mergeMap(() =>
      from(Api.logout()).pipe(
        map(() => ({
          type: ActionTypes.LOGOUT_SUCCESS
        })),
        tap(() => history.push("/")),
        catchError(error => {
          return of({
            type: ActionTypes.LOGOUT_ERROR,
            payload: error
          });
        })
      )
    )
  );

export const updateUser = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.UPDATE_USER),
    mergeMap(action =>
      from(Api.updateUser(action.payload)).pipe(
        map(user => ({
          type: ActionTypes.UPDATE_USER_SUCCESS,
          payload: user
        })),
        catchError(error => {
          return of({
            type: ActionTypes.UPDATE_USER_ERROR,
            payload: error
          });
        })
      )
    )
  );

export const deleteUser = actions$ =>
  actions$.pipe(
    ofType(ActionTypes.DELETE_USER),
    mergeMap(action =>
      from(Api.deleteUser(action.payload)).pipe(
        map(() => ({
          type: ActionTypes.DELETE_USER_SUCCESS
        })),
        catchError(error => {
          return of({
            type: ActionTypes.DELETE_USER_ERROR,
            payload: error
          });
        })
      )
    )
  );
