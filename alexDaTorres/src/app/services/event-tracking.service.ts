import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';
import { IpService } from './ip.service';

@Injectable({
  providedIn: 'root',
})
export class EventTrackingService {
  constructor(
    private db: AngularFireDatabase,
    private ipService: IpService,
    private authService: AuthService
  ) {}

  // Metodo per tracciare l'evento di visualizzazione di un'opera
  trackArtworkView(artworkId: string, artworkTitle: string): void {
    this.authService
      .getUser()
      .pipe(take(1))
      .subscribe((user) => {
        const userId = user ? user.uid : 'anonymous';
        const eventId = this.db.createPushId();

        // Salva l'evento nel database
        this.ipService.getGeoInfo().subscribe(
          (geoInfo) => {
            this.db
              .list('/user_events')
              .set(eventId, {
                userId: userId,
                artworkId: artworkId,
                artworkTitle: artworkTitle,
                eventType: 'viewArtwork',
                location: geoInfo,
                timestamp: new Date().toISOString(),
              })
              .catch((error) => {
                console.error(
                  `Errore durante il tracciamento dell'evento di visualizzazione:`,
                  error
                );
              });
            console.log('Informazioni sulla geolocalizzazione:', geoInfo);
          },
          (error) => {
            console.error(
              'Errore durante il recupero delle informazioni di geolocalizzazione:',
              error
            );
          }
        );
      });
  }

  // Metodo per tracciare l'evento di aggiunta al carrello
  trackAddToCart(artworkId: string, artworkTitle: string): void {
    this.authService
      .getUser()
      .pipe(take(1))
      .subscribe((user) => {
        const userId = user ? user.uid : 'anonymous';
        const eventId = this.db.createPushId();

        // Salva l'evento nel database
        this.ipService.getGeoInfo().subscribe(
          (geoInfo) => {
            this.db
              .list('/user_events')
              .set(eventId, {
                userId: userId,
                artworkId: artworkId,
                artworkTitle: artworkTitle,
                eventType: 'addToCart',
                location: geoInfo,
                timestamp: new Date().toISOString(),
              })
              .catch((error) => {
                console.error(
                  `Errore durante il tracciamento dell'evento di aggiunta al carrello:`,
                  error
                );
              });
            console.log('Informazioni sulla geolocalizzazione:', geoInfo);
          },
          (error) => {
            console.error(
              'Errore durante il recupero delle informazioni di geolocalizzazione:',
              error
            );
          }
        );
      });
  }

  // Metodo per tracciare l'evento di acquisto
  trackPurchase(orderId: string, totalAmount: number): void {
    this.authService
      .getUser()
      .pipe(take(1))
      .subscribe((user) => {
        const userId = user ? user.uid : 'anonymous';
        const eventId = this.db.createPushId();

        // Salva l'evento nel database
        this.ipService.getGeoInfo().subscribe(
          (geoInfo) => {
            this.db
              .list('/user_events')
              .set(eventId, {
                userId: userId,
                orderId: orderId,
                eventType: 'purchase',
                totalAmount: totalAmount,
                location: geoInfo,
                timestamp: new Date().toISOString(),
              })
              .catch((error) => {
                console.error(
                  `Errore durante il tracciamento dell'evento di acquisto:`,
                  error
                );
              });
            console.log('Informazioni sulla geolocalizzazione:', geoInfo);
          },
          (error) => {
            console.error(
              'Errore durante il recupero delle informazioni di geolocalizzazione:',
              error
            );
          }
        );
      });
  }

  // Metodo per tracciare altri tipi di eventi come login, logout, registrazione
  trackGenericEvent(eventType: string, extraData: any = {}): void {
    this.authService
      .getUser()
      .pipe(take(1))
      .subscribe(
        (user) => {
          const userId = user ? user.uid : 'anonymous';
          const eventId = this.db.createPushId();

          // Salva l'evento nel database
          this.ipService.getGeoInfo().subscribe((geoInfo) => {
            this.db
              .list('/user_events')
              .set(eventId, {
                userId: userId,
                eventType: eventType,
                location: geoInfo,
                timestamp: new Date().toISOString(),
                ...extraData,
              })
              .catch((error) => {
                console.error(
                  `Errore durante il tracciamento dell'evento generico:`,
                  error
                );
              });
          });
        },
        (error) => {
          console.error(
            'Errore durante il recupero delle informazioni di geolocalizzazione:',
            error
          );
        }
      );
  }
}
