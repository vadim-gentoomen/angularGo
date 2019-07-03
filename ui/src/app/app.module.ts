import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthService} from './services/auth.service';
import {LoggerModule, NGXLogger, NgxLoggerLevel} from 'ngx-logger';
import {environment} from '../environments/environment';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      disableConsoleLogging: environment.production,
      serverLoggingUrl: '/api/logs',
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
  ],
  providers: [
    AuthGuard,
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
