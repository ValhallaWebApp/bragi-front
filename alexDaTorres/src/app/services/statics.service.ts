import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IpService } from './ip.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private db: AngularFireDatabase, private http: HttpClient, private ipService:IpService) {}
  // Get statistics for artwork views
  getArtworkViewStats(): Observable<any[]> {
    return this.db.list('/statistics/artworkViews').valueChanges().pipe(
      catchError((error) => {
        console.error('Error fetching artwork view stats:', error);
        return of([]);
      })
    );
  }

  // Get statistics for artwork added to the cart
  getArtworkCartStats(): Observable<any[]> {
    return this.db.list('/statistics/artworkCartAdds').valueChanges().pipe(
      catchError((error) => {
        console.error('Error fetching artwork cart stats:', error);
        return of([]);
      })
    );
  }

  // Get statistics for purchases
  getArtworkPurchaseStats(): Observable<any[]> {
    return this.db.list('/statistics/purchases').valueChanges().pipe(
      catchError((error) => {
        console.error('Error fetching purchase stats:', error);
        return of([]);
      })
    );
  }

  // Get logged and unlogged user activity stats
  getUserActivityStats(): Observable<any> {
    return this.db.object('/statistics/userActivity').valueChanges().pipe(
      catchError((error) => {
        console.error('Error fetching user activity stats:', error);
        return of({ loggedUsers: 0, unloggedUsers: 0 });
      })
    );
  }
}
