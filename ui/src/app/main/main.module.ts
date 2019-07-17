import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from '@app/main/components/home/home.component';
import {HomeLayoutComponent} from '@app/main/components/home-layout/home-layout.component';
import {HeaderComponent} from '@app/main/components/header/header.component';
import {MainMaterialModule} from '@app/main/main-material.module';
import {MainRoutingModule} from '@app/main/main-routing.module';

export const COMPONENTS = [
  HomeComponent,
  HomeLayoutComponent,
  HeaderComponent,
];


@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MainMaterialModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
