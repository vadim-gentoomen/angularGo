import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {ConnectableObservable, Observable, Observer} from 'rxjs';
import {publish} from 'rxjs/operators';
import {Account} from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private logger: NGXLogger) {
    this.logger.error('TEST ERROR!!!');

  }

  login$(account: Account): Observable<Account> {
    const obs = new Observable((observer: Observer<Account>) => {
      this.http.post<any>('/api/v1/user/login', account)
        .subscribe({
          next: (respone: any) => {
            observer.next(respone);
          },
          complete: () => observer.complete(),
          error: (err) => observer.error(err)
        });
    }).pipe(publish()) as ConnectableObservable<Account>;
    obs.connect();

    return obs;
  }
}
