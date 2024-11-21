import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://127.0.0.1:5001/bragi-alex/us-central1';

  constructor(private http: HttpClient) {}

  // Metodo per ottenere il client token di Braintree dal backend
  getClientToken(): Observable<{ clientToken: string }> {
    return this.http.get<{ clientToken: string }>(`${this.baseUrl}/generateToken`);
  }

  // Metodo per processare il pagamento con il nonce ricevuto
  processPayment(nonce: string, amount: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/processPayment`, {
      paymentMethodNonce: nonce,
      amount: amount
    });
  }
}
