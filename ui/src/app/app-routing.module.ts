import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'login',
    // loadChildren: './start-page/start-page.module#StartPageModule'
    loadChildren: () =>
      import('./start-page/start-page.module')
        .then((mod) => {
          console.log(mod);
          return mod.StartPageModule
        })
        .catch(err => console.error(err))
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
