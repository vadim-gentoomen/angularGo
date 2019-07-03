import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { StartPageComponent } from './start-page/start-page.component';
import {StartPageRoutingModule} from "./start-page-routing.module";

@NgModule({
  declarations: [StartPageComponent],
  imports: [
    CommonModule,
    StartPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class StartPageModule {
  constructor() {
  }
}
