import {RouterReducerState} from '@ngrx/router-store';
import {AuthState, initialAuthState} from './auth.states';

export interface AppState {
  router?: RouterReducerState;
  auth: AuthState;
}

export const initialAppState: AppState = {
  auth: initialAuthState,
};

export function getInitialState(): AppState {
  return initialAppState;
}
