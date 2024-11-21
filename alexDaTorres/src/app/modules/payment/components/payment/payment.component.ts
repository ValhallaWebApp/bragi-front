import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from 'src/app/components/dialog/dialog7feedback-dialog/dialog7feedback-dialog.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  selectedPaymentMethod: string = 'creditCard';
  creditCardForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    // Inizializza il form per i dettagli della carta di credito
    this.creditCardForm = this.fb.group({
      cardName: ['', Validators.required],
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')] // Deve essere un numero di 16 cifre
      ],
      expiryDate: ['', Validators.required],
      cvv: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{3}$')] // Deve essere un numero di 3 cifre
      ]
    });
  }

  ngOnInit(): void {}

  // Metodo per confermare il pagamento
  confirmPayment(): void {
    if (this.selectedPaymentMethod === 'creditCard' && this.creditCardForm.valid) {
      this.openFeedbackDialog({
        success: true,
        message: 'Il pagamento con carta di credito è stato effettuato con successo!'
      });
    } else if (this.selectedPaymentMethod === 'paypal') {
      this.openFeedbackDialog({
        success: true,
        message: 'Verrai reindirizzato a PayPal per completare il pagamento.'
      });
    } else {
      this.openFeedbackDialog({
        success: false,
        message: 'Errore durante il pagamento. Verifica i dettagli inseriti.'
      });
    }
  }

  // Verifica se il form è valido
  isFormValid(): boolean {
    if (this.selectedPaymentMethod === 'creditCard') {
      return this.creditCardForm.valid;
    }
    return this.selectedPaymentMethod === 'paypal';
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
