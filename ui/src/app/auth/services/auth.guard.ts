import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

import * as fromAuth from '@app/auth/store/reducers';
import {AuthApiActions} from '@app/auth/store/actions';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {
  }

  canActivate(): Observable<boolean> {
    return this.store
      .pipe(
        select(fromAuth.getLoggedIn),
        map((authed: boolean) => {
          if (!authed) {
            this.store.dispatch(AuthApiActions.loginRedirect());
            return false;
          }
          return true;
        }),
        take(1),
      );
  }
}
