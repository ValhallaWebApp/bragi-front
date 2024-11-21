import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-review-dialog',
  templateUrl: './edit-review-dialog.component.html',
  styleUrls: ['./edit-review-dialog.component.scss']
})
export class EditReviewDialogComponent {
  reviewForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    // Inizializza il form con i dati attuali della recensione
    this.reviewForm = this.fb.group({
      rating: [data.rating, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: [data.comment, [Validators.required, Validators.maxLength(500)]]
    });
  }

  // Metodo per salvare le modifiche e chiudere la finestra di dialogo
  onSave(): void {
    if (this.reviewForm.valid) {
      this.dialogRef.close(this.reviewForm.value);
    }
  }

  // Metodo per annullare le modifiche e chiudere la finestra di dialogo
  onCancel(): void {
    this.dialogRef.close();
  }
}
