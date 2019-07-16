import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {StoreModule} from '@ngrx/store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthService} from '@app/services/auth.service';
import {LoggerModule, NGXLogger, NgxLoggerLevel} from 'ngx-logger';
import {environment} from '@env/environment';
import {HomeComponent} from '@app/components/home/home.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {AuthEffects} from './store/effects/auth.effects';
import {EffectsModule} from '@ngrx/effects';
import {appReducers} from '@app/store/reducers';
import {AppMaterialModule} from '@app/app-material.module';
import {HeaderComponent} from '@app/components/header/header.component';
import {HomeLayoutComponent} from '@app/components/home-layout/home-layout.component';
import {LogoutConfirmationDialogComponent} from '@app/components/logout-confirmaition/logout-confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeLayoutComponent,
    HeaderComponent,
    LogoutConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      disableConsoleLogging: environment.production,
      serverLoggingUrl: `${environment.serverUrl}/api/logs`,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
    StoreModule.forRoot(appReducers),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    EffectsModule.forRoot([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  entryComponents: [LogoutConfirmationDialogComponent],
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
