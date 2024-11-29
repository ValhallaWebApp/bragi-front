import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profileImageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {}

  // Ottieni i dati personali dell'utente corrente
  getUserProfile(): Observable<UserProfile | null> {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.object<UserProfile>(`/users/${user.uid}`).valueChanges().pipe(
            map((profile) => profile ? { ...profile, userId: user.uid } : null),
            catchError((error) => {
              console.error('Errore durante il recupero del profilo utente:', error);
              return of(null);
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }

  // Aggiorna le informazioni personali dell'utente
  updateUserProfile(updatedProfile: Partial<UserProfile>): Observable<void> {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.object(`/users/${user.uid}`).update(updatedProfile).then(
            () => console.log('Profilo utente aggiornato con successo'),
            (error) => console.error('Errore durante l\'aggiornamento del profilo utente:', error)
          );
        } else {
          throw new Error('Utente non autenticato');
        }
      }),
      catchError((error) => {
        console.error('Errore durante l\'aggiornamento del profilo utente:', error);
        return of(); // Restituisce un Observable vuoto per completare la catena in caso di errore
      })
    );
  }

  // Ottieni l'ID dell'utente corrente
  getUserId(): Observable<string | null> {
    return this.auth.user.pipe(
      map((user) => (user ? user.uid : null)),
      catchError((error) => {
        console.error('Errore durante il recupero dell\'ID utente:', error);
        return of(null);
      })
    );
  }
}
