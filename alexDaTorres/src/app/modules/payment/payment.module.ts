import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { PaymentComponent } from './payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
PaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
    MatCardModule
  ]
})
export class PaymentModule { }
