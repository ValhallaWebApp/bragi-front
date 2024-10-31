import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MostreRoutingModule } from './mostre-routing.module';
import { MostreComponent } from './mostre.component';


@NgModule({
  declarations: [
    MostreComponent
  ],
  imports: [
    CommonModule,
    MostreRoutingModule
  ]
})
export class MostreModule { }
