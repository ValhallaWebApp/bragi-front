import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { MatButtonModule } from '@angular/material/button';
import { ContactIconComponent } from "../../components/shortcut/contact-icon/contact-icon.component";


@NgModule({
  declarations: [
    ContactComponent,
    ContactIconComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MatButtonModule,
],
exports:[
  ContactIconComponent
]
})
export class ContactModule { }
