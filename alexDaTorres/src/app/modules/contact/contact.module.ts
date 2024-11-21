import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { MatButtonModule } from '@angular/material/button';
import { ContactIconComponent } from "../../components/shortcut/contact-icon/contact-icon.component";
import { ContactFormComponent } from 'src/app/components/contact-form/contact-form.component';


@NgModule({
  declarations: [
    ContactComponent,
    ContactIconComponent,
    ContactFormComponent,

  ],
  imports: [
    ContactRoutingModule,
    MatButtonModule,
],
exports:[
  ContactComponent,
  ContactIconComponent,
  ContactFormComponent
]
})
export class ContactModule { }
