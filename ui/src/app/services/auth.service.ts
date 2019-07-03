import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NGXLogger} from "ngx-logger";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private logger: NGXLogger) {
    // this.logger.error('TEST ERROR!!!');

  }
}
