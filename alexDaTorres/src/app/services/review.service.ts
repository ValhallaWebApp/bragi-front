import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { catchError, map, mergeMap, Observable, of, switchMap, toArray } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}
   // Metodo per ottenere tutte le recensioni in un formato appiattito
   getAllReviews(): Observable<any[]> {
    return this.db
      .list('/reviews')
      .snapshotChanges()
      .pipe(
        map((snapshots) => {
          let flattenedReviews: any[] = [];
          snapshots.forEach(snapshotTmp => {
            const artworkReviews:any = snapshotTmp.payload.val();
            if (artworkReviews && typeof artworkReviews === 'object') {
              Object.entries(artworkReviews).forEach(([reviewKey, review]:any) => {
                // Aggiungi il `reviewId` e l'artworkId per ogni recensione
                Object.keys(review).map((key) => {
                 flattenedReviews.push(review[key])
                });
              });
            }
          });
          return flattenedReviews;
        }),
        catchError((error) => {
          console.error('Errore durante il recupero delle recensioni:', error);
          return of([]); // Restituisce un Observable con un array vuoto in caso di errore
        })
      );
  }

  // Aggiungi una nuova recensione
  async addReview(review: any, artwork: any): Promise<void> {
    try {
      console.log('Dati di input:', review, artwork);

      // Recupera l'utente attualmente loggato
      this.authService.getUser().subscribe(async (user: any) => {
        console.log(user);
        if (!user && !review.email) {
          console.log('Errore: email mancante per utenti non autenticati.');
        } else {
          const reviewId = this.db.createPushId(); // Genera un nuovo ID univoco per la recensione

          // Costruisci l'oggetto recensione con i campi richiesti
          const reviewData = {
            artworkId: artwork.id,
            artworkTitle: artwork.title,
            comment: review.comment,
            createdAt: new Date().toISOString(),
            id: reviewId,
            rating: review.rating,
            reviewId: reviewId,
            userEmail: user ? user.email : review.email,
            userId: user ? user.uid : null,
          };

          console.log('Oggetto recensione da salvare:', reviewData);
          const id = this.db.createPushId(); // Genera un nuovo ID univoco

          // Salva la recensione nel database
          this.db
            .object(`/reviews/${artwork.id}/reviews/${id}`)
            .set(reviewData)
            .then((ele) => {
              console.log('Recensione aggiunta con successo.', ele);
            })
            .catch((error) => {
              throw new Error(
                "Devi essere loggato o fornire un'email valida per inviare una recensione."
              );
            });
        }
      });
    } catch (error: any) {
      console.error(
        "Errore durante l'aggiunta della recensione:",
        error.message
      );

      // Restituisci un errore specifico per dare feedback all'utente chiamante
      throw new Error(
        "Errore durante l'aggiunta della recensione. Dettagli: " + error.message
      );
    }
  }
  // Ottieni tutte le recensioni di un utente
  getReviewsByUser(userId: string): Observable<any[]> {
    return this.db
      .list('/reviews') // Primo livello: Otteniamo una lista di tutte le recensioni per ogni artwork
      .snapshotChanges()
      .pipe(
        switchMap((actions) => {
          const userReviews: any[] = [];

          // Iteriamo su ogni artwork per trovare le recensioni dell'utente
          actions.forEach((artwork) => {
            const artworkId = artwork.key;

            // Controlliamo se ci sono recensioni per l'opera
            if (artworkId) {
              this.db
                .list(`/reviews/${artworkId}/reviews`, (ref) =>
                  ref.orderByChild('userId').equalTo(userId)
                )
                .valueChanges()
                .subscribe((reviews) => {
                  if (reviews && reviews.length > 0) {
                    userReviews.push(...reviews);
                  }
                });
            }
          });

          return of(userReviews);
        }),
        catchError((error) => {
          console.error(
            "Errore durante il recupero delle recensioni dell'utente:",
            error
          );
          return of([]); // Restituisce un Observable con un array vuoto in caso di errore
        })
      );
  }

  // Ottieni tutte le recensioni di un'opera d'arte
  getReviewsByArtwork(artworkId: string): Observable<any[]> {
    return this.db
      .list(`/reviews/${artworkId}/reviews`)
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error(
            "Errore durante il recupero delle recensioni dell'opera:",
            error
          );
          return of([]); // Restituisce un Observable con un array vuoto in caso di errore
        })
      );
  }

  // Modifica una recensione esistente
  updateReview(review: any, updatedReview: any): Promise<void> {
    let { artworkId, reviewId } = review;
    return this.db
      .object(`/reviews/${artworkId}/reviews/${reviewId}`)
      .update({
        ...updatedReview,
        updatedAt: new Date().toISOString(),
      })
      .then(() => {
        console.log('Recensione aggiornata con successo.');
      })
      .catch((error) => {
        console.error(
          "Errore durante l'aggiornamento della recensione:",
          error
        );
        throw new Error("Errore durante l'aggiornamento della recensione.");
      });
  }

  // Elimina una recensione
  deleteReview(artworkId: string, reviewId: string): Promise<void> {
    return this.db
      .object(`/reviews/${artworkId}/reviews/${reviewId}`)
      .remove()
      .then(() => {
        console.log('Recensione eliminata con successo.');
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione della recensione:", error);
        throw new Error("Errore durante l'eliminazione della recensione.");
      });
  }
}
