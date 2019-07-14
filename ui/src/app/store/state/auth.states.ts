import {Account} from '../../models/account';

export interface AuthState {
  isAuthenticated: boolean;
  account: Account | null;
  errorMessage: string | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  account: null,
  errorMessage: null
};

