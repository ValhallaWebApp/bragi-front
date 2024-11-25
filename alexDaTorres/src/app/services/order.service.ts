import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CartService } from './cart.service';
import { take, switchMap,map,  catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  getOrdersByUser(): Observable<any[]> {
    return this.authService.getUser().pipe(
      switchMap((user:any) => {
        if (user) {
          return this.db
            .list('orders', ref => ref.orderByChild('userId').equalTo(user.uid))
            .snapshotChanges() // Usa snapshotChanges per ottenere anche gli ID
            .pipe(
              map((changes:any) =>
                changes.map((c:any) => ({
                  id: c.payload.key, // Estrai l'ID dell'ordine
                  ...c.payload.val() // Unisci l'ID con gli altri dati dell'ordine
                }))
              ),
              catchError((error) => {
                console.error('Errore durante il recupero degli ordini:', error);
                return of([]); // Restituisce un Observable con un array vuoto in caso di errore
              })
            );
        } else {
          console.error('Utente non autenticato. Impossibile recuperare gli ordini.');
          return of([]); // Restituisce un Observable con un array vuoto se l'utente non è autenticato
        }
      }),
      catchError((error) => {
        console.error('Errore durante la verifica dell\'utente:', error);
        return of([]); // Restituisce un Observable con un array vuoto in caso di errore generale
      })
    );
  }
  // Metodo per piazzare un ordine
  async placeOrder(shippingDetails: any): Promise<{ success: boolean; message: string }> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        const cartItems: any = await this.cartService.cart$.pipe(take(1)).toPromise(); // Ottieni gli articoli nel carrello una volta
        if (cartItems.length === 0) {
          return {
            success: false,
            message: 'Il carrello è vuoto. Aggiungi degli articoli prima di procedere.',
          };
        }

        // Costruisci i dati dell'ordine
        const orderData = {
          userId: user.uid,
          cartItems: cartItems,
          amount: cartItems.reduce((acc: any, item: any) => acc + (item.price || 0) * (item.quantity || 1), 0), // Calcola il totale
          orderDate: new Date().toISOString(),
          shippingDetails: shippingDetails,
          status: 'In elaborazione',
        };

        // Salva l'ordine nel RealTime Database
        await this.db.list('orders').push(orderData);

        // Svuota il carrello dopo aver piazzato l'ordine
        await this.cartService.clearCart();

        return {
          success: true,
          message: 'Ordine piazzato con successo!',
        };
      } else {
        return {
          success: false,
          message: 'Devi effettuare il login per piazzare un ordine.',
        };
      }
    } catch (error) {
      console.error("Errore durante la creazione dell'ordine:", error);
      return {
        success: false,
        message: "Errore durante la creazione dell'ordine. Riprova più tardi.",
      };
    }
  }
}
