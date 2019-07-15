import {NgModule} from '@angular/core';
import {AuthGuard} from '@app/services/auth.guard';
import {RouterModule, Routes} from '@angular/router';
import {HomeLayoutComponent} from '@app/components/home-layout/home-layout.component';
import {HomeComponent} from '@app/components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    data: {title: 'Main'},
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
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
