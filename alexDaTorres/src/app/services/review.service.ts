import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private db: AngularFireDatabase) {}

  // Aggiungi una nuova recensione
  addReview(review: any): Promise<void> {
    const id = this.db.createPushId(); // Genera un nuovo ID univoco per la recensione
    return this.db
      .object(`/reviews/${id}`)
      .set({
        ...review,
        id: id,
        createdAt: new Date().toISOString(),
      })
      .then(() => {
        console.log('Recensione aggiunta con successo.');
      })
      .catch((error) => {
        console.error('Errore durante l\'aggiunta della recensione:', error);
        throw new Error('Errore durante l\'aggiunta della recensione.');
      });
  }

  // Ottieni tutte le recensioni di un utente
  getReviewsByUser(userId: string): Observable<any[]> {
    return this.db
      .list('/reviews', (ref) => ref.orderByChild('userId').equalTo(userId))
      .valueChanges();
  }

  // Ottieni tutte le recensioni di un'opera d'arte
  getReviewsByArtwork(artworkId: string): Observable<any[]> {
    return this.db
      .list('/reviews', (ref) => ref.orderByChild('artworkId').equalTo(artworkId))
      .valueChanges();
  }

  // Modifica una recensione esistente
  updateReview(reviewId: string, updatedReview: any): Promise<void> {
    return this.db
      .object(`/reviews/${reviewId}`)
      .update({
        ...updatedReview,
        updatedAt: new Date().toISOString(),
      })
      .then(() => {
        console.log('Recensione aggiornata con successo.');
      })
      .catch((error) => {
        console.error('Errore durante l\'aggiornamento della recensione:', error);
        throw new Error('Errore durante l\'aggiornamento della recensione.');
      });
  }

  // Elimina una recensione
  deleteReview(reviewId: string): Promise<void> {
    return this.db
      .object(`/reviews/${reviewId}`)
      .remove()
      .then(() => {
        console.log('Recensione eliminata con successo.');
      })
      .catch((error) => {
        console.error('Errore durante l\'eliminazione della recensione:', error);
        throw new Error('Errore durante l\'eliminazione della recensione.');
      });
  }
}
