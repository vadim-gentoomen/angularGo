import * as fromRouter from '@ngrx/router-store';
import {RouterReducerState} from '@ngrx/router-store';
import * as fromAuth from './auth-reducer';
import * as fromLogin from './login-page.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface AppState {
  router: RouterReducerState;
  auth: fromAuth.State;
  login: fromLogin.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  auth: fromAuth.authReducer,
  login: fromLogin.loginPageReducer,
};


export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectAuthStatusState = createSelector(selectAuthState, (state: AppState) => state.auth.status);

export const selectLoginPageState = createSelector(selectAuthState, (state: AppState) => state.login);

export const getLoginPageError = createSelector(selectLoginPageState, fromLogin.getError);
export const getLoginPagePending = createSelector(selectLoginPageState, fromLogin.getPending);


