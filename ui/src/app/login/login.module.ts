import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {LoginRoutingModule} from './login-routing.module';
import {RegisterComponent} from './components/register/register.component';
import {RecoveryComponent} from './components/recovery/recovery.component';
import {LoginMaterialModule} from '@app/login/login-material.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, RecoveryComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginMaterialModule
  ]
})
export class LoginModule {
  constructor() {
  }
}
