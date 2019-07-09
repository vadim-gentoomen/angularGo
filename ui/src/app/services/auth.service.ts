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

  login$(email: string, password: string): Observable<Account> {
    console.log(email, password);
    const obs = new Observable((observer: Observer<Account>) => {
      this.http.post<any>('/api/v1/user/login', {email, password})
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
