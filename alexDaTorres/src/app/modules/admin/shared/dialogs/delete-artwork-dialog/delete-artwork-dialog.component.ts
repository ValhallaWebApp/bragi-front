import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-artwork-dialog',
  templateUrl: './delete-artwork-dialog.component.html',
  styleUrls: ['./delete-artwork-dialog.component.scss']
})
export class DeleteArtworkDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteArtworkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(){
    console.log(this.data)
  }
  // Metodo per confermare la cancellazione
  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  // Metodo per annullare l'azione
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
