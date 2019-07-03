import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthService} from "./services/auth.service";
import {LoggerModule, NGXLogger, NgxLoggerLevel} from "ngx-logger";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      disableConsoleLogging: environment.production,
      serverLoggingUrl: '/api/logs',
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private log: NGXLogger,
              private auth: AuthService) {
    if (!environment.production) {
      log.updateConfig({level: NgxLoggerLevel.DEBUG});
    }
  }
}
