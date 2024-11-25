import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { delay, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {}

  simulatePayment(amount: number): Observable<{ success: boolean; message: string }> {
    // Simulazione di un pagamento riuscito con un ritardo di 1 secondo
    return of({
      success: true,
      message: 'Pagamento simulato con successo!'
    }).pipe(delay(1000));
  }
}
