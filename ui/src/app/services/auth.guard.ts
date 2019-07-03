import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this._isLoggerIn$(state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this._isLoggerIn$(state);
  }

  private _isLoggerIn$(state: RouterStateSnapshot): boolean {
    // TODO: ...
    if (0) {
      return true;
    } else {
      this._router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}