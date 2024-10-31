import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Gallery3dRoutingModule } from './gallery3d-routing.module';
import { Gallery3dComponent } from './gallery3d.component';


@NgModule({
  declarations: [
    Gallery3dComponent
  ],
  imports: [
    CommonModule,
    Gallery3dRoutingModule
  ]
})
export class Gallery3dModule { }
