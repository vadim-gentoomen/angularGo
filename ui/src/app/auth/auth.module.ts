import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthMaterialModule} from '@app/auth/auth-material.module';
import {AuthRoutingModule} from '@app/auth/auth-routing.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from '@app/auth/store/effects/auth.effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {reducers} from '@app/auth/store/reducers';
import {LogoutConfirmationDialogComponent} from '@app/auth/components/logout-confirmaition/logout-confirmation-dialog.component';
import {LoginComponent} from '@app/auth/components/login/login.component';
import {RecoveryComponent} from '@app/auth/components/recovery/recovery.component';
import {RegisterComponent} from '@app/auth/components/register/register.component';

const COMPONENTS = [
  LoginComponent,
  RecoveryComponent,
  RegisterComponent,
  LogoutConfirmationDialogComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    AuthMaterialModule,
    // AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  entryComponents: [LogoutConfirmationDialogComponent],
})
export class AuthModule {
}
