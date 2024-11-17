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

  constructor(
    public dialogRef: MatDialogRef<EditArtworkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    // Inizializza il form con i dati dell'opera d'arte corrente
    this.editArtworkForm = this.fb.group({
      nome: [data.nome, Validators.required],
      anno: [data.anno, Validators.required],
      tecnica: [data.tecnica, Validators.required],
      descrizione: [data.descrizione, Validators.required]
    });
  }

  // Metodo per salvare le modifiche e chiudere la dialog
  save(): void {
    if (true) {
      console.log('pinoooo')
      this.dialogRef.close(this.editArtworkForm.value);
    }
  }

  // Metodo per annullare e chiudere la dialog
  onCancel(): void {
    this.dialogRef.close();
  }
}
