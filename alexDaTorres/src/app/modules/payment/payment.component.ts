import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import * as dropin from 'braintree-web-drop-in';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from 'src/app/components/dialog/dialog7feedback-dialog/dialog7feedback-dialog.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  dropinInstance: any;
  clientToken: string = '';

  constructor(
    private paymentService: PaymentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.paymentService.getClientToken().subscribe({
      next: (response) => {
        this.clientToken = response.clientToken;

        // Inizializza la Drop-In UI di Braintree
        dropin.create({
          authorization: this.clientToken,
          container: '#dropin-container'
        }, (err, instance) => {
          if (err) {
            console.error('Errore durante l\'inizializzazione di Braintree:', err);
            return;
          }
          this.dropinInstance = instance;
        });
      },
      error: (error) => {
        console.error('Errore nel recupero del client token:', error);
      }
    });
  }

  // Metodo per confermare il pagamento
  confirmPayment(): void {
    if (this.dropinInstance) {
      this.dropinInstance.requestPaymentMethod((err: any, payload: any) => {
        if (err) {
          console.error('Errore durante la richiesta del metodo di pagamento:', err);
          this.openFeedbackDialog({
            success: false,
            message: 'Errore durante la richiesta del metodo di pagamento.'
          });
          return;
        }

        // Chiama il service per processare il pagamento
        this.paymentService.processPayment(payload.nonce, 0.10).subscribe({
          next: (result) => {
            this.openFeedbackDialog({
              success: true,
              message: 'Il pagamento è stato effettuato con successo! ID transazione: ' + result.transactionId
            });
          },
          error: (error) => {
            this.openFeedbackDialog({
              success: false,
              message: 'Errore durante il pagamento: ' + error.message
            });
          }
        });
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
