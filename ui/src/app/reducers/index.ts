import {Action, ActionReducer, ActionReducerMap, MetaReducer,} from '@ngrx/store';
import {InjectionToken} from '@angular/core';
import {environment} from '@env/environment';
import * as fromRouter from '@ngrx/router-store';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>(
  'Root reducers token',
  {factory: () => ({
    router: fromRouter.routerReducer,
  }),
}
);

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];

