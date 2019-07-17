import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '@app/auth/services/auth.service';
import {Action} from '@ngrx/store';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AuthActions, AuthApiActions, LoginPageActions} from '@app/auth/store/actions';
import {Credentials} from '@app/auth/models/account';
import {LogoutConfirmationDialogComponent} from '@app/auth/components/logout-confirmaition/logout-confirmation-dialog.component';

@Injectable()
export class AuthEffects {

  login$: Observable<Action> = createEffect(() => this.actions$
    .pipe(
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

  logoutSuccess$: Observable<Action> = createEffect(() => this.actions$
      .pipe(
        ofType('[Auth] Logout Confirmed'),
        tap((data) => {
          console.log('Logout Confirmed', data);
          this.router.navigate(['/login']);
        }),
      ),
    {dispatch: false}
  );

  loginRedirect$ = createEffect(() => this.actions$
      .pipe(
        ofType(AuthApiActions.loginRedirect, AuthActions.logout),
        tap(authed => {
          this.router.navigate(['/login']);
        })
      ),
    {dispatch: false}
  );

  logoutConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutConfirmation),
      exhaustMap(() => {
        const dialogRef = this.dialog.open<LogoutConfirmationDialogComponent, undefined, boolean>(LogoutConfirmationDialogComponent);
        return dialogRef.afterClosed();
      }),
      map((result: boolean) => result ? AuthActions.logout() : AuthActions.logoutConfirmationDismiss()
      )
    )
  );

  constructor(private actions$: Actions,
              private authService: AuthService,
              private dialog: MatDialog,
              private router: Router) {
  }

}
