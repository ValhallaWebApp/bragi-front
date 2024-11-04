import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MostreRoutingModule } from './mostre-routing.module';
import { MostreComponent } from './mostre.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    MostreComponent
  ],
  imports: [
    CommonModule,
    MostreRoutingModule,
    MatButtonModule
  ]
})
export class MostreModule { }
