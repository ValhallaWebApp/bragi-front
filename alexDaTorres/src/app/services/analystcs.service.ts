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

  getOverallArtworkStats(timePeriod:string): Observable<{ title: string, views: number, addsToCart: number }[]> {
    return this.db
      .list('/user_events')
      .valueChanges()
      .pipe(
        map((events: any[]) => {
          const stats = new Map<string, { title: string, views: number, addsToCart: number }>();

          // Ottieni la data corrente
          const now = new Date();
          let startDate: Date;

          // Definisci la data di inizio in base al periodo selezionato
          if (timePeriod === 'month') {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Inizio del mese corrente
          } else if (timePeriod === 'week') {
            startDate = new Date(now);
            startDate.setDate(now.getDate() - now.getDay()); // Inizio della settimana corrente (domenica)
          } else {
            startDate = new Date(0); // Imposta una data di inizio molto lontana se non specificato
          }

          events.forEach(event => {
            const eventDate = new Date(event.timestamp);
            // Filtra gli eventi che non rientrano nel periodo selezionato
            if (eventDate >= startDate) {
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
  // Raccoglie tutte le posizioni geografiche dalle interazioni degli utenti
  getLocationStats(): Observable<{ name: string, value: number }[]> {
    return this.db.list('/user_events')
      .valueChanges()
      .pipe(
        map((events: any[]) => {
          const countryCount: { [key: string]: number } = {};
          events.forEach((event: any) => {
            if (event.location && event.location.country) {
              const country = event.location.country;
              countryCount[country] = (countryCount[country] || 0) + 1;
            }
          });

          return Object.keys(countryCount).map(key => ({
            name: key,
            value: countryCount[key]
          }));
        }),
        catchError((error) => {
          console.error('Errore durante il recupero delle statistiche geografiche:', error);
          return of([]);
        })
      );
  }
  getArtworkTrendsStats(timePeriod: string, interactionType: string): Observable<{ name: string, series: { name: string, value: number }[] }[]> {
    return this.db
      .list('/user_events')
      .valueChanges()
      .pipe(
        map((events: any[]) => {
          const stats = new Map<string, { name: string, series: { name: string, value: number }[] }>();

          // Ottieni la data corrente
          const now = new Date();
          let startDate: Date;

          // Definisci la data di inizio in base al periodo selezionato
          if (timePeriod === 'month') {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          } else if (timePeriod === 'week') {
            startDate = new Date(now);
            startDate.setDate(now.getDate() - now.getDay());
          } else {
            startDate = new Date(0);
          }

          // Organizza eventi per giorno
          events.forEach(event => {
            const eventDate = new Date(event.timestamp);
            if (eventDate >= startDate && event.eventType === interactionType) {
              if (!stats.has(event.artworkId)) {
                stats.set(event.artworkId, {
                  name: event.artworkTitle,
                  series: [],
                });
              }

              const artworkStat = stats.get(event.artworkId)!;
              const dateString = eventDate.toISOString().split('T')[0]; // Usa solo la parte della data

              let dayData = artworkStat.series.find(day => day.name === dateString);
              if (!dayData) {
                dayData = { name: dateString, value: 0 };
                artworkStat.series.push(dayData);
              }

              dayData.value += 1; // Incrementa le interazioni (visualizzazioni, aggiunte al carrello, acquisti)
            }
          });
          console.log(Array.from(stats.values()).filter(stat => stat.series.length > 0))
          // Converti Map in Array e filtra i dati che contengono serie vuote
          return Array.from(stats.values()).filter(stat => stat.series.length > 0);
        }),
        catchError((error) => {
          console.error('Errore durante il recupero delle statistiche temporali delle opere:', error);
          return of([]);
        })
      );
  }

  getOverallArtworkStatsOverTime(): Observable<{ title: string, series: { name: string, value: number }[] }[]> {
    return this.db
      .list('/user_events')
      .valueChanges()
      .pipe(
        map((events: any[]) => {
          const stats = new Map<string, { title: string, series: { name: string, value: number }[] }>();

          events.forEach(event => {
            if (event.eventType === 'viewArtwork' || event.eventType === 'addToCart') {
              const date = new Date(event.timestamp).toISOString().split('T')[0]; // Solo la data (yyyy-mm-dd)
              if (!stats.has(event.artworkId)) {
                stats.set(event.artworkId, {
                  title: event.artworkTitle,
                  series: [],
                });
              }

              const artworkStat = stats.get(event.artworkId)!;
              let dateEntry = artworkStat.series.find(entry => entry.name === date);

              if (!dateEntry) {
                dateEntry = { name: date, value: 0 };
                artworkStat.series.push(dateEntry);
              }

              dateEntry.value++;
              stats.set(event.artworkId, artworkStat);
            }
          });

          return Array.from(stats.values());
        }),
        catchError((error) => {
          console.error('Errore durante il recupero delle statistiche temporali delle opere:', error);
          return of([]);
        })
      );
  }
  getTotalOrders(): Observable<number> {
    return this.db
      .list('/user_events', ref => ref.orderByChild('eventType').equalTo('purchase'))
      .valueChanges()
      .pipe(
        map((orders: any[]) => orders.length),
        catchError((error) => {
          console.error('Errore durante il recupero degli ordini:', error);
          return of(0);
        })
      );
  }

  getOrderStats(): Observable<{ title: string, orders: number }[]> {
    return this.db
      .list('/user_events')
      .valueChanges()
      .pipe(
        map((events: any[]) => {
          const stats = new Map<string, { title: string, orders: number }>();

          events.forEach(event => {
            if (event.eventType === 'purchase') {
              if (!stats.has(event.artworkId)) {
                stats.set(event.artworkId, {
                  title: event.artworkTitle,
                  orders: 0,
                });
              }

              const orderStat = stats.get(event.artworkId)!;
              orderStat.orders++;
              stats.set(event.artworkId, orderStat);
            }
          });

          return Array.from(stats.values());
        }),
        catchError((error) => {
          console.error('Errore durante il recupero delle statistiche degli ordini:', error);
          return of([]);
        })
      );
  }
}

