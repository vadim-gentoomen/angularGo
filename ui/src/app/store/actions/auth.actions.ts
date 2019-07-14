import {createAction, props, union} from '@ngrx/store';
import {Credentials} from '@app/models/account';
import {AuthState} from '../state/auth.states';


export const login = createAction(
  '[Auth] Login',
  props<Credentials>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<AuthState>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  (errorMessage = 'Error logging in') => ({payload: {errorMessage}})
);

export const checkLogin = createAction(
  '[Auth] Check Login',
);

export const logout = createAction(
  '[Auth] Logout'
);

export const logoutConfirmed = createAction(
  '[Auth] Logout Confirmed'
);

export const logoutCancelled = createAction(
  '[Auth] Logout Cancelled'
);

const all = union({login, loginSuccess, loginFailure, logout, logoutConfirmed, logoutCancelled});
export type AuthActions = typeof all;
