import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '@app/services/auth.service';
import {Router} from '@angular/router';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';

@Injectable()
export class AuthEffects {

  // login$ = createEffect(() => this.actions$.pipe(
  //   ofType('[Auth] Login'),
  //   tap((data) => console.log('Login', data)),
  //   switchMap(() => this.authService.login$()
  //     .pipe(
  //       map(data => ({ type: '[Auth] Login', payload: data })),
  //       catchError(() => EMPTY)
  //     ))
  //   ),
  //   {dispatch: false}
  // );

  logoutSuccess$ = createEffect(() => this.actions$.pipe(
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
