import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@angular/cdk/dialog';
import { FeedbackDialogComponent } from 'src/app/components/dialog/dialog7feedback-dialog/dialog7feedback-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    OrderSummaryComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatCardModule,        // Per usare <mat-card>
    MatButtonModule,      // Per usare <button mat-button> e <button mat-raised-button>
    MatIconModule,        // (opzionale) Per icone come mat-card-avatar
    MatToolbarModule,     // (opzionale) Per la toolbar
    MatDividerModule,     // (opzionale) Per divisori se necessario
    DialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class CartModule { }
