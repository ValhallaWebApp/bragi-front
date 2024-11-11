// services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  // Registrazione di un nuovo utente
  async register(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      throw error;
    }
  }

  // Login di un utente esistente
  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      console.error('Errore durante il login:', error);
      throw error;
    }
  }

  // Logout utente
  logout() {
    return this.afAuth.signOut();
  }

  // Recupero password
  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  // Ottenere lo stato dell'utente corrente
  getUser() {
    return this.afAuth.authState;
  }
}
