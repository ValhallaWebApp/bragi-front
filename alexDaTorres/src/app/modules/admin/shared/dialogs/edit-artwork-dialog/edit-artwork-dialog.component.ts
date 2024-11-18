import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    public dialogRef: MatDialogRef<EditArtworkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
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
  save(): void {
    if (this.editArtworkForm.valid) {
      const formValue = this.editArtworkForm.value;

      let artworkData: any;

      if (this.isNew) {
        // Creazione di una nuova opera d'arte
        artworkData = {
          availability: true,
          dimensions: {
            height: formValue.altezza,
            unit: 'cm',
            width: formValue.larghezza
          },
          likes: 0, // Nuova opera, likes iniziali a 0
          rating: {
            average: 0,
            totalRatingPoints: 0,
            totalVotes: 0
          },
          technique: formValue.tecnica,
          thumbnail: this.selectedFile ? this.selectedFile.name : 'default.jpg',
          title: formValue.nome,
          year: formValue.anno,
          descrizioneKey: formValue.descrizione
        };
      } else {
        // Modifica di un'opera esistente: preserviamo il rating e altri dati
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
          thumbnail: this.selectedFile ? this.selectedFile.name : this.data.thumbnail // Se è stato selezionato un nuovo file, usa quello
        };
      }

      console.log('Dati dell\'opera salvati:', artworkData);
      if (this.selectedFile) {
        // Qui puoi aggiungere la logica per caricare il file, ad esempio su Firebase Storage
        console.log('File selezionato:', this.selectedFile);
      }
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
