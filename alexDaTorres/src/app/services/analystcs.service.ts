import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private db: AngularFireDatabase) {}

  // Ottieni il numero totale di visualizzazioni per tutte le opere
  getTotalArtworkViews(): Observable<number> {
    return this.db
      .list('/user_events', ref => ref.orderByChild('eventType').equalTo('viewArtwork'))
      .valueChanges()
      .pipe(
        map((views: any[]) => views.length),
        catchError((error) => {
          console.error('Errore durante il recupero delle visualizzazioni:', error);
          return of(0);
        })
      );
  }

  // Ottieni il numero totale di aggiunte al carrello per tutte le opere
  getTotalAddToCart(): Observable<number> {
    return this.db
      .list('/user_events', ref => ref.orderByChild('eventType').equalTo('addToCart'))
      .valueChanges()
      .pipe(
        map((carts: any[]) => carts.length),
        catchError((error) => {
          console.error('Errore durante il recupero delle aggiunte al carrello:', error);
          return of(0);
        })
      );
  }

  // Ottieni il numero di azioni eseguite da utenti loggati e non loggati
  getUserEventsStats(): Observable<{ loggedIn: number; anonymous: number }> {
    return this.db
      .list('/user_events')
      .valueChanges()
      .pipe(
        map((events: any[]) => {
          let loggedIn = 0;
          let anonymous = 0;
          events.forEach((event) => {
            if (event.userId && event.userId !== 'anonymous') {
              loggedIn++;
            } else {
              anonymous++;
            }
          });
          return { loggedIn, anonymous };
        }),
        catchError((error) => {
          console.error('Errore durante il recupero delle statistiche utenti:', error);
          return of({ loggedIn: 0, anonymous: 0 });
        })
      );
  }

  // Ottieni il numero di visualizzazioni e aggiunte per ogni singola opera
  getArtworkStats(): Observable<any[]> {
    return this.db
      .list('/user_events')
      .valueChanges()
      .pipe(
        map((events: any[]) => {
          const artworkStats: any = {};
          events.forEach((event: any) => {
            if (event.eventType === 'viewArtwork' || event.eventType === 'addToCart') {
              if (!artworkStats[event.artworkId]) {
                artworkStats[event.artworkId] = { title: event.artworkTitle, views: 0, addsToCart: 0 };
              }
              if (event.eventType === 'viewArtwork') {
                artworkStats[event.artworkId].views++;
              } else if (event.eventType === 'addToCart') {
                artworkStats[event.artworkId].addsToCart++;
              }
            }
          });
          return Object.values(artworkStats);
        }),
        catchError((error) => {
          console.error('Errore durante il recupero delle statistiche delle opere:', error);
          return of([]);
        })
      );
  }

  getOverallArtworkStats(): Observable<{ title: string, views: number, addsToCart: number }[]> {
    return this.db
      .list('/user_events')
      .valueChanges()
      .pipe(
        map((events: any[]) => {
          const stats = new Map<string, { title: string, views: number, addsToCart: number }>();

          events.forEach(event => {
            if (event.eventType === 'viewArtwork' || event.eventType === 'addToCart') {
              if (!stats.has(event.artworkId)) {
                stats.set(event.artworkId, {
                  title: event.artworkTitle,
                  views: 0,
                  addsToCart: 0
                });
              }

              const artworkStat = stats.get(event.artworkId)!;

              if (event.eventType === 'viewArtwork') {
                artworkStat.views++;
              } else if (event.eventType === 'addToCart') {
                artworkStat.addsToCart++;
              }

              stats.set(event.artworkId, artworkStat);
            }
          });

          return Array.from(stats.values());
        }),
        catchError((error) => {
          console.error('Errore durante il recupero delle statistiche generali delle opere:', error);
          return of([]);
        })
      );
  }
}
