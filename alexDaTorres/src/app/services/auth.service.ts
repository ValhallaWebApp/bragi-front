import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private afAuth: AngularFireAuth) {
    // Ascolta lo stato di autenticazione e aggiorna il BehaviorSubject
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isLoggedInSubject.next(true); // Utente loggato
      } else {
        this.isLoggedInSubject.next(false); // Nessun utente loggato
      }
    });
  }

  // Verifica sincrona se l'utente è loggato
  isUserLoggedIn(): boolean {
    console.log(this.isLoggedInSubject.getValue())

    return this.isLoggedInSubject.getValue();
  }

  // Registrazione di un nuovo utente
  async register(email: string, password: string): Promise<User | any> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      throw error;
    }
  }

  // Login di un utente esistente
  async login(email: string, password: string): Promise<User | any> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Errore durante il login:', error);
      throw error;
    }
  }

  // Logout utente
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.isLoggedInSubject.next(false); // Aggiorna lo stato di autenticazione
    } catch (error) {
      console.error('Errore durante il logout:', error);
      throw error;
    }
  }

  // Recupero password
  async resetPassword(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Errore durante il recupero della password:', error);
      throw error;
    }
  }

  // Ottenere lo stato dell'utente corrente come Observable
  getUser(): Observable<User | any> {
    return this.afAuth.authState;
  }
}
