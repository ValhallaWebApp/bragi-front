import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, switchMap, of } from 'rxjs';
import { User } from 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    // Ascolta lo stato di autenticazione e aggiorna il BehaviorSubject
    this.afAuth.authState.subscribe((user) => {
      this.isLoggedInSubject.next(!!user);
    });
  }

  // Metodo per ottenere il ruolo dell'utente
  getUserRole(): Observable<string> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.object<any>(`users/${user.uid}`).valueChanges().pipe(
            map(userData => userData?.role || 'client')
          );
        } else {
          return of('client'); // Default role se l'utente non è autenticato
        }
      })
    );
  }
// Metodo per ottenere i dati dell'utente
getUserData(): Observable<any> {
  return this.afAuth.authState.pipe(
    switchMap(user => {
      if (user) {
        return this.db.object<any>(`users/${user.uid}`).valueChanges().pipe(

        );
      } else {
        return of(''); // Default role se l'utente non è autenticato
      }
    })
  );
}

  // Metodo per verificare se l'utente è un amministratore
  isAdmin(): Observable<boolean> {
    return this.getUserRole().pipe(map(role => role === 'admin'));
  }

  // Verifica sincrona se l'utente è loggato
  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  // Registrazione di un nuovo utente e salvataggio nel database
  async register(email: string, password: string, fullName: string): Promise<{ success: boolean; message: string }> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        // Salva i dati aggiuntivi dell'utente nel database
        await this.db.object(`users/${user.uid}`).set({
          email: user.email,
          fullName: fullName,
          role: 'client', // Di default l'utente è un client
          createdAt: new Date().toISOString()
        });

        return {
          success: true,
          message: 'Registrazione avvenuta con successo! Benvenuto!'
        };
      } else {
        return {
          success: false,
          message: 'Errore sconosciuto durante la registrazione. Riprovare più tardi.'
        };
      }

    } catch (error: any) {
      console.error('Errore durante la registrazione:', error);

      let errorMessage = 'Errore durante la registrazione. Riprovare più tardi.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'L\'email inserita è già stata utilizzata da un altro account.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'L\'indirizzo email non è valido. Controlla di aver inserito un indirizzo email corretto.';
          break;
        case 'auth/weak-password':
          errorMessage = 'La password inserita è troppo debole. Scegli una password più complessa.';
          break;
        default:
          errorMessage = error.message ? error.message : errorMessage;
      }

      return {
        success: false,
        message: errorMessage
      };
    }
  }

  // Login di un utente esistente
  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: any }> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return {
        success: true,
        message: 'Login effettuato con successo!',
        user: userCredential.user
      };
    } catch (error: any) {
      console.error('Errore durante il login:', error);

      let errorMessage = 'Errore durante il login. Riprovare più tardi.';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Nessun utente trovato con questo indirizzo email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'La password inserita non è corretta. Riprovare.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'L\'indirizzo email inserito non è valido.';
          break;
        default:
          errorMessage = error.message ? error.message : errorMessage;
      }

      return {
        success: false,
        message: errorMessage
      };
    }
  }

  // Logout utente
  async logout(): Promise<{ success: boolean; message: string }> {
    try {
      await this.afAuth.signOut();
      return {
        success: true,
        message: 'Logout effettuato con successo.'
      };
    } catch (error) {
      console.error('Errore durante il logout:', error);
      return {
        success: false,
        message: 'Errore durante il logout. Riprovare più tardi.'
      };
    }
  }

  // Recupero password
  async resetPassword(email: string): Promise<{ success: boolean; message: string }> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      return {
        success: true,
        message: 'Email per il recupero della password inviata con successo.'
      };
    } catch (error: any) {
      console.error('Errore durante il recupero della password:', error);

      let errorMessage = 'Errore durante il recupero della password. Riprovare più tardi.';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Non è stato trovato nessun account con questo indirizzo email.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'L\'indirizzo email inserito non è valido.';
          break;
        default:
          errorMessage = error.message ? error.message : errorMessage;
      }

      return {
        success: false,
        message: errorMessage
      };
    }
  }

  // Ottenere lo stato dell'utente corrente come Observable
  getUser(): Observable<User | any> {
    return this.afAuth.authState;
  }
}
