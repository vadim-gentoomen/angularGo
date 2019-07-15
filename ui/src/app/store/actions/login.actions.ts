import {createAction, props} from '@ngrx/store';
import {Credentials} from '@app/models/account';

export const login = createAction(
  '[Login Page] Login',
  props<{ credentials: Credentials }>()
);
