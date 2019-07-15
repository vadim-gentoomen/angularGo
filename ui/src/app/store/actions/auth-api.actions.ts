import {createAction, props} from '@ngrx/store';
import {Account} from '@app/models/account';

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ account: Account, message: string, status: boolean }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: any }>()
);
