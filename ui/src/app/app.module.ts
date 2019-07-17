import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {StoreModule} from '@ngrx/store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthService} from '@app/auth/services/auth.service';
import {LoggerModule, NGXLogger, NgxLoggerLevel} from 'ngx-logger';
import {environment} from '@env/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';
import {AuthEffects} from './auth/store/effects/auth.effects';
import {EffectsModule} from '@ngrx/effects';
import {AppMaterialModule} from '@app/app-material.module';
import {metaReducers, ROOT_REDUCERS} from '@app/reducers';
import {AuthModule} from '@app/auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      disableConsoleLogging: environment.production,
      serverLoggingUrl: `${environment.serverUrl}/api/logs`,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
    StoreModule.forRoot(ROOT_REDUCERS, {
      // metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
    StoreRouterConnectingModule.forRoot({routerState: RouterState.Minimal}),
    StoreDevtoolsModule.instrument({name: 'NgRx App'}),



    EffectsModule.forRoot([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
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
