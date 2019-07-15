import {Account} from '@app/models/account';
import {createReducer, on} from '@ngrx/store';
import {AuthActions, AuthApiActions} from '@app/store/actions';

export interface State {
  account: Account | null;
  message: string;
  status: boolean;
}

export const initialState: State = {
  account: null,
  message: '',
  status: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthApiActions.loginSuccess, (state, {account}) => ({...state, account})),
  on(AuthActions.logout, () => initialState)
);

export const getUser = (state: State) => state.account;
