import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtworksService {

  constructor(private db: AngularFireDatabase) {}

  // Ottieni tutte le opere d'arte
  getArtworks(): Observable<any[]> {
    return this.db.list('/artWorks').snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => ({
          id: c.payload.key,  // Ottieni l'ID del nodo
          ...c.payload.val()  // Ottieni i dati dell'opera
        }))
      ),
      catchError((error) => {
        console.error('Errore nel recuperare le opere:', error);
        return throwError('Errore nel recuperare le opere, riprova più tardi.');
      })
    );
  }

  // Aggiungi una nuova opera d'arte
  addArtwork(artwork: any): Promise<void> {
    const id = this.db.createPushId(); // Genera un nuovo ID univoco
    return this.db.object(`/artWorks/${id}`).set({ ...artwork, id }).then(() => {
      console.log(`Opera con ID: ${id} aggiunta con successo.`);
    }).catch((error) => {
      console.error('Errore durante l\'aggiunta dell\'opera:', error);
      throw new Error('Errore durante l\'aggiunta dell\'opera.');
    });
  }

  // Aggiorna un'opera d'arte esistente
  updateArtwork(artwork: any): Promise<void> {
    console.log(artwork)
    if (!artwork.id) {
      return Promise.reject(new Error('L\'ID dell\'opera è necessario per aggiornarla.'));
    }

    // Destrutturare l'oggetto per evitare di inviare l'ID nel database
    const { id, ...updateData } = artwork;

    return this.db.object(`/artWorks/${id}`).update(updateData).then(() => {
      console.log(`Opera con ID: ${id} aggiornata con successo.`);
    }).catch((error) => {
      console.error('Errore durante l\'aggiornamento dell\'opera:', error);
      throw new Error(`Errore durante l'aggiornamento dell'opera con ID ${id}: ${error.message}`);
    });
  }

  // Cancella un'opera d'arte esistente
  deleteArtwork(id: string): Promise<void> {
    return this.db.object(`/artWorks/${id}`).remove().then(() => {
      console.log(`Opera con ID: ${id} eliminata con successo.`);
    }).catch((error) => {
      console.error('Errore durante la cancellazione dell\'opera:', error);
      throw new Error('Errore durante la cancellazione dell\'opera.');
    });
  }
}
