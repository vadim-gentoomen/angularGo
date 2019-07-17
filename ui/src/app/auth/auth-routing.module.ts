import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {RecoveryComponent} from './components/recovery/recovery.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, data: { title: 'Login' }},
  {path: 'register', component: RegisterComponent, data: { title: 'Register' }},
  {path: 'recovery', component: RecoveryComponent, data: { title: 'Recovery' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
