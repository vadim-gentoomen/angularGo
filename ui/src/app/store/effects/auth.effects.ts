import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '@app/services/auth.service';
import {Action} from '@ngrx/store';
import {Router} from '@angular/router';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AuthApiActions, LoginPageActions} from '@app/store/actions';
import {Credentials} from '@app/models/account';

@Injectable()
export class AuthEffects {

  login$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(LoginPageActions.login),
    map(action => action.credentials),
    exhaustMap((credentials: Credentials) => {
      return this.authService.login$(credentials)
        .pipe(
          tap((data) => console.log('Login Response', data)),
          map(({account, message, status}) => AuthApiActions.loginSuccess({account, message, status})),
          catchError(error => of(AuthApiActions.loginFailure({error})))
        );
    })
    ),
  );

  logoutSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType('[Auth] Logout Confirmed'),
    tap((data) => {
      console.log('Logout Confirmed', data);
      this.router.navigate(['/login']);
    }),
    ),
    {dispatch: false}
  );

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {
  }

}
