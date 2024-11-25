import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();
  userId: string = 'guest'; // In un'app reale, potresti recuperare l'ID dell'utente autenticato

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    // Carica il carrello dall'inizio
   this.afAuth.authState.subscribe((user) => {
    if (user) {
      this.userId = user.uid; // Usa l'UID dell'utente autenticato
    } else {
      this.userId = 'guest'; // Se non loggato, usa "guest"
    }
    // Carica il carrello per l'utente corrente
    this.loadCart();
  });
  }

  private loadCart(): void {
    this.db
      .list(`/carts/${this.userId}`)
      .valueChanges()
      .subscribe((items: any[]) => {
        this.cart.next(items);
      });
  }

  addArtworkToCart(artwork: any): Promise<{ success: boolean; message: string; data?: any }> {
    if (artwork?.isSold) {
      return Promise.resolve({
        success: false,
        message: 'L\'opera è già stata venduta e non può essere aggiunta al carrello.',
        data: {
          artwork,
          params: { userId: this.userId }
        }
      });
    }

    const currentCart = this.cart.getValue();

    // Controlla se l'opera è già nel carrello per evitare duplicati
    const isAlreadyInCart = currentCart.some(item => item.id === artwork.id);
    if (isAlreadyInCart) {
      return Promise.resolve({
        success: false,
        message: 'L\'opera è già nel carrello.',
        data: {
          artwork,
          params: { userId: this.userId }
        }
      });
    }

    const updatedCart = [...currentCart, artwork];
    this.cart.next(updatedCart);

    return this.saveCart(updatedCart)
      .then(() => ({
        success: true,
        message: 'Opera aggiunta con successo al carrello!',
        data: {
          artwork,
          params: { userId: this.userId, updatedCart }
        }
      }))
      .catch((error) => ({
        success: false,
        message: `Errore durante il salvataggio dell'opera nel carrello: ${error.message}`,
        data: {
          artwork,
          params: { userId: this.userId, updatedCart }
        }
      }));
  }

  removeArtworkFromCart(artworkId: string): Promise<{ success: boolean; message: string; data?: any }> {
    const currentCart = this.cart.getValue();
    const updatedCart = currentCart.filter(item => item.id !== artworkId);
    const removedArtwork = currentCart.find(item => item.id === artworkId);
    this.cart.next(updatedCart);

    return this.saveCart(updatedCart)
      .then(() => ({
        success: true,
        message: 'Opera rimossa con successo dal carrello.',
        data: {
          removedArtwork,
          params: { userId: this.userId, artworkId, updatedCart }
        }
      }))
      .catch((error) => ({
        success: false,
        message: `Errore durante la rimozione dell'opera dal carrello: ${error.message}`,
        data: {
          removedArtwork,
          params: { userId: this.userId, artworkId, updatedCart }
        }
      }));
  }

  private saveCart(cart: any[]): Promise<void> {
    return this.db.object(`/carts/${this.userId}`).set(cart);
  }

  clearCart(): Promise<{ success: boolean; message: string; data?: any }> {
    const currentCart = this.cart.getValue();
    this.cart.next([]);
    return this.db.object(`/carts/${this.userId}`).remove()
      .then(() => ({
        success: true,
        message: 'Carrello svuotato con successo.',
        data: {
          params: { userId: this.userId, previousCart: currentCart }
        }
      }))
      .catch((error) => ({
        success: false,
        message: `Errore durante la rimozione del carrello: ${error.message}`,
        data: {
          params: { userId: this.userId, previousCart: currentCart }
        }
      }));
  }

}
