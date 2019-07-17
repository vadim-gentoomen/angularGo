import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeLayoutComponent} from '@app/main/components/home-layout/home-layout.component';

export const routes: Routes = [
  {path: 'main', component: HomeLayoutComponent, data: { title: 'Main' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
