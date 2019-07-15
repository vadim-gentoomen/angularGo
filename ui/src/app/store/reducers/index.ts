import * as fromRouter from '@ngrx/router-store';
import {RouterReducerState} from '@ngrx/router-store';
import * as fromAuth from './auth-reducer';
import * as fromLogin from './login-page.reducer';
import {ActionReducerMap} from '@ngrx/store';

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




