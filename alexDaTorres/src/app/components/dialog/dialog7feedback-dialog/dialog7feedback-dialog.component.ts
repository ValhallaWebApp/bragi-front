import { MatButton } from '@angular/material/button';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog7feedback-dialog',
  templateUrl: './dialog7feedback-dialog.component.html',
  styleUrl: './dialog7feedback-dialog.component.scss'
})
export class FeedbackDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, success: boolean }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
