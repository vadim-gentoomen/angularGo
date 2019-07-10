import {Account} from '../../models/account';

export interface AccountState {
  isAuthenticated: boolean;
  account: Account | null;
  errorMessage: string | null;
}

export const initialAccountState: AccountState = {
  isAuthenticated: false,
  account: null,
  errorMessage: null
};

