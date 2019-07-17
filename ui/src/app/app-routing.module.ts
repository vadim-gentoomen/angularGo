import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '@app/auth/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {title: 'Login'}
  },

  // {
  //   path: 'main',
  //   loadChildren: () =>
  //     import('./main/main.module')
  //       .then((mod) => mod.MainModule)
  //       .catch(err => console.error(err)),
  //   data: {title: 'main'}
  // },
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
