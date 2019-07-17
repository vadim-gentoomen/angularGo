import {Account} from '@app/auth/models/account';
import {createReducer, on} from '@ngrx/store';
import {AuthActions, AuthApiActions} from '@app/auth/store/actions';

export interface State {
  account: Account | null;
}

export const initialState: State = {
  account: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthApiActions.loginSuccess, (state, {account}) => ({...state, account})),
  on(AuthActions.logout, () => initialState)
);

export const getAccount = (state: State) => state.account;
