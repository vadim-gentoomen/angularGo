import {ActionReducerMap} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';
import {AppState} from '../state/app.states';
import {authReducer} from './authReducers';


export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  auth: authReducer,
};
