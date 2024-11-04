import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ContactComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MatButtonModule
  ]
})
export class ContactModule { }
