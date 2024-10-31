import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhoRoutingModule } from './who-routing.module';
import { WhoComponent } from './who.component';


@NgModule({
  declarations: [
    WhoComponent
  ],
  imports: [
    CommonModule,
    WhoRoutingModule
  ]
})
export class WhoModule { }
