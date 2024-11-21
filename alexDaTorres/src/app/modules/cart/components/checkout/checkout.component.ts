import { FeedbackDialogComponent } from './../../../../components/dialog7feedback-dialog/dialog7feedback-dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
    // Inizializza il form di checkout
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      // zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],  // CAP deve essere di 5 cifre
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]]  // Numero di telefono
    });
  }

  ngOnInit(): void {
    // Ottieni gli articoli del carrello dal servizio CartService
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  placeOrder(): void {
    if (this.checkoutForm.valid && this.cartItems.length > 0) {
      // Invio dell'ordine
      const orderData = {
        cartItems: this.cartItems,
        shippingDetails: this.checkoutForm.value
      };

      // Salva i dettagli dell'ordine per la pagina di pagamento (puoi usare un servizio)
      sessionStorage.setItem('orderData', JSON.stringify(orderData));

      // Mostra un dialog di successo dopo aver effettuato l'ordine
      this.openFeedbackDialog({
        success: true,
        message: 'Il tuo ordine è stato confermato con successo!'
      });

      // Reindirizza l'utente alla pagina di pagamento
      this.router.navigate(['/payment']);


    } else {
      // Mostra un messaggio di errore se qualcosa non va
      this.openFeedbackDialog({
        success: false,
        message: 'Errore durante la conferma dell\'ordine. Verifica di aver riempito tutti i campi richiesti.'
      });
    }
  }

  openFeedbackDialog(response: { success: boolean; message: string }): void {
    this.dialog.open(FeedbackDialogComponent, {
      width: '400px',
      data: {
        message: response.message,
        success: response.success
      }
    });
  }
}
