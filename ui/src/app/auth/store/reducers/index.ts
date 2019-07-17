import {Action, combineReducers, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from './auth-reducer';
import * as fromLogin from './login-page.reducer';
import * as fromRoot from '@app/reducers';

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLogin.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    status: fromAuth.reducer,
    loginPage: fromLogin.reducer,
  })(state, action);
}


export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectAuthStatusState = createSelector(selectAuthState, (state: AuthState) => {
  return state.status;
});

export const getAccount = createSelector(selectAuthStatusState, fromAuth.getAccount);
export const getLoggedIn = createSelector(getAccount, account => !!account);
export const selectLoginPageState = createSelector(selectAuthState, (state: AuthState) => state.loginPage);
export const getLoginPageError = createSelector(selectLoginPageState, fromLogin.getError);
export const getLoginPagePending = createSelector(selectLoginPageState, fromLogin.getPending);


