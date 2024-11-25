import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from 'src/app/components/dialog/dialog7feedback-dialog/dialog7feedback-dialog.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private dialog: MatDialog
  ) {
    // Inizializza il form di checkout con i campi richiesti
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Recupera gli articoli nel carrello dal servizio del carrello
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  // Metodo per piazzare l'ordine
  placeOrder(): void {
    if (this.checkoutForm.valid) {
      const shippingDetails = this.checkoutForm.value


      this.orderService.placeOrder(shippingDetails).then((result) => {
        // Mostra feedback all'utente
        this.dialog.open(FeedbackDialogComponent, {
          width: '400px',
          data: {
            message: result.message,
            success: result.success,
          }
        });
      }).catch((error) => {
        console.error('Errore durante l\'ordine:', error);
        this.dialog.open(FeedbackDialogComponent, {
          width: '400px',
          data: {
            message: 'Errore durante l\'ordine. Riprovare più tardi.',
            success: false,
          }
        });
      });
    }
  }
}
