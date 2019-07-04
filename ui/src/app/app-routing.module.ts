import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {title: 'Main'},
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module')
        .then((mod) => mod.LoginModule)
        .catch(err => console.error(err)),
    data: {title: 'Login'}
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
