import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrosComponent } from './bros/bros.component';



@NgModule({
  declarations: [BrosComponent],
  exports: [BrosComponent],
  imports: [
    CommonModule
  ]
})
export class BigbrosModule { }
