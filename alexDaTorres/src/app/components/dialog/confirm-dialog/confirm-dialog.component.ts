import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data.message; // Riceviamo il messaggio dalla componente chiamante
  }

  // Metodo chiamato quando l'utente conferma
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  // Metodo chiamato quando l'utente annulla
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
