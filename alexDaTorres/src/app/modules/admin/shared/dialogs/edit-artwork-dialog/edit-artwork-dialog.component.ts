import { ArtworksService } from 'src/app/services/artworks.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-artwork-dialog',
  templateUrl: './edit-artwork-dialog.component.html',
  styleUrls: ['./edit-artwork-dialog.component.scss']
})
export class EditArtworkDialogComponent {
  editArtworkForm: FormGroup;
  isNew: boolean = false;
  thumbnailPreview: string | any | null = null;
  selectedFile: File | null = null;
  uploadPercent: number | null = null; // Opzionale, per mostrare la percentuale di caricamento

  constructor(
    public dialogRef: MatDialogRef<EditArtworkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private artworksService:ArtworksService
  ) {
    // Verifica se stiamo creando una nuova opera o modificandone una esistente
    this.isNew = !data;

    // Inizializza il form con i dati dell'opera d'arte corrente o valori di default
    this.editArtworkForm = this.fb.group({
      nome: [data?.title || '', Validators.required],
      anno: [data?.year || '', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      tecnica: [data?.technique || '', Validators.required],
      altezza: [data?.dimensions?.height || '', [Validators.required, Validators.min(1)]],
      larghezza: [data?.dimensions?.width || '', [Validators.required, Validators.min(1)]],
      descrizione: [data?.descrizioneKey || '']
    });

    // Se esiste una miniatura nei dati, impostala come anteprima iniziale
    if (data?.thumbnail) {
      this.thumbnailPreview = '../../../../assets/img/' + data.thumbnail;
    }
  }

  // Metodo per gestire la selezione di un file
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Legge il file per visualizzare l'anteprima
      const reader = new FileReader();
      reader.onload = (e) => {
        this.thumbnailPreview = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }



  // Metodo per salvare le modifiche e chiudere la dialog
  async save(): Promise<void> {
    if (this.editArtworkForm.valid) {
      const formValue = this.editArtworkForm.value;

      let artworkData: any;

      if (this.isNew) {
        // Se è una nuova opera d'arte, carica prima l'immagine
        try {
          const imageUrl = this.selectedFile ? await this.artworksService.uploadFile(this.selectedFile,0,formValue.nome) : 'default.jpg';
          artworkData = {
            availability: true,
            dimensions: {
              height: formValue.altezza,
              unit: 'cm',
              width: formValue.larghezza
            },
            likes: 0,
            rating: {
              average: 0,
              totalRatingPoints: 0,
              totalVotes: 0
            },
            technique: formValue.tecnica,
            thumbnail: imageUrl, // Usa l'URL dell'immagine caricata
            title: formValue.nome,
            year: formValue.anno,
            descrizioneKey: formValue.descrizione
          };
        } catch (error) {
          console.error('Errore durante il caricamento dell\'immagine:', error);
          return;
        }
      } else {
        // Modifica di un'opera esistente
        artworkData = {
          ...this.data,
          title: formValue.nome,
          year: formValue.anno,
          technique: formValue.tecnica,
          dimensions: {
            ...this.data.dimensions,
            height: formValue.altezza,
            width: formValue.larghezza
          },
          descrizioneKey: formValue.descrizione,
          thumbnail: this.selectedFile ? await this.artworksService.uploadFile(this.selectedFile,0,formValue.nome) : this.data.thumbnail
        };
      }

      console.log('Dati dell\'opera salvati:', artworkData);
      this.dialogRef.close(artworkData);
    } else {
      console.error('Errore: il form non è valido.');
    }
  }

  // Metodo per annullare e chiudere la dialog
  onCancel(): void {
    this.dialogRef.close();
  }
}
