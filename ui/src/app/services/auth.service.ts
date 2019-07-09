import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {ConnectableObservable, Observable, Observer} from 'rxjs';
import {publish} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private logger: NGXLogger) {
    this.logger.error('TEST ERROR!!!');

  }

  login$(email: string, password: string): Observable<any> {
    console.log(email, password);
    const obs = new Observable((observer: Observer<any>) => {
      this.http.post<any>('/api/v1/user/login', {email, password})
        .subscribe({
          next: (respone: any) => {
            observer.next(respone);
          },
          complete: () => observer.complete(),
          error: (err) => observer.error(err)
        });
    }).pipe(publish()) as ConnectableObservable<any>;
    obs.connect();

    return obs;
  }
}
