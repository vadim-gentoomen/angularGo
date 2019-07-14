import {AuthState, initialAuthState} from '../state/auth.states';
import {Action, createReducer, on} from '@ngrx/store';
import * as actions from '../actions/auth.actions';

const reducer = createReducer(
  initialAuthState,
  on(actions.login, (state: AuthState, action: Action) => {
    console.log('login', state, action);
    return {
      ...state,
    };
  }),

  on(actions.loginSuccess, (state: AuthState, action: Action): AuthState => {
    console.log('loginSuccess', state, action);
    return {
      ...state,
      isAuthenticated: true,
    };
  }),

  on(actions.loginFailure, (state: AuthState, action: Action): AuthState => {
    console.log('loginFailure', state, action);
    return {
      ...state,
      isAuthenticated: false,
      account: null,
      errorMessage: 'Login error',
    };
  }),

  on(actions.checkLogin, (state: AuthState, action: Action): AuthState => {
    console.log('checkLogin', state, action);
    return {
      ...state,
    };
  }),

  on(actions.logout, (state: AuthState, action: Action): AuthState => {
    console.log('logout', state, action);
    return {
      ...state,
    };
  }),

  on(actions.logoutConfirmed, (state: AuthState, action: Action): AuthState => {
    console.log('logoutConfirmed', state, action);
    return initialAuthState;
  }),

  on(actions.logoutCancelled, (state: AuthState, action: Action): AuthState => {
    console.log('logoutCancelled', state, action);
    return {
      ...state,
    };
  }),
);


export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
