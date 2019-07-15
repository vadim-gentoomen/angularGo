import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {ConnectableObservable, Observable, Observer} from 'rxjs';
import {publish} from 'rxjs/operators';
import {Account, AuthResponce, Credentials} from '../models/account';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private logger: NGXLogger) {
    this.logger.error('TEST ERROR!!!');

  }

  login$(credentials: Credentials): Observable<AuthResponce> {
    const {email, password} = credentials;
    console.log(credentials);
    const obs = new Observable((observer: Observer<AuthResponce>) => {
      this.http.post<AuthResponce>(`${environment.serverUrl}/api/v1/user/login`, credentials)
      // TODO: try if network error
        .subscribe({
          next: (respone: AuthResponce) => {
            observer.next(respone);
          },
          complete: () => observer.complete(),
          error: (err) => observer.error(err)
        });
    }).pipe(publish()) as ConnectableObservable<AuthResponce>;
    obs.connect();

    return obs;
  }

  signup$(account: Account): Observable<AuthResponce> {
    const obs = new Observable((observer: Observer<AuthResponce>) => {
      this.http.post<any>(`${environment.serverUrl}/api/v1/user/new`, account)
      // TODO: try if network error
        .subscribe({
          next: (respone: any) => {
            observer.next(respone);
          },
          complete: () => observer.complete(),
          error: (err) => observer.error(err)
        });
    }).pipe(publish()) as ConnectableObservable<AuthResponce>;
    obs.connect();

    return obs;
  }
}
